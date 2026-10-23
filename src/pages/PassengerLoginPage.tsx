import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Bus, Mail, Lock, Eye, EyeOff, LogIn, 
  ArrowLeft, CheckCircle2, AlertCircle, Sparkles, Shield 
} from 'lucide-react';

export const PassengerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Return url if redirected from protected route
  const from = (location.state as any)?.from?.pathname || '/passenger/dashboard';

  const handleFillDemoPassenger = () => {
    setEmail('passenger@gotravels.com');
    setPassword('Passenger123');
    setErrorMessage('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(email, password, 'passenger');
      setIsSubmitting(false);

      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMessage(res.error || 'Failed to login. Please check your credentials.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back Link */}
        <div className="mb-6 px-4 sm:px-0">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Homepage</span>
          </Link>
        </div>

        {/* Brand Logo & Title */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 mx-auto mb-3">
            <Bus className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Passenger Login
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your bookings, track coaches, and manage digital tickets
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          {/* Demo Credentials Quick-Fill Pill */}
          <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-xs text-orange-950 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1 text-brand-orange">
                <Sparkles className="w-3.5 h-3.5" />
                Demonstration Credentials
              </span>
              <button
                type="button"
                onClick={handleFillDemoPassenger}
                className="px-2.5 py-1 rounded-lg bg-brand-orange text-white text-[11px] font-bold hover:bg-brand-orangeHover transition"
              >
                Auto-Fill Demo
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-600 bg-white/80 p-2 rounded-xl border border-orange-100 space-y-0.5">
              <div>Email: <strong>passenger@gotravels.com</strong></div>
              <div>Password: <strong>Passenger123</strong></div>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="e.g. passenger@gotravels.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-royal focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo Password Reminder: The password for passenger@gotravels.com is "Passenger123"')}
                  className="text-xs text-brand-royal hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-royal focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-brand-royal rounded"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white font-black text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 stroke-[2.5]" />
                  <span>Sign In as Passenger</span>
                </>
              )}
            </button>
          </form>

          {/* Links & Admin Portal Switch */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-3">
            <p className="text-xs text-slate-600">
              Don&apos;t have an account yet?{' '}
              <Link to="/register" className="font-bold text-brand-orange hover:underline">
                Create Account
              </Link>
            </p>

            <div className="pt-2">
              <Link
                to="/admin-login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
              >
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Go to Dedicated Administrator Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
