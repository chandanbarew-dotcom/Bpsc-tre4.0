import React from 'react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { BookOpen, ShieldCheck, Heart, Mail, ExternalLink, IndianRupee } from 'lucide-react';

interface Props {
  onNavigate: (tab: string) => void;
  onOpenLegal: (modal: 'privacy' | 'terms' | 'refund' | 'contact' | 'sitemap') => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenLegal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-20 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Important Disclaimer Banner at footer */}
        <DisclaimerBanner variant="footer" />

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-md">
                B
              </div>
              <div>
                <span className="font-extrabold text-white text-base">
                  BPSC TRE Computer Science
                </span>
                <p className="text-[11px] text-slate-400">
                  Syllabus & Notes Portal • BPSC TRE 4.0
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed pr-4 text-xs">
              Dedicated educational study platform for candidates preparing for Bihar Public Service Commission (BPSC) TRE 4.0 Higher Secondary (10+2 PGT) Computer Science Teacher Recruitment.
            </p>

            <div className="flex items-center gap-2 text-amber-400 font-bold pt-1">
              <IndianRupee className="w-4 h-4" />
              <span>Complete PDF Session Notes – Only ₹1 Per Note</span>
            </div>
          </div>

          {/* Col 2: Syllabus & Topics */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Syllabus Units
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigate('syllabus')} className="hover:text-white transition-colors">Computer Organization</button></li>
              <li><button onClick={() => onNavigate('syllabus')} className="hover:text-white transition-colors">Python & C++ OOP</button></li>
              <li><button onClick={() => onNavigate('syllabus')} className="hover:text-white transition-colors">Data Structures (BST, Heap)</button></li>
              <li><button onClick={() => onNavigate('syllabus')} className="hover:text-white transition-colors">DBMS & SQL Normalization</button></li>
              <li><button onClick={() => onNavigate('syllabus')} className="hover:text-white transition-colors">Computer Networks & Subnetting</button></li>
              <li><button onClick={() => onNavigate('syllabus')} className="hover:text-white transition-colors">Operating Systems & Paging</button></li>
            </ul>
          </div>

          {/* Col 3: Study Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Study Material
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigate('pdfs')} className="hover:text-white transition-colors">₹1 PDF Session Notes</button></li>
              <li><button onClick={() => onNavigate('notes')} className="hover:text-white transition-colors">Chapter-Wise Hand Notes</button></li>
              <li><button onClick={() => onNavigate('mcqs')} className="hover:text-white transition-colors">1000+ Practice MCQs</button></li>
              <li><button onClick={() => onNavigate('free')} className="hover:text-white transition-colors">Free Diagnostic Mock Test</button></li>
              <li><button onClick={() => onNavigate('my-notes')} className="hover:text-white transition-colors">My Downloaded Library</button></li>
            </ul>
          </div>

          {/* Col 4: Legal & Policy */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => onOpenLegal('refund')} className="hover:text-white transition-colors">Refund & Cancellation (₹1)</button></li>
              <li><button onClick={() => onOpenLegal('contact')} className="hover:text-white transition-colors">Contact / Aspirant Help</button></li>
              <li><button onClick={() => onOpenLegal('sitemap')} className="hover:text-white transition-colors">Sitemap</button></li>
              <li>
                <a
                  href="https://bpsc.bih.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  <span>BPSC Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & SEO strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} BPSC TRE Computer Science – Syllabus & Notes. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>BPSC TRE 4.0 CS Notes</span>
            <span>•</span>
            <span>Bihar STET Computer Science</span>
            <span>•</span>
            <span>Only ₹1 Per Note</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
