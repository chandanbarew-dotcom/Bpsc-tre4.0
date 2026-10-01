import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  IndianRupee, 
  CheckCircle, 
  Download, 
  Sparkles, 
  Search, 
  Filter, 
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { PDFProduct } from '../types';

interface Props {
  pdfProducts: PDFProduct[];
  purchasedIds: string[];
  onPreview: (pdf: PDFProduct) => void;
  onBuy: (pdf: PDFProduct) => void;
  onBuyAllBundle?: () => void;
  searchQuery: string;
  lang: 'en' | 'hi';
}

export const PDFSessionCards: React.FC<Props> = ({
  pdfProducts,
  purchasedIds,
  onPreview,
  onBuy,
  onBuyAllBundle,
  searchQuery,
  lang,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Fundamentals' | 'Digital Electronics' | 'Core CS' | 'Systems' | 'Security & Web' | 'PYQ Master'>('All');

  const filteredProducts = pdfProducts.filter((pdf) => {
    const matchesCategory = selectedFilter === 'All' || pdf.category === selectedFilter;
    if (!matchesCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      pdf.title.toLowerCase().includes(q) ||
      pdf.titleHindi.toLowerCase().includes(q) ||
      pdf.description.toLowerCase().includes(q)
    );
  });

  const allPurchased = pdfProducts.every((p) => p.isFree || purchasedIds.includes(p.id));

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner with Unlock All Option */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-800/40 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete PDF Session Notes – Only ₹1 Per Note</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              BPSC TRE 4.0 PDF Session Notes
            </h1>

            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              All 12 sessions arranged in sequence. Every PDF note includes high-yield summaries, formulas, solved previous year questions, and is stamped with your mobile roll details for instant offline study.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-blue-200">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified UPI: Chandan Kumar (Yes Bank 0872)
              </span>
              <span>•</span>
              <span className="font-mono text-amber-300">chandanbarew-2@okhdfcbank</span>
            </div>
          </div>

          {/* Master Unlock All Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center space-y-3 shrink-0 lg:max-w-xs w-full shadow-lg">
            <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
              ⭐ Special Aspirant Pack
            </span>
            <div className="text-2xl font-black text-white">
              Unlock All 12 Notes
            </div>
            <div className="inline-flex items-center gap-1 text-xl font-black text-amber-400">
              <span>Only ₹10</span>
              <span className="text-xs text-slate-300 line-through">₹12</span>
            </div>
            <p className="text-[11px] text-blue-100">
              One-click UPI payment opens all 12 session notes forever!
            </p>
            <button
              onClick={() => {
                if (onBuyAllBundle) onBuyAllBundle();
                else if (pdfProducts[0]) onBuy(pdfProducts[0]);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Pay ₹10 & Open All Notes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Fundamentals', 'Digital Electronics', 'Core CS', 'Systems', 'Security & Web', 'PYQ Master'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredProducts.length} Sessions
        </div>
      </div>

      {/* PDF Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((pdf) => {
          const isOwned = pdf.isFree || purchasedIds.includes(pdf.id);

          return (
            <div
              key={pdf.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between group"
            >
              {/* Card Top Banner */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center shrink-0">
                    S{pdf.sessionNumber}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      Session {pdf.sessionNumber < 10 ? `0${pdf.sessionNumber}` : pdf.sessionNumber}
                    </span>
                    <span className="text-xs font-bold text-blue-700">
                      {pdf.category}
                    </span>
                  </div>
                </div>

                {/* Clear ₹1 Price Badge (Strictly visible per prompt requirement) */}
                <div className="text-right">
                  <div className="inline-flex items-center gap-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm px-3 py-1 rounded-full shadow-xs">
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>{pdf.price}</span>
                  </div>
                  <span className="block text-[9px] text-slate-400 font-semibold mt-0.5">
                    Only ₹1
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {pdf.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {pdf.titleHindi}
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-3 mt-3 leading-relaxed">
                    {pdf.description}
                  </p>

                  {/* Topics Covered Tag Cloud */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {pdf.topicsCovered.slice(0, 3).map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-blue-50 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Meta Stats: Number of Pages, File size */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <strong>{pdf.pages} Pages</strong>
                  </span>
                  <span>Size: {pdf.fileSize}</span>
                  <span className="text-emerald-700 font-semibold">BPSC 4.0 Verified</span>
                </div>
              </div>

              {/* Card Bottom CTA Buttons: PDF Preview | ₹1 | Buy Now */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onPreview(pdf)}
                  className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>PDF Preview</span>
                </button>

                {isOwned ? (
                  <button
                    onClick={() => onPreview(pdf)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onBuy(pdf)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    <IndianRupee className="w-3.5 h-3.5 text-amber-300" />
                    <span>Buy Now – ₹{pdf.price}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
