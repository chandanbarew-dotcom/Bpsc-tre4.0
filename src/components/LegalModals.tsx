import React from 'react';
import { X, ShieldCheck, HelpCircle, FileText, RefreshCw, Send, Mail, Phone, MessageSquare } from 'lucide-react';

interface Props {
  activeModal: 'privacy' | 'terms' | 'refund' | 'contact' | 'sitemap' | null;
  onClose: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const LegalModals: React.FC<Props> = ({ activeModal, onClose, onNavigateTab }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              {activeModal === 'privacy' && <ShieldCheck className="w-5 h-5" />}
              {activeModal === 'terms' && <FileText className="w-5 h-5" />}
              {activeModal === 'refund' && <RefreshCw className="w-5 h-5" />}
              {activeModal === 'contact' && <HelpCircle className="w-5 h-5" />}
              {activeModal === 'sitemap' && <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'terms' && 'Terms and Conditions'}
                {activeModal === 'refund' && 'Refund and Cancellation Policy'}
                {activeModal === 'contact' && 'Contact & Aspirant Support'}
                {activeModal === 'sitemap' && 'Website Sitemap & Quick Links'}
              </h2>
              <span className="text-[11px] text-slate-400">
                BPSC TRE 4.0 Computer Science Educational Platform
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          {activeModal === 'privacy' && (
            <>
              <p>
                <strong>Effective Date:</strong> October 2026
              </p>
              <p>
                This Privacy Policy describes how the BPSC TRE Computer Science Portal collects, uses, and safeguards information provided by students and aspirants.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">1. Information We Collect</h4>
              <p>
                We only collect basic identification information including candidate name, email address, and mobile number solely for issuing watermarked PDF session notes and providing customer support.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">2. Payment Security</h4>
              <p>
                All ₹1 transaction processing is handled securely through encrypted payment gateways (e.g., Razorpay/UPI/Card gateways). We never store your CVV, card numbers, or UPI PINs on our servers.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">3. Protected PDF Delivery</h4>
              <p>
                PDF downloads are generated dynamically and licensed specifically to the candidate to prevent unauthorized resale or distribution.
              </p>
            </>
          )}

          {activeModal === 'terms' && (
            <>
              <p>
                By accessing this website, you agree to comply with our Terms & Conditions.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">1. Educational Purpose Only</h4>
              <p>
                This website is an independent study and preparation resource for BPSC TRE 4.0 Computer Science. It is NOT affiliated with, endorsed by, or representing the Bihar Public Service Commission (BPSC) or the Government of Bihar.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">2. Intellectual Property & Personal License</h4>
              <p>
                Purchased ₹1 PDF notes are for personal academic study only. Modifying, mass-sharing, or commercial redistribution of materials without prior permission is strictly prohibited.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">3. Pricing Transparency</h4>
              <p>
                Each individual PDF note is fixed at ₹1. There are no automatic renewals, recurring deductions, or hidden charges.
              </p>
            </>
          )}

          {activeModal === 'refund' && (
            <>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 font-medium">
                <span className="font-bold block mb-1">100% Student-Friendly Refund Policy</span>
                We understand student requirements. If a transaction fails or if you accidentally purchased duplicate notes, we offer immediate resolution or a 100% full refund within 24 hours.
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Refund Request Procedure:</h4>
              <p>
                Email our support team with your transaction ID at <strong>support@bpsctrecs.in</strong> or WhatsApp us directly. Your refund will be credited back to your original payment method (UPI / Bank Account) without any hassle.
              </p>
            </>
          )}

          {activeModal === 'contact' && (
            <div className="space-y-4">
              <p className="text-slate-600">
                Have a question regarding syllabus, notes, or payment? Our dedicated aspirant support team is available daily from 9:00 AM to 8:00 PM.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Email Support</span>
                  </div>
                  <p className="text-xs text-blue-700 font-mono">support@bpsctrecs.in</p>
                  <span className="text-[10px] text-slate-400">Response within 2 hours</span>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-950 text-xs">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Community & Help</span>
                  </div>
                  <p className="text-xs text-emerald-700 font-bold">+91 98765 43210</p>
                  <span className="text-[10px] text-emerald-600">Daily BPSC CS MCQs Discussion</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 space-y-1">
                <strong>Official Notification Inquiries:</strong>
                <p>
                  For official BPSC exam dates, admit cards, and application forms, please always verify directly on the official commission portal: <strong>bpsc.bih.nic.in</strong>.
                </p>
              </div>
            </div>
          )}

          {activeModal === 'sitemap' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Index of key sections for quick search engine and student navigation:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { title: 'Home Page', tab: 'home' },
                  { title: 'BPSC TRE 4.0 Syllabus (Class 11-12)', tab: 'syllabus' },
                  { title: 'Chapter-Wise Notes & Key Traps', tab: 'notes' },
                  { title: '₹1 PDF Session Notes (All 12 Sessions)', tab: 'pdfs' },
                  { title: 'Practice MCQs (Topic-wise & Mocks)', tab: 'mcqs' },
                  { title: 'Free Diagnostic Test & Cheat Sheets', tab: 'free' },
                  { title: 'Student Library & My Notes', tab: 'my-notes' },
                ].map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (onNavigateTab) onNavigateTab(link.tab);
                      onClose();
                    }}
                    className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl text-left font-medium text-slate-800 transition-colors cursor-pointer"
                  >
                    {link.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
