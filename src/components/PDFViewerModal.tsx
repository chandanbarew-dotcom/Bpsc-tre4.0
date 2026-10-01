import React, { useState } from 'react';
import { X, Download, Lock, CheckCircle2, FileText, ZoomIn, ZoomOut, Printer, Sparkles, IndianRupee } from 'lucide-react';
import { ChapterNote, PDFProduct, User } from '../types';
import { generateSessionPDF } from '../utils/pdfGenerator';

interface Props {
  isOpen: boolean;
  item: ChapterNote | PDFProduct | null;
  isPurchased: boolean;
  currentUser: User | null;
  onClose: () => void;
  onBuyClick: (item: ChapterNote | PDFProduct) => void;
}

export const PDFViewerModal: React.FC<Props> = ({
  isOpen,
  item,
  isPurchased,
  currentUser,
  onClose,
  onBuyClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen || !item) return null;

  const totalPages = 'totalPages' in item ? item.totalPages : item.pages || 20;
  const isAccessible = item.isFree || isPurchased;

  const handleDownload = () => {
    generateSessionPDF(item, currentUser || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[850px] bg-slate-100 rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col overflow-hidden">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-lg bg-blue-600/30 text-blue-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  Session #{item.sessionNumber}
                </span>
                <span className="text-xs text-slate-400 truncate">
                  BPSC TRE 4.0 Computer Science
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate">
                {item.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAccessible ? (
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
            ) : (
              <button
                onClick={() => onBuyClick(item)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all active:scale-95"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Unlock for ₹{item.price}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secondary Sub-toolbar */}
        <div className="bg-slate-800/90 text-slate-300 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-700/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Page {currentPage} of {totalPages}</span>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 rounded text-[11px]"
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 rounded text-[11px]"
              >
                Next
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
                className="p-1 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="p-1 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {isAccessible && (
              <button
                onClick={() => window.print()}
                className="hidden md:flex items-center gap-1 text-slate-400 hover:text-white text-xs"
                title="Print Note"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            )}
          </div>
        </div>

        {/* Reader Document Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-200/90">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-[760px] bg-white min-h-[960px] shadow-xl rounded-sm p-8 sm:p-12 relative text-slate-800 transition-transform duration-150 border border-slate-300"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 overflow-hidden select-none">
              <p className="text-4xl font-extrabold rotate-[-35deg] text-slate-900 tracking-wider">
                BPSC TRE 4.0 CS PREPARATION • {currentUser?.email || 'OFFICIAL CANDIDATE COPY'}
              </p>
            </div>

            {/* Note Sheet Header */}
            <div className="border-b-2 border-blue-900 pb-4 mb-6">
              <div className="flex items-center justify-between text-xs text-blue-800 font-semibold mb-1">
                <span>BIHAR PUBLIC SERVICE COMMISSION (BPSC) — TRE 4.0</span>
                <span>SUBJECT: COMPUTER SCIENCE (10+2 PGT)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {item.title}
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">
                {item.titleHindi}
              </p>
              <div className="flex items-center gap-3 mt-3 text-xs text-slate-600">
                <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                  Session #{item.sessionNumber}
                </span>
                <span>Category: {item.category}</span>
                <span>Total Content: {totalPages} Pages</span>
                <span className="text-emerald-700 font-bold">Verified for BPSC TRE 4.0</span>
              </div>
            </div>

            {/* Content Preview */}
            <div className="space-y-6 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-blue-900 border-l-4 border-blue-600 pl-2.5 mb-2">
                  1. High-Yield Summary & Essential Concepts
                </h3>
                <p className="text-xs text-slate-600 leading-normal mb-3">
                  {'shortSummary' in item ? item.shortSummary : item.description}
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  {('shortNotes' in item && item.shortNotes ? item.shortNotes : [
                    'Syllabus mapping aligned with NCERT/SCERT Class 11 and 12 guidelines.',
                    'Core algorithms analyzed with time & space complexity breakdowns.',
                    'Focus on previous year trends from BPSC TRE 1.0, 2.0 and 3.0 exams.'
                  ]).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Handwritten Formula Box Style */}
              <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Important Formulas & Key Concepts (Exam Traps)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                    <span className="font-semibold text-slate-900 block mb-0.5">CPU Instruction Execution:</span>
                    <code className="text-blue-700 font-mono text-[11px] block">PC -&gt; MAR -&gt; RAM -&gt; MDR -&gt; IR</code>
                    <span className="text-[10px] text-slate-500">Program Counter holds NEXT instruction address.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                    <span className="font-semibold text-slate-900 block mb-0.5">2's Complement Range:</span>
                    <code className="text-blue-700 font-mono text-[11px] block">-2^(n-1) to +(2^(n-1) - 1)</code>
                    <span className="text-[10px] text-slate-500">Only 1 zero representation in 2's complement.</span>
                  </div>
                </div>
              </div>

              {/* Sample MCQs preview */}
              <div>
                <h3 className="text-base font-bold text-blue-900 border-l-4 border-blue-600 pl-2.5 mb-2">
                  2. Solved Practice Questions (BPSC TRE Pattern)
                </h3>
                <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
                  <div className="p-3 bg-white">
                    <p className="font-semibold text-slate-800 mb-1.5">
                      Q1. Which condition ensures that a relational database schema is in 3NF?
                    </p>
                    <p className="text-slate-600 pl-2">
                      (A) Elimination of partial dependency<br />
                      (B) Elimination of transitive dependency (Correct Answer)<br />
                      (C) Elimination of multivalued dependency
                    </p>
                  </div>
                  <div className="p-3 bg-white">
                    <p className="font-semibold text-slate-800 mb-1.5">
                      Q2. Inorder traversal of a Binary Search Tree (BST) visits nodes in:
                    </p>
                    <p className="text-slate-600 pl-2">
                      (A) Ascending sorted order (Correct Answer)<br />
                      (B) Descending sorted order<br />
                      (C) Breadth-first order
                    </p>
                  </div>
                </div>
              </div>

              {/* Paywall Overlay if locked */}
              {!isAccessible && (
                <div className="relative mt-8 pt-8 border-t border-dashed border-slate-300 text-center">
                  <div className="p-6 bg-gradient-to-b from-blue-50 to-white border-2 border-blue-200 rounded-2xl shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">
                      Complete PDF Note Protected
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
                      Get immediate full access to all <strong className="text-slate-900">{totalPages} pages</strong>, handwritten formula sheets, solved PYQs, and high-resolution downloadable PDF.
                    </p>
                    <div className="inline-flex items-center gap-2 mb-4 bg-emerald-100 px-3 py-1 rounded-full text-emerald-800 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Special Student Pricing: Only ₹1</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button
                        onClick={() => onBuyClick(item)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                      >
                        <IndianRupee className="w-4 h-4" />
                        <span>Pay ₹{item.price} via UPI & Open</span>
                      </button>
                      <button
                        onClick={() => onBuyClick(item)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Pay ₹10 & Unlock All 12 Notes</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">
                      UPI Payee: Chandan Kumar (Yes Bank 0872) • chandanbarew-2@okhdfcbank
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Document Footer stamp */}
            <div className="mt-12 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
              <span>BPSC TRE 4.0 CS Master Study Notes</span>
              <span>Price: ₹1 Only • Strictly for Personal Study</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
