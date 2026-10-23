import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Shield, Lock, Mail, Eye, EyeOff, LogIn, 
  ArrowLeft, AlertCircle, Key, Server, Sparkles 
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFillDemoAdmin = () => {
    setEmail('admin@gotravels.com');
    setPassword('Admin123');
    setErrorMessage('');
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both administrator email and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(email, password, 'admin');
      setIsSubmitting(false);

      if (res.success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setErrorMessage(res.error || 'Access denied. Invalid administrator credentials.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-royal/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Back Link */}
        <div className="mb-6 px-4 sm:px-0">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Homepage</span>
          </Link>
        </div>

        {/* Security Badge Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20 mx-auto mb-3">
            <Shield className="w-8 h-8 stroke-[2.2]" />
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest mb-2">
            Operations & Fleet Control
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Administrator Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Restricted administrative gateway for GoTravels operations
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 relative z-10">
        <div className="bg-slate-900 py-8 px-6 sm:px-10 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          {/* Demo Admin Credentials Quick Pill */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-amber-500/30 text-xs text-slate-200 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                Demo Administrator Credentials
              </span>
              <button
                type="button"
                onClick={handleFillDemoAdmin}
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-black transition"
              >
                Auto-Fill Admin
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-700/60 space-y-0.5">
              <div>Email: <strong className="text-amber-300">admin@gotravels.com</strong></div>
              <div>Password: <strong className="text-amber-300">Admin123</strong></div>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="e.g. admin@gotravels.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm font-semibold text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Master Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm font-semibold text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Authenticating Security Token...</span>
              ) : (
                <>
                  <Key className="w-4 h-4 stroke-[2.5]" />
                  <span>Access Operations Center</span>
                </>
              )}
            </button>
          </form>

          {/* Security & Disclaimer Note */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-3">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong>Demonstration Security Notice:</strong> LocalStorage-based authentication is configured for evaluation and preview purposes only. Passenger accounts cannot access administrative routes.
            </p>

            <div>
              <Link
                to="/passenger-login"
                className="text-xs text-slate-400 hover:text-white transition font-medium"
              >
                Switch to Passenger Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
