import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  CheckSquare, 
  DownloadCloud, 
  User as UserIcon, 
  Menu, 
  X, 
  Shield, 
  Sparkles, 
  Layers, 
  Home, 
  FolderCheck,
  Search,
  Languages
} from 'lucide-react';
import { User } from '../types';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  purchasedCount: number;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  currentUser,
  onOpenAuth,
  onOpenAdmin,
  searchQuery,
  setSearchQuery,
  purchasedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navItems = [
    { id: 'home', label: lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home', icon: Home },
    { id: 'syllabus', label: lang === 'hi' ? 'सिलेबस' : 'Syllabus', icon: Layers },
    { id: 'notes', label: lang === 'hi' ? 'चैप्टर नोट्स' : 'Chapter Notes', icon: BookOpen },
    { id: 'pdfs', label: lang === 'hi' ? '₹1 PDF सेशन्स' : '₹1 PDF Notes', icon: FileText, badge: '₹1 Only' },
    { id: 'mcqs', label: lang === 'hi' ? 'MCQ प्रैक्टिस' : 'Practice MCQs', icon: CheckSquare },
    { id: 'free', label: lang === 'hi' ? 'फ्री रिसोर्सेस' : 'Free Resources', icon: DownloadCloud },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-extrabold uppercase text-[10px] tracking-wider shrink-0">
              NEW
            </span>
            <span className="truncate text-slate-200">
              {lang === 'hi'
                ? 'BPSC TRE 4.0 कंप्यूटर साइंस: सभी चैप्टर-वाइज PDF सेशन नोट्स अब उपलब्ध — केवल ₹1 प्रति नोट!'
                : 'BPSC TRE 4.0 Computer Science: Chapter-wise PDF Sessions now live — Only ₹1 per Note!'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors"
              title="Switch Language (English / हिंदी)"
            >
              <Languages className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Quick Admin Access */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
              title="Admin CMS Dashboard"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-black text-lg">
              B
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">
                  BPSC TRE 4.0
                </span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  CS (10+2)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">
                Syllabus & Notes Portal
              </p>
            </div>
          </div>

          {/* Search bar on desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'hi' ? "खोजें (e.g. DBMS, K-Map, 2's Complement)..." : "Search topics, notes, formulas..."}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-full outline-hidden transition-all text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-amber-500 text-white font-black text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* My Notes button */}
            <button
              onClick={() => handleNavClick('my-notes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                activeTab === 'my-notes'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <FolderCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">My Notes</span>
              {purchasedCount > 0 && (
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {purchasedCount}
                </span>
              )}
            </button>

            {/* User Account / Sign In */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              <UserIcon className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">
                {currentUser ? `${currentUser.name.split(' ')[0]} (..${currentUser.mobile ? currentUser.mobile.slice(-4) : 'User'})` : (lang === 'hi' ? 'मोबाइल लॉगिन' : 'Mobile Login')}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar expands when clicked */}
        {showSearchInput && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search syllabus, notes, formulas..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 border border-slate-300 rounded-xl focus:bg-white text-slate-800 outline-hidden"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-xl animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-amber-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-slate-600 font-semibold py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Admin Panel</span>
            </button>
            <button
              onClick={() => {
                setLang(lang === 'en' ? 'hi' : 'en');
                setMobileMenuOpen(false);
              }}
              className="text-xs text-blue-700 font-bold py-2 px-3 rounded-lg bg-blue-50"
            >
              {lang === 'en' ? 'हिन्दी में पढ़ें' : 'Switch to English'}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (App-like experience for phones) */}
      <nav aria-label="Mobile Bottom Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium transition-colors ${
            activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => handleNavClick('syllabus')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium transition-colors ${
            activeTab === 'syllabus' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>Syllabus</span>
        </button>
        <button
          onClick={() => handleNavClick('pdfs')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium relative transition-colors ${
            activeTab === 'pdfs' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <span className="absolute -top-1 right-1 bg-amber-500 text-white text-[8px] font-black px-1 rounded-full">
            ₹1
          </span>
          <FileText className="w-4 h-4 mb-0.5" />
          <span>₹1 PDFs</span>
        </button>
        <button
          onClick={() => handleNavClick('mcqs')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium transition-colors ${
            activeTab === 'mcqs' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <CheckSquare className="w-4 h-4 mb-0.5" />
          <span>MCQs</span>
        </button>
        <button
          onClick={() => handleNavClick('my-notes')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium transition-colors ${
            activeTab === 'my-notes' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <FolderCheck className="w-4 h-4 mb-0.5" />
          <span>My Notes</span>
        </button>
      </nav>
    </header>
  );
};
