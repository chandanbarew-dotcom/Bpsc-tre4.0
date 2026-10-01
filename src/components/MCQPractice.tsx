import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Award, 
  RotateCcw, 
  HelpCircle, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Printer
} from 'lucide-react';
import { MCQQuestion } from '../types';

interface Props {
  mcqs: MCQQuestion[];
  lang: 'en' | 'hi';
}

export const MCQPractice: React.FC<Props> = ({ mcqs, lang }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [setCount, setSetCount] = useState<number>(10);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 mins

  // Filter pool
  const filteredPool = mcqs.filter((q) => {
    const matchesTopic = selectedTopic === 'All' || q.topicName.includes(selectedTopic) || q.topicId === selectedTopic;
    const matchesDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    return matchesTopic && matchesDiff;
  });

  const activeQuestions = filteredPool.slice(0, setCount);

  // Timer effect
  useEffect(() => {
    let timer: any = null;
    if (isTestActive && !isTestSubmitted && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((s) => {
          if (s <= 1) {
            clearInterval(timer);
            setIsTestSubmitted(true);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestActive, isTestSubmitted, secondsRemaining]);

  const handleStartTest = () => {
    setUserAnswers({});
    setCurrentQIndex(0);
    setIsTestSubmitted(false);
    setSecondsRemaining(setCount * 60); // 1 min per question
    setIsTestActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (isTestSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    let attempted = 0;
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id] !== undefined) {
        attempted++;
        if (userAnswers[q.id] === q.correctIndex) {
          correct++;
        }
      }
    });
    return {
      total: activeQuestions.length,
      attempted,
      correct,
      incorrect: attempted - correct,
      unattempted: activeQuestions.length - attempted,
      score: correct,
      accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
    };
  };

  const currentQ = activeQuestions[currentQIndex];
  const scoreReport = calculateScore();

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <CheckSquare className="w-4 h-4" />
            <span>Interactive Exam Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            BPSC TRE 4.0 Practice MCQs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Targeted sets of 10, 20, 50, or 100 questions. 4 options, bilingual explanations, and real-time performance analytics.
          </p>
        </div>

        {!isTestActive && (
          <button
            onClick={handleStartTest}
            disabled={activeQuestions.length === 0}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Practice Test</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {!isTestActive ? (
        /* Test Configuration Setup Panel */
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900">
              Customize Your Practice Session
            </h2>

            {/* Question count selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
                Select Number of Questions
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[10, 20, 50, 100].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setSetCount(cnt)}
                    className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      setCount === cnt
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{cnt} Questions</span>
                    <span className="block text-[10px] text-slate-400 font-normal mt-0.5">
                      ~{cnt} Minutes
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Filter */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
                Filter by Topic / Subject
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'All',
                  'Number System & Boolean Logic',
                  'Data Structures',
                  'DBMS & Normalization',
                  'Computer Networks',
                  'Operating Systems',
                  'Python Programming',
                  'Cyber Security & IT Act',
                  'Software Engineering',
                ].map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedTopic === topic
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
                Difficulty Level
              </label>
              <div className="flex gap-2">
                {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedDifficulty === diff
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Ready Card */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                Available questions matching filter: <strong className="text-slate-900">{filteredPool.length}</strong> (Testing <strong className="text-slate-900">{Math.min(filteredPool.length, setCount)}</strong> questions)
              </div>
              <button
                onClick={handleStartTest}
                disabled={activeQuestions.length === 0}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                Begin Test Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Active Test Runner Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Workspace */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Test Bar */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">
                  Question <strong className="text-white">{currentQIndex + 1}</strong> of {activeQuestions.length}
                </span>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {currentQ?.difficulty}
                </span>
              </div>

              {/* Timer */}
              <div className={`flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full ${
                secondsRemaining < 120 ? 'bg-rose-500/20 text-rose-300 animate-pulse' : 'bg-slate-800 text-emerald-400'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            </div>

            {/* Question Details */}
            {currentQ && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded block w-fit mb-2">
                    {currentQ.topicName}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                    {currentQ.question}
                  </h3>
                  {currentQ.questionHindi && (
                    <p className="text-sm font-medium text-slate-600 mt-1 whitespace-pre-line">
                      {currentQ.questionHindi}
                    </p>
                  )}
                  {currentQ.pyqReference && (
                    <span className="inline-block mt-2 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Asked in: {currentQ.pyqReference}
                    </span>
                  )}
                </div>

                {/* 4 Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option, optIdx) => {
                    const isSelected = userAnswers[currentQ.id] === optIdx;
                    let optStyle = isSelected
                      ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-bold ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-800';

                    if (isTestSubmitted) {
                      if (optIdx === currentQ.correctIndex) {
                        optStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        optStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isTestSubmitted}
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`w-full p-4 rounded-2xl border text-xs sm:text-sm text-left flex items-start gap-3 transition-all cursor-pointer ${optStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <div className="flex-1">
                          <span className="block">{option}</span>
                          {currentQ.optionsHindi && currentQ.optionsHindi[optIdx] && currentQ.optionsHindi[optIdx] !== option && (
                            <span className="block text-xs text-slate-500 font-normal mt-0.5">
                              {currentQ.optionsHindi[optIdx]}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* If submitted, show detailed explanation */}
                {isTestSubmitted && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Correct Answer: Option {String.fromCharCode(65 + currentQ.correctIndex)}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                    {currentQ.explanationHindi && (
                      <p className="text-[11px] text-slate-500 italic">
                        {currentQ.explanationHindi}
                      </p>
                    )}
                  </div>
                )}

                {/* Navigation controls */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentQIndex((i) => Math.max(0, i - 1))}
                    disabled={currentQIndex === 0}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {!isTestSubmitted ? (
                    currentQIndex < activeQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQIndex((i) => i + 1)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsTestSubmitted(true)}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        Submit Test
                      </button>
                    )
                  ) : (
                    currentQIndex < activeQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQIndex((i) => i + 1)}
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsTestActive(false)}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
                      >
                        Finish Review
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Question Palette & Scorecard */}
          <div className="lg:col-span-4 space-y-4">
            {isTestSubmitted && (
              /* Performance Scorecard */
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-3xl p-6 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Test Report Card
                  </span>
                  <Award className="w-5 h-5 text-amber-400" />
                </div>

                <div className="text-center py-2">
                  <div className="text-4xl font-black text-amber-400">
                    {scoreReport.score} <span className="text-lg text-white/70">/ {scoreReport.total}</span>
                  </div>
                  <p className="text-xs text-blue-100 mt-1">
                    Accuracy: <strong>{scoreReport.accuracy}%</strong>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white/10 p-2 rounded-xl">
                    <span className="text-emerald-400 font-bold block">{scoreReport.correct}</span>
                    <span className="text-[10px] text-slate-300">Correct</span>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl">
                    <span className="text-rose-400 font-bold block">{scoreReport.incorrect}</span>
                    <span className="text-[10px] text-slate-300">Wrong</span>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl">
                    <span className="text-amber-300 font-bold block">{scoreReport.unattempted}</span>
                    <span className="text-[10px] text-slate-300">Skipped</span>
                  </div>
                </div>

                <button
                  onClick={handleStartTest}
                  className="w-full py-2.5 bg-white text-blue-950 font-bold text-xs rounded-xl shadow-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              </div>
            )}

            {/* Question Palette Grid */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Question Palette
                </h4>
                <span className="text-xs text-slate-500">
                  {Object.keys(userAnswers).length}/{activeQuestions.length} Answered
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {activeQuestions.map((q, idx) => {
                  const isCurrent = idx === currentQIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCorrect = userAnswers[q.id] === q.correctIndex;

                  let btnClass = 'bg-slate-100 text-slate-700 border-slate-200';
                  if (isCurrent) {
                    btnClass = 'ring-2 ring-blue-600 bg-blue-100 font-black text-blue-900 border-blue-400';
                  } else if (isTestSubmitted) {
                    btnClass = isCorrect
                      ? 'bg-emerald-500 text-white font-bold'
                      : isAnswered ? 'bg-rose-500 text-white font-bold' : 'bg-slate-100 text-slate-400';
                  } else if (isAnswered) {
                    btnClass = 'bg-blue-600 text-white font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-9 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${btnClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {!isTestSubmitted && (
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setIsTestSubmitted(true)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Submit Practice Test
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
