import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Lock, 
  Sparkles, 
  CheckCircle, 
  Code, 
  HelpCircle, 
  Search, 
  ChevronRight,
  Eye,
  IndianRupee,
  Share2,
  Check
} from 'lucide-react';
import { ChapterNote, PDFProduct } from '../types';

interface Props {
  notes: ChapterNote[];
  purchasedIds: string[];
  onPreviewPDF: (note: ChapterNote) => void;
  onBuyPDF: (note: ChapterNote) => void;
  searchQuery: string;
  lang: 'en' | 'hi';
}

export const ChapterNotesSection: React.FC<Props> = ({
  notes,
  purchasedIds,
  onPreviewPDF,
  onBuyPDF,
  searchQuery,
  lang,
}) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>(notes[0]?.id || 'note-session-01');
  const [activeTab, setActiveTab] = useState<'short' | 'detailed' | 'definitions' | 'formulas' | 'examples' | 'examPoints' | 'mcqs'>('short');
  const [selectedMCQAnswers, setSelectedMCQAnswers] = useState<Record<string, number>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || notes[0];
  const isPurchased = selectedNote?.isFree || (selectedNote && purchasedIds.includes(selectedNote.id));

  const filteredNotes = notes.filter((note) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.titleHindi.toLowerCase().includes(q) ||
      note.category.toLowerCase().includes(q) ||
      note.shortSummary.toLowerCase().includes(q)
    );
  });

  const handleMCQSelect = (mcqId: string, optIndex: number) => {
    setSelectedMCQAnswers((prev) => ({ ...prev, [mcqId]: optIndex }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Section Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Digital Study Material</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Chapter-Wise Comprehensive Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Short notes, detailed explanations, handwritten formulas, exam traps, and chapter-wise MCQs for BPSC TRE 4.0.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-400" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Notes'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Topic Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2 flex items-center justify-between">
            <span>All Chapters ({filteredNotes.length})</span>
            <span className="text-[11px] text-blue-600">₹1 Each</span>
          </div>

          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {filteredNotes.map((note) => {
              const isSelected = note.id === selectedNoteId;
              const isOwned = note.isFree || purchasedIds.includes(note.id);

              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none text-left ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Session #{note.sessionNumber}
                    </span>

                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isOwned
                          ? isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                          : isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {note.isFree ? 'FREE' : isOwned ? 'UNLOCKED' : '₹1 ONLY'}
                    </span>
                  </div>

                  <h3 className={`text-xs sm:text-sm font-bold leading-snug line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {note.title}
                  </h3>

                  <div className={`flex items-center gap-2 mt-2 text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    <span>{note.totalPages} Pages</span>
                    <span>•</span>
                    <span>{note.category}</span>
                    <span>•</span>
                    <span>{note.mcqs.length} MCQs</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Chapter Explorer */}
        {selectedNote && (
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Chapter Header */}
            <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/50 border-b border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-600 text-white rounded">
                    Session #{selectedNote.sessionNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    Category: {selectedNote.category}
                  </span>
                </div>

                {/* Purchase / Download Button */}
                <div>
                  {isPurchased ? (
                    <button
                      onClick={() => onPreviewPDF(selectedNote)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF ({selectedNote.fileSize})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onBuyPDF(selectedNote)}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <IndianRupee className="w-4 h-4" />
                      <span>Buy Full PDF Session – ₹{selectedNote.price}</span>
                    </button>
                  )}
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {selectedNote.title}
              </h2>
              <p className="text-sm font-medium text-slate-600 mt-0.5">
                {selectedNote.titleHindi}
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedNote.shortSummary}
              </p>
            </div>

            {/* Sub-tabs Navigation */}
            <div className="flex items-center gap-1 p-2 bg-slate-100/70 border-b border-slate-200 overflow-x-auto scrollbar-none text-xs font-semibold">
              {[
                { id: 'short', label: 'Short Notes' },
                { id: 'detailed', label: 'Detailed Notes' },
                { id: 'definitions', label: 'Definitions' },
                { id: 'formulas', label: 'Formulas & Concepts' },
                { id: 'examples', label: 'Examples' },
                { id: 'examPoints', label: 'Exam Traps (PYQs)' },
                { id: 'mcqs', label: `Topic MCQs (${selectedNote.mcqs.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub-tab Content Panels */}
            <div className="p-6">
              {!isPurchased ? (
                /* Paywall Lock Screen - Only Pay Then Open Notes */
                <div className="space-y-6">
                  {/* Free Teaser */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Sample Preview
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {selectedNote.shortNotes[0]}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedNote.shortNotes[1]}
                    </p>
                  </div>

                  {/* Locked Barrier Banner */}
                  <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl border border-blue-900/50 shadow-xl text-center space-y-4 overflow-hidden">
                    <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20">
                      <Lock className="w-7 h-7" />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white">
                        Full Chapter Notes & Formulas Locked
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1">
                        Pay via UPI to open complete detailed notes, handwritten formulas, exam traps, and printable PDF.
                      </p>
                    </div>

                    {/* Payee Details Preview */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 max-w-sm mx-auto text-xs text-blue-200">
                      <div className="flex justify-between">
                        <span>Payee:</span>
                        <strong className="text-white">Chandan Kumar (Yes Bank 0872)</strong>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>UPI ID:</span>
                        <strong className="text-amber-300 font-mono">chandanbarew-2@okhdfcbank</strong>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => onBuyPDF(selectedNote)}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                      >
                        <IndianRupee className="w-4 h-4" />
                        <span>Pay ₹1 & Open This Note</span>
                      </button>

                      <button
                        onClick={() => onBuyPDF(selectedNote)}
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Pay ₹10 & Open ALL 12 Notes</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Scan UPI QR with Google Pay, PhonePe, Paytm or BHIM • Instant verification & unlock
                    </p>
                  </div>
                </div>
              ) : (
                /* Unlocked Full Chapter Content */
                <>
              {/* 1. Short Notes */}
              {activeTab === 'short' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Quick Revision Bullet Points</span>
                  </h3>
                  <div className="space-y-3">
                    {selectedNote.shortNotes.map((note, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Detailed Notes */}
              {activeTab === 'detailed' && (
                <div className="space-y-6">
                  {selectedNote.detailedNotes.map((item, idx) => (
                    <div key={idx} className="space-y-2 border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                      <h4 className="text-base font-bold text-blue-900">
                        {item.heading}
                      </h4>
                      {item.headingHindi && (
                        <p className="text-xs text-slate-500 font-medium">
                          {item.headingHindi}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {item.content}
                      </p>

                      {item.points && (
                        <ul className="space-y-1.5 mt-2 pl-4 list-disc text-xs text-slate-600">
                          {item.points.map((p, pIdx) => (
                            <li key={pIdx}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 3. Important Definitions */}
              {activeTab === 'definitions' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Key Definitions for BPSC TRE 4.0
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedNote.definitions.map((def, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm text-blue-950">
                            {def.term}
                          </span>
                          {def.termHindi && (
                            <span className="text-xs text-slate-500 font-medium">
                              ({def.termHindi})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {def.definition}
                        </p>
                        {def.definitionHindi && (
                          <p className="text-[11px] text-slate-500 italic">
                            {def.definitionHindi}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Formulas & Concepts */}
              {activeTab === 'formulas' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Handwritten Formulas & Cheat Codes</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedNote.formulas.map((f, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                        <span className="text-xs font-bold text-amber-950 block">
                          {f.title}
                        </span>
                        <div className="p-3 bg-white rounded-xl border border-amber-300 font-mono text-xs sm:text-sm text-blue-900 font-bold">
                          {f.formula}
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {f.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Examples */}
              {activeTab === 'examples' && (
                <div className="space-y-4">
                  {selectedNote.examples.map((ex, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <Code className="w-4 h-4 text-blue-600" />
                        <span>{ex.title}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {ex.description}
                      </p>
                      {ex.codeOrFormula && (
                        <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto">
                          {ex.codeOrFormula}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 6. Exam Points */}
              {activeTab === 'examPoints' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    <span>High-Frequency BPSC TRE 1.0, 2.0 & 3.0 Exam Traps</span>
                  </h3>
                  <div className="space-y-3">
                    {selectedNote.examPoints.map((point, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Topic MCQs */}
              {activeTab === 'mcqs' && (
                <div className="space-y-5">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                    <span>Practice Chapter Questions</span>
                    <span className="text-xs text-slate-500">{selectedNote.mcqs.length} Questions</span>
                  </h3>

                  {selectedNote.mcqs.map((mcq, mIdx) => {
                    const selectedOpt = selectedMCQAnswers[mcq.id];
                    const isAnswered = selectedOpt !== undefined;
                    const isCorrect = selectedOpt === mcq.correctIndex;

                    return (
                      <div key={mcq.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs sm:text-sm font-bold text-slate-900">
                            Q{mIdx + 1}. {mcq.question}
                          </p>
                          {mcq.pyqReference && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded shrink-0">
                              {mcq.pyqReference}
                            </span>
                          )}
                        </div>

                        {mcq.questionHindi && (
                          <p className="text-xs text-slate-500 font-medium">
                            {mcq.questionHindi}
                          </p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {mcq.options.map((opt, oIdx) => {
                            let optClass = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                            if (isAnswered) {
                              if (oIdx === mcq.correctIndex) {
                                optClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                              } else if (selectedOpt === oIdx) {
                                optClass = 'bg-rose-50 border-rose-500 text-rose-950';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleMCQSelect(mcq.id, oIdx)}
                                className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${optClass}`}
                              >
                                <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)})</span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {isAnswered && (
                          <div className={`p-3 rounded-xl text-xs space-y-1 ${isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                            <div className="font-bold">
                              {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect! Correct: ${String.fromCharCode(65 + mcq.correctIndex)}`}
                            </div>
                            <p className="text-slate-700 leading-relaxed">
                              {mcq.explanation}
                            </p>
                            {mcq.explanationHindi && (
                              <p className="text-slate-600 text-[11px] italic">
                                {mcq.explanationHindi}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
