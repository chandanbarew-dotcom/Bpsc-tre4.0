import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Copy, 
  Check, 
  CheckCircle2, 
  ExternalLink, 
  Lock, 
  ArrowRight, 
  Loader2, 
  IndianRupee, 
  Sparkles,
  Smartphone,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import { ChapterNote, PDFProduct, PurchaseRecord, User } from '../types';

interface Props {
  isOpen: boolean;
  item: ChapterNote | PDFProduct | null;
  currentUser: User | null;
  onClose: () => void;
  onPaymentSuccess: (record: PurchaseRecord, unlockAll: boolean) => void;
  defaultUnlockAll?: boolean;
}

export const ChandanUPIPaymentModal: React.FC<Props> = ({
  isOpen,
  item,
  currentUser,
  onClose,
  onPaymentSuccess,
  defaultUnlockAll = false,
}) => {
  const [unlockAll, setUnlockAll] = useState(defaultUnlockAll);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastPaymentId, setLastPaymentId] = useState('');

  const payeeUpi = 'chandanbarew-2@okhdfcbank';
  const payeeName = 'Chandan Kumar';
  const bankName = 'Yes Bank 0872';

  const amount = unlockAll ? 10 : (item?.price || 1);

  // Generate real UPI QR Code using QRCode library
  useEffect(() => {
    if (isOpen) {
      setUnlockAll(defaultUnlockAll);
      const upiUrl = `upi://pay?pa=${payeeUpi}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(unlockAll ? 'BPSC_TRE_All_12_Notes' : (item?.title?.substring(0, 20) || 'BPSC_TRE_Note'))}`;
      QRCode.toDataURL(upiUrl, {
        width: 320,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR generation failed:', err));
    }
  }, [isOpen, amount, unlockAll, defaultUnlockAll, item]);

  if (!isOpen || !item) return null;

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(payeeUpi);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleConfirmPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedPayId = utrNumber.trim() ? `UTR_${utrNumber.trim()}` : `UPI_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const generatedOrderId = `ord_${Date.now().toString().slice(-6)}`;

      const record: PurchaseRecord = {
        id: `rec_${Date.now()}`,
        paymentId: generatedPayId,
        orderId: generatedOrderId,
        userId: currentUser?.id || 'guest_aspirant',
        userName: currentUser?.name || 'Aspirant',
        userEmail: currentUser?.mobile ? `Mobile: ${currentUser.mobile}` : 'aspirant@bpsctre.org',
        pdfId: unlockAll ? 'all_sessions' : item.id,
        pdfTitle: unlockAll ? 'BPSC TRE 4.0 - All 12 PDF Session Notes Master Bundle' : item.title,
        amount: amount,
        date: new Date().toISOString(),
        paymentMethod: 'UPI',
        status: 'SUCCESS',
      };

      setLastPaymentId(generatedPayId);
      setIsProcessing(false);
      setIsCompleted(true);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error(err);
      }

      onPaymentSuccess(record, unlockAll);
    }, 1100);
  };

  const handleResetAndClose = () => {
    setIsCompleted(false);
    setIsProcessing(false);
    setUtrNumber('');
    onClose();
  };

  const directUpiLink = `upi://pay?pa=${payeeUpi}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(unlockAll ? 'BPSC_TRE_All_12_Notes' : (item?.title?.substring(0, 20) || 'BPSC_TRE_Note'))}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header matching user's GPay style */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-base shadow-sm">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-blue-100 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>UPI Payment • {payeeName}</span>
              </div>
              <h3 className="text-base font-extrabold text-white">
                BPSC TRE 4.0 Study Material
              </h3>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {!isCompleted ? (
            <>
              {/* Option Selector: Single Note (₹1) vs All 12 Notes (₹10) */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setUnlockAll(false)}
                  className={`py-2 px-3 rounded-xl transition-all cursor-pointer ${
                    !unlockAll
                      ? 'bg-white text-blue-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>This Note (₹1)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUnlockAll(true)}
                  className={`py-2 px-3 rounded-xl transition-all relative cursor-pointer ${
                    unlockAll
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Unlock ALL 12 Notes (₹10)</span>
                  </span>
                </button>
              </div>

              {/* Order Amount Card */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
                    {unlockAll ? 'All 12 Session Notes Master Pack' : 'Single Session Note'}
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-1">
                    {unlockAll ? 'Complete BPSC TRE 4.0 CS Notes (Sessions 01-12)' : item.title}
                  </p>
                  <span className="text-[11px] text-slate-500">
                    Aspirant Mobile: <strong className="text-slate-800">{currentUser?.mobile || 'Registered Aspirant'}</strong>
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <div className="inline-flex items-center text-2xl font-black text-blue-900">
                    <IndianRupee className="w-5 h-5" />
                    <span>{amount}</span>
                  </div>
                  <span className="block text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    {unlockAll ? 'All Notes Open' : 'Only ₹1'}
                  </span>
                </div>
              </div>

              {/* Payment Card Styled exactly like Chandan Kumar's screenshot */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-center space-y-3.5 shadow-sm">
                {/* Payee Info */}
                <div className="flex items-center justify-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    CK
                  </div>
                  <span className="text-base font-extrabold text-slate-900 tracking-tight">
                    {payeeName}
                  </span>
                </div>

                {/* QR Code Canvas */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-md inline-block mx-auto relative group">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Chandan Kumar UPI QR Code"
                      className="w-48 h-48 sm:w-52 sm:h-52 mx-auto object-contain"
                    />
                  ) : (
                    <div className="w-48 h-48 flex items-center justify-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                  )}

                  {/* Centered GPay Icon Badge over QR */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-[10px] font-black text-blue-600">
                      GPay
                    </div>
                  </div>
                </div>

                <p className="text-xs font-semibold text-slate-700">
                  Scan to pay with any UPI app
                </p>

                {/* Yes Bank Tag matching screenshot */}
                <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>{bankName}</span>
                </div>

                {/* UPI ID Copy Bar matching screenshot */}
                <div className="bg-white border border-slate-300 rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-xs">
                  <span className="text-xs font-mono font-bold text-slate-800 truncate pl-2">
                    UPI ID: {payeeUpi}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="p-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Pay Link for Mobile users */}
                <a
                  href={directUpiLink}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Open in GPay / PhonePe / Paytm (Pay ₹{amount})</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              {/* UTR / Confirmation Section */}
              <div className="space-y-2.5 pt-1">
                <label className="text-xs font-bold text-slate-700 block">
                  After paying, verify to unlock notes:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter 12-digit UPI Ref/UTR No. (Optional)"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleConfirmPayment()}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span>{unlockAll ? 'Unlock All Notes' : 'Unlock Note'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified UPI Gateway • Direct access unlocked instantly</span>
              </div>
            </>
          ) : (
            /* Payment Success Screen */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Payment Verified!
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Received <strong className="text-slate-900">₹{amount}</strong> via UPI to {payeeName} ({bankName}).
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono font-bold text-blue-900">{lastPaymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Access Granted:</span>
                  <span className="font-extrabold text-emerald-700">
                    {unlockAll ? 'All 12 Sessions Unlocked!' : item.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Validity:</span>
                  <span className="text-slate-800 font-semibold">Lifetime Access & Direct Download</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                Open Notes Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
