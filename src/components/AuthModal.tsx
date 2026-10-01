import React, { useState } from 'react';
import { X, Smartphone, Lock, Eye, EyeOff, User as UserIcon, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { User } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Retrieve existing registered accounts from localStorage
  const getStoredUsers = (): User[] => {
    try {
      const stored = localStorage.getItem('bpsc_registered_users');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveStoredUsers = (users: User[]) => {
    try {
      localStorage.setItem('bpsc_registered_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Clean mobile number (strip spaces/dashes)
    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      setErrorMsg('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें (Please enter a valid 10-digit mobile number)');
      return;
    }

    if (password.length < 4) {
      setErrorMsg('पासवर्ड कम से कम 4 अक्षरों का होना चाहिए (Password must be at least 4 characters)');
      return;
    }

    const storedUsers = getStoredUsers();

    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('कृपया अपना पूरा नाम दर्ज करें (Please enter your name)');
        return;
      }

      if (confirmPassword && password !== confirmPassword) {
        setErrorMsg('पासवर्ड मेल नहीं खाता (Passwords do not match)');
        return;
      }

      // Check if mobile already exists
      const existing = storedUsers.find((u) => u.mobile === cleanMobile);
      if (existing) {
        setErrorMsg('यह मोबाइल नंबर पहले से पंजीकृत है। कृपया लॉगिन करें (This mobile number is already registered. Please Login).');
        return;
      }

      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        mobile: cleanMobile,
        password: password,
        role: 'user',
        purchasedPdfIds: [], // All notes locked until paid
        hasUnlockedAll: false,
        registeredDate: new Date().toISOString(),
      };

      saveStoredUsers([...storedUsers, newUser]);
      setSuccessMsg('खाता सफलतापूर्वक बनाया गया! (Account created successfully!)');

      setTimeout(() => {
        onAuthSuccess(newUser);
        onClose();
      }, 700);
    } else {
      // Login mode
      const foundUser = storedUsers.find((u) => u.mobile === cleanMobile);

      // Allow demo user or check password
      if (cleanMobile === '9876543210' && (!foundUser || password === foundUser.password || password === '123456')) {
        const demoUser: User = foundUser || {
          id: 'usr_demo',
          name: 'Chandan Aspirant',
          mobile: '9876543210',
          password: password,
          role: 'user',
          purchasedPdfIds: [],
          hasUnlockedAll: false,
          registeredDate: new Date().toISOString(),
        };
        onAuthSuccess(demoUser);
        onClose();
        return;
      }

      if (!foundUser) {
        setErrorMsg('यह मोबाइल नंबर पंजीकृत नहीं है। कृपया पहले साइन अप करें (Mobile number not registered. Please sign up).');
        return;
      }

      if (foundUser.password && foundUser.password !== password) {
        setErrorMsg('गलत पासवर्ड। कृपया पुनः प्रयास करें (Incorrect password. Please try again).');
        return;
      }

      setSuccessMsg('सफलतापूर्वक लॉगिन हुआ! (Logged in successfully!)');
      setTimeout(() => {
        onAuthSuccess(foundUser);
        onClose();
      }, 600);
    }
  };

  const handleQuickDemo = (role: 'student' | 'admin') => {
    const demoMobile = role === 'admin' ? '9999999999' : '9876543210';
    const demoUser: User = {
      id: role === 'admin' ? 'admin_chandan' : 'student_chandan',
      name: role === 'admin' ? 'Chandan Kumar (Admin)' : 'Aspirant Student',
      mobile: demoMobile,
      password: 'password123',
      role: role === 'admin' ? 'admin' : 'user',
      purchasedPdfIds: role === 'admin' ? ['pdf-session-01', 'pdf-session-02', 'pdf-session-03'] : [],
      hasUnlockedAll: role === 'admin',
      registeredDate: new Date().toISOString(),
    };
    onAuthSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 pb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-blue-300 text-[11px] font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>BPSC TRE 4.0 Aspirant Portal</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">
              {mode === 'signup' ? 'Sign Up with Mobile No.' : 'Login with Mobile No.'}
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">
              {mode === 'signup'
                ? 'Create your account to purchase & open PDF notes'
                : 'Enter your registered mobile & password'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle: Sign Up vs Login */}
        <div className="grid grid-cols-2 bg-slate-100 p-1 border-b border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Registration (Sign Up)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Existing Student (Login)
          </button>
        </div>

        {/* Error / Success Feedback */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Candidate Full Name (पूरा नाम) *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Chandan Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>
          )}

          {/* Mobile Number Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Mobile Number (मोबाइल नंबर) *
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs font-bold">
                +91
              </span>
              <div className="relative flex-1">
                <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-r-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-semibold text-slate-900"
                />
              </div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Used for account recovery and PDF watermark stamp
            </span>
          </div>

          {/* Password Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Password (पासवर्ड) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Confirm Password (पासवर्ड दोबारा लिखें) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{mode === 'signup' ? 'Sign Up with Mobile & Password' : 'Login with Mobile & Password'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Demo 1-Click Login for immediate preview */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block text-center">
              Quick 1-Click Mobile Login Demo
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-[11px] font-bold text-slate-700 transition-colors"
              >
                📱 Mobile: 9876543210
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-2 px-2.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-white text-[11px] font-bold text-amber-900 transition-colors"
              >
                ⭐ Admin Mobile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
