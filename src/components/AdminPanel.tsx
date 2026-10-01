import React, { useState } from 'react';
import { 
  X, 
  Shield, 
  FileText, 
  Layers, 
  CheckSquare, 
  CreditCard, 
  Users, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  IndianRupee, 
  Save, 
  Sparkles,
  Search
} from 'lucide-react';
import { ChapterNote, MCQQuestion, PDFProduct, PurchaseRecord, SyllabusUnit, User } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pdfProducts: PDFProduct[];
  setPdfProducts: React.Dispatch<React.SetStateAction<PDFProduct[]>>;
  syllabusData: SyllabusUnit[];
  setSyllabusData: React.Dispatch<React.SetStateAction<SyllabusUnit[]>>;
  mcqs: MCQQuestion[];
  setMcqs: React.Dispatch<React.SetStateAction<MCQQuestion[]>>;
  purchases: PurchaseRecord[];
  users: User[];
  tickerNotice: string;
  setTickerNotice: (val: string) => void;
}

export const AdminPanel: React.FC<Props> = ({
  isOpen,
  onClose,
  pdfProducts,
  setPdfProducts,
  syllabusData,
  setSyllabusData,
  mcqs,
  setMcqs,
  purchases,
  users,
  tickerNotice,
  setTickerNotice,
}) => {
  const [activeTab, setActiveTab] = useState<'pdfs' | 'syllabus' | 'mcqs' | 'purchases' | 'users' | 'content'>('pdfs');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Form states for adding new PDF
  const [newPdfTitle, setNewPdfTitle] = useState('');
  const [newPdfSession, setNewPdfSession] = useState(pdfProducts.length + 1);
  const [newPdfCategory, setNewPdfCategory] = useState('Core CS');
  const [newPdfPages, setNewPdfPages] = useState(20);
  const [newPdfPrice, setNewPdfPrice] = useState(1); // Default ₹1
  const [newPdfDesc, setNewPdfDesc] = useState('');

  // Form states for adding new MCQ
  const [newMcqQ, setNewMcqQ] = useState('');
  const [newMcqQHindi, setNewMcqQHindi] = useState('');
  const [newMcqOpts, setNewMcqOpts] = useState(['', '', '', '']);
  const [newMcqCorrect, setNewMcqCorrect] = useState(0);
  const [newMcqExp, setNewMcqExp] = useState('');
  const [newMcqTopic, setNewMcqTopic] = useState('Operating Systems');
  const [newMcqDiff, setNewMcqDiff] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  // Form state for new syllabus topic
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');
  const [targetUnitId, setTargetUnitId] = useState(syllabusData[0]?.id || 'unit-1');

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleAddPdf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPdfTitle) return;

    const newProduct: PDFProduct = {
      id: `pdf-session-${newPdfSession}`,
      sessionNumber: Number(newPdfSession),
      title: `Session ${newPdfSession < 10 ? `0${newPdfSession}` : newPdfSession} – ${newPdfTitle}`,
      titleHindi: `सत्र ${newPdfSession} – ${newPdfTitle}`,
      category: newPdfCategory,
      pages: Number(newPdfPages),
      fileSize: '3.0 MB',
      price: Number(newPdfPrice),
      isFree: false,
      description: newPdfDesc || 'Complete exam-oriented BPSC TRE notes with solved questions.',
      topicsCovered: ['Core Concepts', 'Handwritten Formulas', 'PYQ Solved'],
      samplePreview: ['Page 1: Concepts', 'Page 2: Practice Set'],
    };

    setPdfProducts((prev) => [...prev, newProduct]);
    setNewPdfTitle('');
    setNewPdfDesc('');
    setNewPdfSession(pdfProducts.length + 2);
    showNotification('New PDF session note published at ₹1 successfully!');
  };

  const handleDeletePdf = (id: string) => {
    setPdfProducts((prev) => prev.filter((p) => p.id !== id));
    showNotification('PDF session removed.');
  };

  const handleAddMcq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMcqQ || newMcqOpts.some((o) => !o.trim())) return;

    const newQuestion: MCQQuestion = {
      id: `mcq-${Date.now()}`,
      topicId: 'custom',
      topicName: newMcqTopic,
      question: newMcqQ,
      questionHindi: newMcqQHindi,
      options: newMcqOpts,
      optionsHindi: newMcqOpts,
      correctIndex: Number(newMcqCorrect),
      explanation: newMcqExp || 'Official BPSC TRE standard solution.',
      difficulty: newMcqDiff,
      pyqReference: 'BPSC TRE 4.0 Mock',
    };

    setMcqs((prev) => [newQuestion, ...prev]);
    setNewMcqQ('');
    setNewMcqQHindi('');
    setNewMcqOpts(['', '', '', '']);
    setNewMcqExp('');
    showNotification('New MCQ added with 4 options and explanation!');
  };

  const handleAddSyllabusTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle) return;

    setSyllabusData((prev) =>
      prev.map((unit) => {
        if (unit.id === targetUnitId) {
          return {
            ...unit,
            subtopics: [
              ...unit.subtopics,
              {
                id: `sub_${Date.now()}`,
                title: newTopicTitle,
                description: newTopicDesc || 'Added by administrator for BPSC TRE 4.0 syllabus.',
                isImportant: true,
              },
            ],
          };
        }
        return unit;
      })
    );

    setNewTopicTitle('');
    setNewTopicDesc('');
    showNotification('Syllabus topic added successfully!');
  };

  const totalRevenue = purchases.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide">
                  BPSC TRE 4.0 Admin Dashboard
                </h2>
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded">
                  CMS Control
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage PDF Notes, Syllabus, MCQs, Purchases & Content
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 text-xs flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'pdfs', label: `PDF Notes (${pdfProducts.length})`, icon: FileText },
            { id: 'syllabus', label: 'Syllabus Manager', icon: Layers },
            { id: 'mcqs', label: `MCQ Bank (${mcqs.length})`, icon: CheckSquare },
            { id: 'purchases', label: `Purchases (₹${totalRevenue})`, icon: CreditCard },
            { id: 'users', label: `Users (${users.length})`, icon: Users },
            { id: 'content', label: 'Website Content', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-700 bg-white font-bold shadow-xs'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PDF Notes Management */}
          {activeTab === 'pdfs' && (
            <div className="space-y-6">
              {/* Add New Session Note Form */}
              <form onSubmit={handleAddPdf} className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-4">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>Publish New PDF Session Note (Default: ₹1)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Session Number</label>
                    <input
                      type="number"
                      required
                      value={newPdfSession}
                      onChange={(e) => setNewPdfSession(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700 block mb-1">Topic Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Graph Theory & Shortest Path Algorithms"
                      value={newPdfTitle}
                      onChange={(e) => setNewPdfTitle(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Category</label>
                    <select
                      value={newPdfCategory}
                      onChange={(e) => setNewPdfCategory(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                    >
                      <option>Fundamentals</option>
                      <option>Digital Electronics</option>
                      <option>Core CS</option>
                      <option>Systems</option>
                      <option>Security & Web</option>
                      <option>Software</option>
                      <option>PYQ Master</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Total Pages</label>
                    <input
                      type="number"
                      value={newPdfPages}
                      onChange={(e) => setNewPdfPages(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Price (₹) [Default = ₹1]</label>
                    <input
                      type="number"
                      value={newPdfPrice}
                      onChange={(e) => setNewPdfPrice(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white font-bold text-emerald-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 text-xs">Session Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short description of concepts, diagrams, and formulas in this note..."
                    value={newPdfDesc}
                    onChange={(e) => setNewPdfDesc(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Upload & Publish PDF Note</span>
                </button>
              </form>

              {/* Existing PDF Session List */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Published Session Notes ({pdfProducts.length})
                </h3>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  {pdfProducts.map((p) => (
                    <div key={p.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center">
                          #{p.sessionNumber}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900">{p.title}</h4>
                          <span className="text-[11px] text-slate-500">
                            {p.category} • {p.pages} Pages • Size: {p.fileSize}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-black text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ₹{p.price}
                        </span>
                        <button
                          onClick={() => handleDeletePdf(p.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Syllabus Manager */}
          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              <form onSubmit={handleAddSyllabusTopic} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Add New Topic to Syllabus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Target Unit</label>
                    <select
                      value={targetUnitId}
                      onChange={(e) => setTargetUnitId(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                    >
                      {syllabusData.map((u) => (
                        <option key={u.id} value={u.id}>Unit {u.unitNumber}: {u.title.substring(0, 30)}...</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700 block mb-1">Topic Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asynchronous Transfer Mode & Congestion Control"
                      value={newTopicTitle}
                      onChange={(e) => setNewTopicTitle(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1 text-xs">Topic Description & Reference</label>
                  <input
                    type="text"
                    placeholder="NCERT Class 12 Chapter 10, Leaky Bucket Algorithm..."
                    value={newTopicDesc}
                    onChange={(e) => setNewTopicDesc(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Add Topic to Syllabus
                </button>
              </form>

              {/* Units Overview */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Current Syllabus Structure ({syllabusData.length} Units)
                </h4>
                {syllabusData.map((unit) => (
                  <div key={unit.id} className="p-3.5 rounded-xl border border-slate-200 bg-white text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>Unit {unit.unitNumber}: {unit.title}</span>
                      <span className="text-blue-700">{unit.subtopics.length} Subtopics</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{unit.titleHindi}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MCQ Bank */}
          {activeTab === 'mcqs' && (
            <div className="space-y-6">
              <form onSubmit={handleAddMcq} className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4">
                <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Add New Practice MCQ
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Topic / Subject</label>
                    <input
                      type="text"
                      required
                      value={newMcqTopic}
                      onChange={(e) => setNewMcqTopic(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Difficulty</label>
                    <select
                      value={newMcqDiff}
                      onChange={(e) => setNewMcqDiff(e.target.value as any)}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 text-xs">Question Text (English)</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Enter full question here..."
                    value={newMcqQ}
                    onChange={(e) => setNewMcqQ(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 text-xs">Question Text (Hindi - Optional)</label>
                  <input
                    type="text"
                    placeholder="हिंदी में प्रश्न दर्ज करें..."
                    value={newMcqQHindi}
                    onChange={(e) => setNewMcqQHindi(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                {/* 4 Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {newMcqOpts.map((opt, i) => (
                    <div key={i}>
                      <label className="font-semibold text-slate-700 block mb-0.5">
                        Option {String.fromCharCode(65 + i)}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={`Option ${String.fromCharCode(65 + i)} text`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...newMcqOpts];
                          updated[i] = e.target.value;
                          setNewMcqOpts(updated);
                        }}
                        className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Correct Option</label>
                    <select
                      value={newMcqCorrect}
                      onChange={(e) => setNewMcqCorrect(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white font-bold text-emerald-800"
                    >
                      <option value={0}>Option A</option>
                      <option value={1}>Option B</option>
                      <option value={2}>Option C</option>
                      <option value={3}>Option D</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Short Explanation</label>
                    <input
                      type="text"
                      placeholder="Why this answer is correct..."
                      value={newMcqExp}
                      onChange={(e) => setNewMcqExp(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Save Question to MCQ Bank
                </button>
              </form>

              {/* Recent MCQs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Active Questions ({mcqs.length})
                </h4>
                {mcqs.slice(0, 5).map((q) => (
                  <div key={q.id} className="p-3.5 rounded-xl border border-slate-200 bg-white text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 line-clamp-1">{q.question}</span>
                      <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="text-emerald-700 text-[11px] font-semibold">
                      Answer: Option {String.fromCharCode(65 + q.correctIndex)} ({q.options[q.correctIndex]})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Purchases & Revenue */}
          {activeTab === 'purchases' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <span className="text-[11px] text-emerald-800 font-bold block">Total Revenue</span>
                  <div className="text-2xl font-black text-emerald-950 mt-1">₹{totalRevenue}</div>
                  <span className="text-[10px] text-emerald-600">From ₹1 Student Notes</span>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <span className="text-[11px] text-blue-800 font-bold block">Total Purchases</span>
                  <div className="text-2xl font-black text-blue-950 mt-1">{purchases.length}</div>
                  <span className="text-[10px] text-blue-600">Verified Transactions</span>
                </div>
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                  <span className="text-[11px] text-purple-800 font-bold block">Success Rate</span>
                  <div className="text-2xl font-black text-purple-950 mt-1">100%</div>
                  <span className="text-[10px] text-purple-600">Zero Failed Orders</span>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Payment ID</th>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Note Purchased</th>
                      <th className="p-3">Method</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {purchases.map((p) => (
                      <tr key={p.id}>
                        <td className="p-3 font-mono text-blue-900 font-bold">{p.paymentId}</td>
                        <td className="p-3">
                          <span className="font-semibold text-slate-800 block">{p.userName}</span>
                          <span className="text-[10px] text-slate-400">{p.userEmail}</span>
                        </td>
                        <td className="p-3 text-slate-700 font-medium truncate max-w-[200px]">{p.pdfTitle}</td>
                        <td className="p-3 text-slate-600">{p.paymentMethod}</td>
                        <td className="p-3 font-bold text-slate-900">₹{p.amount}</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: Users */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Registered Aspirants ({users.length})
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white overflow-hidden text-xs">
                {users.map((u) => (
                  <div key={u.id} className="p-3.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{u.name}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${u.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-800'}`}>
                          {u.role}
                        </span>
                      </div>
                      <span className="text-slate-500 text-[11px]">📱 +91 {u.mobile} • {u.email || 'No email'}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-900 font-bold">{u.purchasedPdfIds.length} Notes Unlocked</span>
                      <span className="block text-[10px] text-slate-400">Registered Student</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Website Content & Ticker */}
          {activeTab === 'content' && (
            <div className="space-y-4 max-w-xl">
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Top Announcement Ticker Notice
                </h3>
                <textarea
                  rows={3}
                  value={tickerNotice}
                  onChange={(e) => setTickerNotice(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
                />
                <button
                  onClick={() => showNotification('Announcement ticker updated!')}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Save Ticker Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
