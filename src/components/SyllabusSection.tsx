import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Download, 
  Search, 
  BookOpen, 
  Flame, 
  CheckSquare, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { SyllabusUnit } from '../types';
import { jsPDF } from 'jspdf';

interface Props {
  syllabusData: SyllabusUnit[];
  lang: 'en' | 'hi';
  onNavigateToNotes: () => void;
}

export const SyllabusSection: React.FC<Props> = ({
  syllabusData,
  lang,
  onNavigateToNotes,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>('unit-1');
  const [completedSubtopics, setCompletedSubtopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bpsc_completed_topics');
      return saved ? JSON.parse(saved) : ['1-1', '1-3'];
    } catch {
      return ['1-1', '1-3'];
    }
  });

  const categories = ['All', 'Class XI-XII', 'Core CS', 'Systems', 'Software & Web', 'Emerging'];

  const toggleSubtopic = (id: string) => {
    setCompletedSubtopics((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('bpsc_completed_topics', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const filteredUnits = selectedCategory === 'All'
    ? syllabusData
    : syllabusData.filter((u) => u.category === selectedCategory);

  const totalSubtopics = syllabusData.reduce((acc, u) => acc + u.subtopics.length, 0);
  const progressPercent = Math.round((completedSubtopics.length / totalSubtopics) * 100);

  // Generate official Syllabus PDF
  const downloadSyllabusPDF = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 16;
    let y = 18;

    // Header banner
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 0, pageWidth, 16, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text('BPSC TRE 4.0 COMPUTER SCIENCE — COMPLETE OFFICIAL SYLLABUS', margin, 11);

    y = 26;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(30, 58, 138);
    doc.text('Higher Secondary (10+2 PGT) Teacher Recruitment Examination', margin, y);
    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text('Total Marks: 150 (Part I Language: 30, Part II General Studies: 40, Part III Computer Science: 80 Marks)', margin, y);
    y += 10;

    syllabusData.forEach((unit, idx) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, y, pageWidth - margin * 2, 8, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(`Unit ${unit.unitNumber}: ${unit.title} (${unit.expectedQuestions} Qs | ${unit.weightagePercent}%)`, margin + 3, y + 5.5);
      y += 12;

      unit.subtopics.forEach((sub) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 58, 138);
        doc.text(`• ${sub.title}:`, margin + 4, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
        const descLines = doc.splitTextToSize(sub.description, pageWidth - margin * 2 - 40);
        doc.text(descLines, margin + 40, y);
        y += descLines.length * 4.5 + 2;
      });
      y += 4;
    });

    doc.save('BPSC_TRE_4.0_Computer_Science_Syllabus.pdf');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Official Curriculum Breakdown</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            BPSC TRE 4.0 Computer Science Syllabus
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Aligned with Bihar State Higher Secondary (Class XI & XII) Computer Science NCERT/SCERT curriculum and previous question patterns of BPSC TRE 1.0, 2.0 and 3.0.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={downloadSyllabusPDF}
            className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Syllabus PDF</span>
          </button>
          <button
            onClick={onNavigateToNotes}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-all cursor-pointer"
          >
            <span>View Related Notes</span>
          </button>
        </div>
      </div>

      {/* Progress & Exam Pattern Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Aspirant Progress tracker */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-5 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
              Your Preparation Progress
            </span>
            <span className="text-sm font-bold text-amber-300">
              {progressPercent}% Done
            </span>
          </div>
          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-blue-100">
            {completedSubtopics.length} of {totalSubtopics} key subtopics marked as prepared. Click any checkbox below to track your study!
          </p>
        </div>

        {/* Exam Pattern Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Award className="w-4 h-4 text-amber-500" />
            <span>BPSC TRE 4.0 Exam Scheme</span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Part I (Language - Qualifying):</span>
              <strong className="text-slate-900">30 Marks</strong>
            </div>
            <div className="flex justify-between">
              <span>Part II (General Studies):</span>
              <strong className="text-slate-900">40 Marks</strong>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-1 text-blue-700 font-bold">
              <span>Part III (Computer Science):</span>
              <span>80 Marks (80 Qs)</span>
            </div>
          </div>
        </div>

        {/* Negative marking & duration */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Exam Duration & Scoring</span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Total Duration:</span>
              <strong className="text-slate-900">2 Hours 30 Mins</strong>
            </div>
            <div className="flex justify-between">
              <span>Total Questions:</span>
              <strong className="text-slate-900">150 Questions</strong>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Negative Marking:</span>
              <span>No Negative Marking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List of Units */}
      <div className="space-y-4">
        {filteredUnits.map((unit) => {
          const isExpanded = expandedUnitId === unit.id;
          const unitCompletedCount = unit.subtopics.filter((s) => completedSubtopics.includes(s.id)).length;

          return (
            <div
              key={unit.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
            >
              {/* Unit Header Bar */}
              <div
                onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center shrink-0">
                    U{unit.unitNumber}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        {unit.category}
                      </span>
                      <span className="text-xs text-blue-700 font-bold">
                        ~{unit.expectedQuestions} Qs in Exam ({unit.weightagePercent}%)
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                      {unit.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {unit.titleHindi}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline text-xs text-slate-500">
                    {unitCompletedCount}/{unit.subtopics.length} Done
                  </span>
                  <div className="p-1 rounded-lg text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Unit Content Subtopics (Visible when expanded) */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-100 space-y-3 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {unit.subtopics.map((sub) => {
                      const isDone = completedSubtopics.includes(sub.id);
                      return (
                        <div
                          key={sub.id}
                          className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                            isDone
                              ? 'bg-emerald-50/50 border-emerald-200'
                              : 'bg-white border-slate-200 hover:border-blue-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleSubtopic(sub.id)}
                            className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className={`text-xs font-bold ${isDone ? 'text-emerald-900 line-through' : 'text-slate-900'}`}>
                                {sub.title}
                              </h4>
                              {sub.isImportant && (
                                <span className="bg-rose-100 text-rose-700 text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                                  High Yield
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                              {sub.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Need exam-oriented notes for this unit?
                    </span>
                    <button
                      onClick={onNavigateToNotes}
                      className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Chapter Notes & Formulas</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
