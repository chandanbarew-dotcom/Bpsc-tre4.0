import React from 'react';
import { 
  User as UserIcon, 
  FileText, 
  Download, 
  Eye, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  LogOut, 
  ShoppingBag,
  Award,
  ArrowRight
} from 'lucide-react';
import { PDFProduct, PurchaseRecord, User } from '../types';

interface Props {
  currentUser: User | null;
  purchasedPdfs: PDFProduct[];
  purchases: PurchaseRecord[];
  onOpenPDF: (pdf: PDFProduct) => void;
  onNavigateToStore: () => void;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export const UserAccount: React.FC<Props> = ({
  currentUser,
  purchasedPdfs,
  purchases,
  onOpenPDF,
  onNavigateToStore,
  onLogout,
  onOpenAuth,
}) => {
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-md">
          <UserIcon className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Sign In to Your Aspirant Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your purchased ₹1 PDF notes, practice test history, and offline study materials.
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-2xl flex items-center justify-center shadow-lg">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentUser.name}
              </h1>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-400/30">
                {currentUser.role === 'admin' ? 'Administrator' : 'BPSC Aspirant'}
              </span>
              {currentUser.hasUnlockedAll && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  All Notes Unlocked
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
              <span>📱 Mobile: <strong className="text-white font-mono">+91 {currentUser.mobile}</strong></span>
              <span>•</span>
              <span>Target: BPSC TRE 4.0 CS (10+2)</span>
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Purchased Notes
          </span>
          <div className="text-2xl font-black text-blue-900 mt-1">
            {purchasedPdfs.length} Sessions
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Available for unlimited view & download
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Investment
          </span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            ₹{purchases.reduce((acc, p) => acc + p.amount, 0)}
          </div>
          <p className="text-[11px] text-emerald-600 mt-1">
            Subsidized at only ₹1 per note
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Study Status
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            Active Prep
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Syllabus Unit 1-12 mapped
          </p>
        </div>
      </div>

      {/* Section 1: My Purchased Notes Library */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>My Purchased Notes & Library</span>
            </h2>
            <p className="text-xs text-slate-500">
              Your unlocked session notes. Read in browser or download PDF for offline printing.
            </p>
          </div>

          <button
            onClick={onNavigateToStore}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Buy More ₹1 Notes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {purchasedPdfs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {purchasedPdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Session #{pdf.sessionNumber}
                    </span>
                    <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      UNLOCKED
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {pdf.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {pdf.category} • {pdf.pages} Pages
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center gap-2">
                  <button
                    onClick={() => onOpenPDF(pdf)}
                    className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Read Note</span>
                  </button>
                  <button
                    onClick={() => onOpenPDF(pdf)}
                    className="p-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs transition-colors cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
            <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">
              You have not purchased any session notes yet. Notes are available at only ₹1 per note!
            </p>
            <button
              onClick={onNavigateToStore}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Browse ₹1 PDF Sessions
            </button>
          </div>
        )}
      </div>

      {/* Section 2: Purchase & Payment History */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-indigo-600" />
          <span>Payment & Purchase History</span>
        </h2>

        {purchases.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Product Note</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {purchases.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-mono text-blue-900">{p.paymentId}</td>
                    <td className="py-3 px-4 text-slate-900 font-semibold">{p.pdfTitle}</td>
                    <td className="py-3 px-4 text-slate-500">{new Date(p.date).toLocaleDateString('en-IN')}</td>
                    <td className="py-3 px-4 text-slate-600">{p.paymentMethod}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">₹{p.amount}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        <CheckCircle className="w-3 h-3" />
                        SUCCESS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic py-2">
            No transaction records found.
          </p>
        )}
      </div>
    </div>
  );
};
