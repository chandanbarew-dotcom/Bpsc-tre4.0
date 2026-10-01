import React from 'react';
import { 
  DownloadCloud, 
  FileText, 
  Download, 
  CheckCircle, 
  Award, 
  Sparkles, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { FREE_RESOURCES } from '../data/mockData';
import { jsPDF } from 'jspdf';

interface Props {
  onStartQuiz: () => void;
  onNavigateToSyllabus: () => void;
  lang: 'en' | 'hi';
}

export const FreeResources: React.FC<Props> = ({
  onStartQuiz,
  onNavigateToSyllabus,
  lang,
}) => {
  const handleDownloadFreeResource = (resource: typeof FREE_RESOURCES[0]) => {
    if (resource.isQuiz) {
      onStartQuiz();
      return;
    }

    // Generate real free sample PDF
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 16;
    let y = 20;

    // Header
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 0, pageWidth, 14, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('BPSC TRE 4.0 CS PREPARATION — FREE RESOURCE STUDY MATERIAL', margin, 9);

    y = 28;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(30, 58, 138);
    doc.text(resource.title, margin, y);
    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(resource.description, margin, y);
    y += 12;

    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, pageWidth - margin * 2, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('50 GOLDEN RULES FOR BPSC TRE 4.0 COMPUTER SCIENCE', margin + 4, y + 5.5);
    y += 14;

    const sampleRules = [
      '1. In 2\'s complement, MSB represents sign; arithmetic subtraction is simply adding the 2\'s complement.',
      '2. Inorder traversal of BST always produces sorted keys in ascending order.',
      '3. 3NF eliminates transitive dependency; BCNF ensures every determinant is a super key.',
      '4. HTTPS default port is 443; DNS is 53; SSH is 22; HTTP is 80.',
      '5. Banker\'s algorithm is used for Deadlock Avoidance, not Deadlock Prevention.',
      '6. Belady\'s anomaly happens in FIFO page replacement, not in LRU or Optimal.',
      '7. Quick Sort worst case complexity is O(n^2); Average case is O(n log n).',
      '8. A Full Adder can be constructed using 2 Half Adders and 1 OR Gate.',
      '9. Program Counter (PC) register stores the address of the NEXT instruction.',
      '10. IT Act Section 66 deals with computer-related offenses and hacking.'
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);

    sampleRules.forEach((rule) => {
      const lines = doc.splitTextToSize(rule, pageWidth - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * 6 + 2;
    });

    y += 6;
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 22, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(146, 64, 14);
    doc.text('WANT COMPLETE CHAPTER-WISE DETAILED NOTES?', margin + 5, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(120, 53, 15);
    doc.text('Get all 12 Session PDF notes at only ₹1 per note with complete explanations and formulas.', margin + 5, y + 12);
    doc.text('Visit: BPSC TRE Computer Science Portal (10+2 PGT Preparation)', margin + 5, y + 17);

    doc.save(resource.downloadName || 'BPSC_TRE_Free_Study_Material.pdf');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <DownloadCloud className="w-4 h-4" />
            <span>Open Access Material</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Free BPSC TRE Study Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Selected free notes, official syllabus PDFs, previous year trap guides, and diagnostic mock tests to kickstart your preparation.
          </p>
        </div>

        <button
          onClick={onStartQuiz}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>Take Free Diagnostic Test</span>
        </button>
      </div>

      {/* Free Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FREE_RESOURCES.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-lg transition-all p-6 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {res.tag}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {res.size}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {res.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {res.titleHindi}
              </p>
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>100% Free Access</span>
              </span>

              <button
                onClick={() => handleDownloadFreeResource(res)}
                className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {res.isQuiz ? (
                  <>
                    <span>Start Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Free PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Syllabi Callout */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold">
            Need Complete Chapter-Wise PDF Notes?
          </h3>
          <p className="text-xs text-blue-200">
            Unlock all 12 session notes for just ₹1 per note with formulas and solved previous year questions.
          </p>
        </div>

        <button
          onClick={onNavigateToSyllabus}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
        >
          Explore ₹1 Session Notes
        </button>
      </div>
    </div>
  );
};
