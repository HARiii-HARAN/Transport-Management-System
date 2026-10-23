import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Settings, Building2, Sliders, RotateCcw, 
  ShieldCheck, AlertTriangle, LogOut, CheckCircle2, Phone, Mail, MapPin 
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { companyInfo, currentUser, resetDemoData, logout, addToast } = useApp();

  const [companyName, setCompanyName] = useState(companyInfo.name);
  const [tagline, setTagline] = useState(companyInfo.tagline);
  const [tollFree, setTollFree] = useState(companyInfo.tollFree);
  const [supportEmail, setSupportEmail] = useState(companyInfo.supportEmail);
  const [corporateAddress, setCorporateAddress] = useState(companyInfo.corporateAddress);
  const [gstin, setGstin] = useState(companyInfo.gstin);

  const [maxSeatsPerBooking, setMaxSeatsPerBooking] = useState(6);
  const [cancellationCutoffHours, setCancellationCutoffHours] = useState(2);
  const [gstRate, setGstRate] = useState(5);

  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Company preferences updated successfully!', 'success');
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Booking configuration saved.', 'success');
  };

  const handleConfirmReset = () => {
    resetDemoData();
    setResetModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-8 h-8 text-slate-700" />
          <span>System Settings & Operations Configuration</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage transport company details, booking policies, and demonstration state.
        </p>
      </div>

      {/* 1. Company Information Settings */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <Building2 className="w-5 h-5 text-brand-orange" />
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Transport Enterprise Information</h3>
            <p className="text-xs text-slate-400">Displayed across passenger tickets and public contact footers</p>
          </div>
        </div>

        <form onSubmit={handleSaveCompany} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Legal Entity Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Brand Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Toll-Free Helpline (24x7)</label>
              <input
                type="text"
                value={tollFree}
                onChange={(e) => setTollFree(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-semibold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Passenger Care Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">GSTIN Number</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-semibold uppercase"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Central Terminal / HQ Address</label>
            <input
              type="text"
              value={corporateAddress}
              onChange={(e) => setCorporateAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-xs"
            >
              Save Company Profile
            </button>
          </div>
        </form>
      </div>

      {/* 2. System Booking Preferences */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <Sliders className="w-5 h-5 text-brand-royal" />
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Booking & Cancellation Preferences</h3>
            <p className="text-xs text-slate-400">Rules controlling seat selection limits and passenger cancellations</p>
          </div>
        </div>

        <form onSubmit={handleSavePreferences} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Max Seats Per Transaction</label>
              <input
                type="number"
                min="1"
                max="10"
                value={maxSeatsPerBooking}
                onChange={(e) => setMaxSeatsPerBooking(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Cancellation Cutoff (Hours Before Trip)</label>
              <input
                type="number"
                min="1"
                max="24"
                value={cancellationCutoffHours}
                onChange={(e) => setCancellationCutoffHours(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Passenger GST / Toll Rate (%)</label>
              <input
                type="number"
                min="0"
                max="28"
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-xs"
            >
              Update Preferences
            </button>
          </div>
        </form>
      </div>

      {/* 3. Demo Data Management (Reset to Factory Records) */}
      <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-rose-100">
          <RotateCcw className="w-5 h-5 text-rose-600" />
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Demonstration Data Reset</h3>
            <p className="text-xs text-slate-400">Restore factory sample records for trips, buses, drivers, and bookings</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          If you have added, cancelled, or modified trips during testing and wish to restore the initial demonstration state, click the reset button below. All default demo passenger and admin accounts will be reset.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data to Initial State</span>
          </button>
        </div>
      </div>

      {/* 4. Active Admin Account & Logout */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs text-amber-400 uppercase font-mono tracking-widest block mb-1">
            Authenticated Administrator
          </span>
          <h3 className="text-xl font-black">{currentUser?.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{currentUser?.email} &bull; Security Level: High (Fleet Ops)</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Administrator</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Confirm Reset of All Demo Data?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              This will erase any custom routes, buses, or bookings created in this browser session and restore initial demonstration records.
            </p>

            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                onClick={() => setResetModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
              >
                Yes, Restore Initial Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
