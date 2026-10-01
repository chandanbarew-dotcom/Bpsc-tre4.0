import React, { useState } from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';

interface Props {
  variant?: 'banner' | 'footer';
}

export const DisclaimerBanner: React.FC<Props> = ({ variant = 'banner' }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed && variant === 'banner') return null;

  if (variant === 'footer') {
    return (
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 leading-relaxed shadow-sm">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5 text-amber-950">महत्वपूर्ण वैधानिक अस्वीकरण (Important Disclaimer):</span>
            <p>
              यह वेबसाइट स्वतंत्र शैक्षणिक अध्ययन सामग्री उपलब्ध कराने के उद्देश्य से बनाई गई है। यह BPSC/Bihar Government की आधिकारिक वेबसाइट नहीं है। आधिकारिक सूचना, परीक्षा तिथि, विज्ञापन एवं भर्ती नियमों के लिए कृपया संबंधित सरकारी/आधिकारिक स्रोत (bpsc.bih.nic.in) देखें।
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Official Disclaimer" className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shrink-0">
            सूचना / Notice
          </span>
          <p className="truncate text-white/95 font-medium">
            यह वेबसाइट स्वतंत्र शैक्षणिक अध्ययन सामग्री हेतु है। यह BPSC की आधिकारिक वेबसाइट नहीं है। आधिकारिक सूचना हेतु bpsc.bih.nic.in देखें।
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-white/20 rounded transition-colors shrink-0"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
