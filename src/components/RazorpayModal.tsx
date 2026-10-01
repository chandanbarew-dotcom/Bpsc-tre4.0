import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, Smartphone, CreditCard, Building2, CheckCircle2, Lock, ArrowRight, Loader2, IndianRupee } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChapterNote, PDFProduct, PurchaseRecord, User } from '../types';

interface Props {
  isOpen: boolean;
  item: ChapterNote | PDFProduct | null;
  currentUser: User | null;
  onClose: () => void;
  onPaymentSuccess: (record: PurchaseRecord) => void;
}

export const RazorpayModal: React.FC<Props> = ({
  isOpen,
  item,
  currentUser,
  onClose,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'other'>('gpay');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastPaymentId, setLastPaymentId] = useState('');

  if (!isOpen || !item) return null;

  const handlePay = (selectedMethod: 'UPI' | 'Card' | 'NetBanking' = 'UPI') => {
    setIsProcessing(true);

    setTimeout(() => {
      const generatedPayId = `pay_bpsc_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const generatedOrderId = `order_${Math.random().toString(36).substring(2, 8)}`;
      
      const record: PurchaseRecord = {
        id: `rec_${Date.now()}`,
        paymentId: generatedPayId,
        orderId: generatedOrderId,
        userId: currentUser?.id || 'guest_user',
        userName: currentUser?.name || 'Aspirant',
        userEmail: currentUser?.email || 'aspirant@bpsctre.org',
        pdfId: item.id,
        pdfTitle: item.title,
        amount: item.price || 1,
        date: new Date().toISOString(),
        paymentMethod: selectedMethod,
        status: 'SUCCESS',
      };

      setLastPaymentId(generatedPayId);
      setIsProcessing(false);
      setIsCompleted(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.error(e);
      }

      onPaymentSuccess(record);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setIsCompleted(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header with Razorpay-like branding */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center font-black text-blue-200 text-base">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-blue-200 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Razorpay Secured Gateway</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                BPSC TRE CS Study Portal
              </h3>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        {!isCompleted ? (
          <div>
            {/* Order Summary Strip */}
            <div className="bg-blue-50/70 border-b border-blue-100 px-5 py-3.5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700 block">
                  Product / Note Session
                </span>
                <p className="text-sm font-bold text-slate-800 line-clamp-1">
                  {item.title}
                </p>
                <span className="text-xs text-slate-500">
                  {'pages' in item ? item.pages : item.totalPages} Pages • Printable PDF
                </span>
              </div>
              <div className="text-right shrink-0">
                <div className="inline-flex items-center text-xl font-extrabold text-blue-900">
                  <IndianRupee className="w-5 h-5" />
                  <span>{item.price}</span>
                </div>
                <span className="block text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                  99% Subsidy
                </span>
              </div>
            </div>

            {/* Candidate details */}
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-600">
              <span className="truncate">
                Aspirant: <strong className="text-slate-800">{currentUser?.name || 'Aspirant Student'}</strong>
              </span>
              <span className="text-slate-500 text-[11px] shrink-0">
                {currentUser?.email || 'aspirant@bpsctre.org'}
              </span>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="p-5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2.5">
                Choose Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setMethod('upi')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    method === 'upi'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mb-1 text-blue-600" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    method === 'card'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1 text-indigo-600" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('netbanking')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    method === 'netbanking'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Building2 className="w-4 h-4 mb-1 text-teal-600" />
                  <span>NetBanking</span>
                </button>
              </div>

              {/* Method Details */}
              {method === 'upi' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'gpay', name: 'GPay', color: 'text-blue-600 bg-blue-50' },
                      { id: 'phonepe', name: 'PhonePe', color: 'text-purple-600 bg-purple-50' },
                      { id: 'paytm', name: 'Paytm', color: 'text-sky-600 bg-sky-50' },
                      { id: 'other', name: 'Any UPI', color: 'text-emerald-600 bg-emerald-50' },
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setUpiApp(app.id as any)}
                        className={`py-2 px-1 text-center rounded-lg border text-xs font-medium transition-all ${
                          upiApp === app.id
                            ? 'border-blue-600 ring-2 ring-blue-500/20 bg-white font-bold text-blue-900'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                        }`}
                      >
                        <span className={`block font-bold text-xs ${app.color}`}>
                          {app.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. yourname@oksbi / yourname@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
                    />
                    <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-medium">
                      UPI ID / VPA
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px]">
                    <QrCode className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Instant UPI auto-verification ready. Zero transaction charges.</span>
                  </div>
                </div>
              )}

              {method === 'card' && (
                <div className="space-y-2.5 text-xs">
                  <input
                    type="text"
                    placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                    defaultValue="4315 2840 9182 4019"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      defaultValue="08/28"
                      className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-800"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      defaultValue="892"
                      maxLength={3}
                      className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-800 font-mono"
                    />
                  </div>
                </div>
              )}

              {method === 'netbanking' && (
                <div className="space-y-2 text-xs">
                  <select className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-800 bg-white">
                    <option>State Bank of India (SBI)</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Punjab National Bank (PNB)</option>
                    <option>Canara Bank / Bihar Gramin Bank</option>
                    <option>Bank of Baroda</option>
                  </select>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handlePay(method === 'upi' ? 'UPI' : method === 'card' ? 'Card' : 'NetBanking')}
                className="w-full mt-5 py-3 px-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Secure Payment ₹1...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{item.price} & Unlock PDF Instantly</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Protected Payment • RBI Compliant • 24hr Refund Guarantee</span>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Success View */
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              Payment Successful!
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Your payment of <strong className="text-slate-900">₹{item.price}</strong> has been verified.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left text-xs space-y-1.5 mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-bold text-blue-900">{lastPaymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unlocked Note:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[200px]">{item.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Access:</span>
                <span className="text-emerald-700 font-semibold">Lifetime & Downloadable</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Access Note & View in Library
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
