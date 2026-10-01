import React from 'react';
import { 
  BookOpen, 
  FileText, 
  CheckSquare, 
  DownloadCloud, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  IndianRupee, 
  Clock, 
  Users, 
  CheckCircle, 
  Award, 
  Eye, 
  BookCheck,
  Zap,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { ChapterNote, PDFProduct } from '../types';

interface Props {
  onNavigate: (tab: string) => void;
  featuredNotes: ChapterNote[];
  pdfProducts: PDFProduct[];
  purchasedIds: string[];
  onPreviewPDF: (item: ChapterNote | PDFProduct) => void;
  onBuyPDF: (item: ChapterNote | PDFProduct) => void;
  onBuyAllBundle?: () => void;
  lang: 'en' | 'hi';
}

export const HomeSection: React.FC<Props> = ({
  onNavigate,
  featuredNotes,
  pdfProducts,
  purchasedIds,
  onPreviewPDF,
  onBuyPDF,
  onBuyAllBundle,
  lang,
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl border border-blue-900/40">
        {/* Subtle background glow circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>BPSC TRE 4.0 Higher Secondary (10+2 PGT) Preparation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            BPSC TRE 4.0 <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">COMPUTER SCIENCE</span>
          </h1>

          <div className="text-xs sm:text-sm uppercase tracking-widest text-blue-200/90 font-bold">
            Complete Syllabus • Notes • PDF Sessions • MCQs • Practice Sets
          </div>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
            “BPSC TRE Computer Science की तैयारी के लिए Chapter-wise Notes और Exam-Oriented PDF Sessions — <span className="text-amber-400 font-black underline decoration-amber-400/50 underline-offset-4">केवल ₹1 प्रति Note.</span>”
          </p>

          {/* Price Guarantee Banner */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/40 px-5 py-2.5 rounded-2xl backdrop-blur-sm shadow-inner">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm">
              ₹1
            </div>
            <div className="text-left">
              <span className="text-xs sm:text-sm font-extrabold text-white block">
                Each PDF Note – Only ₹1
              </span>
              <span className="text-[11px] text-emerald-300">
                100% Student-Friendly • Printable • Direct Download
              </span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('notes')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Notes</span>
            </button>

            <button
              onClick={() => {
                if (onBuyAllBundle) onBuyAllBundle();
                else onNavigate('pdfs');
              }}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <IndianRupee className="w-4 h-4" />
              <span>Unlock All Notes (₹10)</span>
              <span className="bg-slate-950/20 text-slate-950 text-[10px] px-1.5 py-0.5 rounded font-black">All 12 Sessions</span>
            </button>

            <button
              onClick={() => onNavigate('mcqs')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm rounded-xl backdrop-blur-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <span>Practice MCQs</span>
            </button>

            <button
              onClick={() => onNavigate('syllabus')}
              className="px-5 py-3 bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
            >
              <span>Detailed Syllabus</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-xl sm:text-2xl font-black text-amber-400">80 Marks</span>
              <p className="text-[11px] text-slate-300">CS Subject Weightage</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-xl sm:text-2xl font-black text-emerald-400">12 Sessions</span>
              <p className="text-[11px] text-slate-300">Complete Syllabus Notes</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-xl sm:text-2xl font-black text-sky-400">1000+ MCQs</span>
              <p className="text-[11px] text-slate-300">Bilingual Practice Sets</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-xl sm:text-2xl font-black text-indigo-400">₹1 / Note</span>
              <p className="text-[11px] text-slate-300">Fixed Transparent Price</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured PDF Session Notes Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Session Notes Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured PDF Sessions (₹1 Each)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              High-yield exam notes curated specifically for BPSC 10+2 PGT Computer Science aspirants.
            </p>
          </div>

          <button
            onClick={() => onNavigate('pdfs')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>View All 12 PDF Sessions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* PDF Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pdfProducts.slice(0, 6).map((pdf) => {
            const isOwned = purchasedIds.includes(pdf.id);
            return (
              <div
                key={pdf.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col"
              >
                {/* Top Badge Strip */}
                <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                    Session #{pdf.sessionNumber}
                  </span>
                  
                  {/* Glowing ₹1 Badge */}
                  <div className="flex items-center gap-1 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow-xs">
                    <span>₹{pdf.price} Only</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {pdf.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
                      {pdf.titleHindi}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {pdf.description}
                    </p>

                    {/* Meta info tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-blue-500" />
                        <span>{pdf.pages} Pages</span>
                      </span>
                      <span>•</span>
                      <span>{pdf.fileSize}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-semibold">{pdf.category}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => onPreviewPDF(pdf)}
                      className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Preview</span>
                    </button>

                    {isOwned ? (
                      <button
                        onClick={() => onPreviewPDF(pdf)}
                        className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onBuyPDF(pdf)}
                        className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span>Buy Now (₹1)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chapter-wise Notes Highlight */}
      <section className="bg-gradient-to-br from-blue-50/70 via-slate-50 to-indigo-50/70 rounded-3xl p-6 sm:p-8 border border-blue-100">
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Interactive Digital Study Material
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Chapter-Wise Comprehensive Notes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Every chapter contains Short Notes, Detailed Breakdown, Important Definitions, Formulas, Solved Code Examples, Exam Points, and Topic-wise MCQs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Computer Fundamentals', desc: 'Von Neumann, Cache, RAM, ROM, BIOS', icon: Zap, color: 'text-amber-600 bg-amber-100' },
            { title: 'Data Structures & Algos', desc: 'Arrays, Stacks, Queues, BST, Sorting', icon: BookCheck, color: 'text-blue-600 bg-blue-100' },
            { title: 'DBMS & SQL Commands', desc: 'Normalization 1NF-BCNF, Joins, ACID', icon: TrendingUp, color: 'text-indigo-600 bg-indigo-100' },
            { title: 'Computer Networks', desc: 'OSI 7 Layers, Subnetting, Protocols', icon: Users, color: 'text-emerald-600 bg-emerald-100' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{item.desc}</p>
              <button
                onClick={() => onNavigate('notes')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Read Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Practice Sets & MCQ Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
              <CheckSquare className="w-4 h-4" />
              <span>Exam Simulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              BPSC TRE 4.0 Practice MCQ Sets
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Solve topic-wise questions with 4 options, instant Hindi/English explanations, and real exam timers.
            </p>
          </div>

          <button
            onClick={() => onNavigate('mcqs')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
          >
            <span>Start Practice Test</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Mini Sprint Test', count: 10, time: '10 Mins', diff: 'Easy / Medium', bg: 'border-blue-200 hover:border-blue-400' },
            { title: 'Standard Practice Set', count: 20, time: '20 Mins', diff: 'Medium', bg: 'border-emerald-200 hover:border-emerald-400' },
            { title: 'Half Syllabus Mock', count: 50, time: '50 Mins', diff: 'Hard (Exam Level)', bg: 'border-purple-200 hover:border-purple-400' },
            { title: 'Full 80-Mark CS Mock', count: 80, time: '80 Mins', diff: 'BPSC Real Pattern', bg: 'border-amber-200 hover:border-amber-400' },
          ].map((set, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-5 border-2 ${set.bg} shadow-xs hover:shadow-lg transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {set.time}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    {set.diff}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{set.title}</h4>
                <p className="text-xs text-slate-500">{set.count} Curated Questions with Explanations</p>
              </div>

              <button
                onClick={() => onNavigate('mcqs')}
                className="mt-4 w-full py-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Attempt Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Our ₹1 Notes? Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-3 lg:col-span-1">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
              Student Mission
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Why Each Note is Priced at <span className="text-amber-400">Only ₹1?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our sole aim is to democratize high-quality Computer Science education for every aspiring teacher in Bihar. No expensive coaching fees, no hidden subscription costs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-2">
            {[
              { title: 'Handwritten-Style Cheatsheets', desc: 'Summary boxes, key traps, and formula tables designed for quick last-minute revision.' },
              { title: 'Direct Watermarked Download', desc: 'Generate your official candidate-stamped PDF instantly with a single click.' },
              { title: 'Previous Year Question Focus', desc: 'Direct mapping to questions asked in BPSC TRE 1.0, TRE 2.0 and TRE 3.0.' },
              { title: 'Bilingual Hindi & English', desc: 'Key terms explained in both Hindi and English for maximum exam clarity.' },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h4 className="text-sm font-bold text-white">{feature.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
