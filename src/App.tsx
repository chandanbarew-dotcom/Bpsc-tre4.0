/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { HomeSection } from './components/HomeSection';
import { SyllabusSection } from './components/SyllabusSection';
import { ChapterNotesSection } from './components/ChapterNotesSection';
import { PDFSessionCards } from './components/PDFSessionCards';
import { MCQPractice } from './components/MCQPractice';
import { FreeResources } from './components/FreeResources';
import { UserAccount } from './components/UserAccount';
import { ChandanUPIPaymentModal } from './components/ChandanUPIPaymentModal';
import { PDFViewerModal } from './components/PDFViewerModal';
import { AuthModal } from './components/AuthModal';
import { AdminPanel } from './components/AdminPanel';
import { LegalModals } from './components/LegalModals';
import { Footer } from './components/Footer';

import { 
  SYLLABUS_DATA, 
  CHAPTER_NOTES_DATA, 
  PDF_PRODUCTS_DATA, 
  MOCK_MCQS 
} from './data/mockData';
import { ChapterNote, MCQQuestion, PDFProduct, PurchaseRecord, SyllabusUnit, User } from './types';
import { generateSessionPDF } from './utils/pdfGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [lang, setLang] = useState<'en' | 'hi'>('hi');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User State: Mobile Number & Password based authentication
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('bpsc_current_user');
      return saved ? JSON.parse(saved) : {
        id: 'usr_chandan_aspirant',
        name: 'Chandan Kumar',
        mobile: '9876543210',
        password: 'password123',
        role: 'user',
        purchasedPdfIds: [], // Locked by default: only pay then open this notes all!
        hasUnlockedAll: false,
        registeredDate: new Date().toISOString(),
      };
    } catch {
      return null;
    }
  });

  // Purchases History State
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bpsc_purchases');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dynamic Data Lists (can be modified by Admin Panel)
  const [pdfProducts, setPdfProducts] = useState<PDFProduct[]>(() => {
    try {
      const saved = localStorage.getItem('bpsc_pdf_products');
      return saved ? JSON.parse(saved) : PDF_PRODUCTS_DATA;
    } catch {
      return PDF_PRODUCTS_DATA;
    }
  });

  const [syllabusData, setSyllabusData] = useState<SyllabusUnit[]>(() => {
    try {
      const saved = localStorage.getItem('bpsc_syllabus_data');
      return saved ? JSON.parse(saved) : SYLLABUS_DATA;
    } catch {
      return SYLLABUS_DATA;
    }
  });

  const [mcqs, setMcqs] = useState<MCQQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('bpsc_mcqs');
      return saved ? JSON.parse(saved) : MOCK_MCQS;
    } catch {
      return MOCK_MCQS;
    }
  });

  const [tickerNotice, setTickerNotice] = useState<string>(
    'BPSC TRE 4.0 कंप्यूटर साइंस: सभी चैप्टर-वाइज PDF सेशन नोट्स अब उपलब्ध — केवल ₹1 प्रति नोट!'
  );

  // Modals state
  const [paymentItem, setPaymentItem] = useState<ChapterNote | PDFProduct | null>(null);
  const [isBundlePayment, setIsBundlePayment] = useState<boolean>(false);
  const [previewItem, setPreviewItem] = useState<ChapterNote | PDFProduct | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'refund' | 'contact' | 'sitemap' | null>(null);

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem('bpsc_current_user', JSON.stringify(currentUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('bpsc_purchases', JSON.stringify(purchases));
    } catch (e) {
      console.error(e);
    }
  }, [purchases]);

  useEffect(() => {
    try {
      localStorage.setItem('bpsc_pdf_products', JSON.stringify(pdfProducts));
    } catch (e) {
      console.error(e);
    }
  }, [pdfProducts]);

  // Check if a note is unlocked/purchased
  const isItemPurchased = (id: string) => {
    if (currentUser?.hasUnlockedAll) return true;
    return Boolean(currentUser && currentUser.purchasedPdfIds.includes(id));
  };

  const purchasedPdfIds = currentUser?.hasUnlockedAll
    ? pdfProducts.map((p) => p.id).concat(CHAPTER_NOTES_DATA.map((n) => n.id))
    : currentUser?.purchasedPdfIds || [];

  // Handle successful payment via Chandan Kumar UPI
  const handlePaymentSuccess = (record: PurchaseRecord, unlockAll: boolean) => {
    setPurchases((prev) => [record, ...prev]);

    if (currentUser) {
      let updatedUser: User;
      if (unlockAll) {
        const allIds = [
          ...pdfProducts.map((p) => p.id),
          ...CHAPTER_NOTES_DATA.map((n) => n.id),
        ];
        updatedUser = {
          ...currentUser,
          hasUnlockedAll: true,
          purchasedPdfIds: [...new Set([...currentUser.purchasedPdfIds, ...allIds])],
        };
      } else {
        updatedUser = {
          ...currentUser,
          purchasedPdfIds: [...new Set([...currentUser.purchasedPdfIds, record.pdfId])],
        };
      }
      setCurrentUser(updatedUser);
    }

    // Automatically prompt download
    if (paymentItem) {
      setTimeout(() => {
        generateSessionPDF(paymentItem, currentUser || undefined);
      }, 500);
    }
  };

  // Open buy modal for single note
  const handleInitiateBuy = (item: ChapterNote | PDFProduct) => {
    setIsBundlePayment(false);
    setPaymentItem(item);
  };

  // Open buy modal for ALL 12 notes bundle
  const handleBuyAllBundle = () => {
    setIsBundlePayment(true);
    setPaymentItem(pdfProducts[0] || (CHAPTER_NOTES_DATA[0] as any));
  };

  // Open preview modal
  const handleOpenPreview = (item: ChapterNote | PDFProduct) => {
    setPreviewItem(item);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner variant="banner" />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        purchasedCount={purchasedPdfIds.length}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HomeSection
            onNavigate={setActiveTab}
            featuredNotes={CHAPTER_NOTES_DATA}
            pdfProducts={pdfProducts}
            purchasedIds={purchasedPdfIds}
            onPreviewPDF={handleOpenPreview}
            onBuyPDF={handleInitiateBuy}
            onBuyAllBundle={handleBuyAllBundle}
            lang={lang}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusSection
            syllabusData={syllabusData}
            lang={lang}
            onNavigateToNotes={() => setActiveTab('notes')}
          />
        )}

        {activeTab === 'notes' && (
          <ChapterNotesSection
            notes={CHAPTER_NOTES_DATA}
            purchasedIds={purchasedPdfIds}
            onPreviewPDF={handleOpenPreview}
            onBuyPDF={handleInitiateBuy}
            searchQuery={searchQuery}
            lang={lang}
          />
        )}

        {activeTab === 'pdfs' && (
          <PDFSessionCards
            pdfProducts={pdfProducts}
            purchasedIds={purchasedPdfIds}
            onPreview={handleOpenPreview}
            onBuy={handleInitiateBuy}
            onBuyAllBundle={handleBuyAllBundle}
            searchQuery={searchQuery}
            lang={lang}
          />
        )}

        {activeTab === 'mcqs' && (
          <MCQPractice
            mcqs={mcqs}
            lang={lang}
          />
        )}

        {activeTab === 'free' && (
          <FreeResources
            onStartQuiz={() => setActiveTab('mcqs')}
            onNavigateToSyllabus={() => setActiveTab('syllabus')}
            lang={lang}
          />
        )}

        {activeTab === 'my-notes' && (
          <UserAccount
            currentUser={currentUser}
            purchasedPdfs={pdfProducts.filter((p) => isItemPurchased(p.id))}
            purchases={purchases}
            onOpenPDF={handleOpenPreview}
            onNavigateToStore={() => setActiveTab('pdfs')}
            onLogout={() => {
              setCurrentUser(null);
              localStorage.removeItem('bpsc_current_user');
            }}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenLegal={setLegalModal}
      />

      {/* Chandan Kumar Yes Bank UPI Payment Modal */}
      <ChandanUPIPaymentModal
        isOpen={Boolean(paymentItem)}
        item={paymentItem}
        currentUser={currentUser}
        defaultUnlockAll={isBundlePayment}
        onClose={() => setPaymentItem(null)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* PDF Document Preview & Reader Modal */}
      <PDFViewerModal
        isOpen={Boolean(previewItem)}
        item={previewItem}
        isPurchased={Boolean(previewItem && isItemPurchased(previewItem.id))}
        currentUser={currentUser}
        onClose={() => setPreviewItem(null)}
        onBuyClick={(item) => {
          setPreviewItem(null);
          handleInitiateBuy(item);
        }}
      />

      {/* Authentication (Sign Up with Mobile & Password) Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />

      {/* Admin Dashboard CMS Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        pdfProducts={pdfProducts}
        setPdfProducts={setPdfProducts}
        syllabusData={syllabusData}
        setSyllabusData={setSyllabusData}
        mcqs={mcqs}
        setMcqs={setMcqs}
        purchases={purchases}
        users={currentUser ? [currentUser] : []}
        tickerNotice={tickerNotice}
        setTickerNotice={setTickerNotice}
      />

      {/* Legal & Policy Modals */}
      <LegalModals
        activeModal={legalModal}
        onClose={() => setLegalModal(null)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setLegalModal(null);
        }}
      />
    </div>
  );
}
