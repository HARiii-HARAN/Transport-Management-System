import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  User, Ticket, Calendar, Clock, MapPin, 
  CheckCircle2, XCircle, LogOut, Search, Edit3, 
  ShieldCheck, Phone, Mail, ChevronRight 
} from 'lucide-react';

export const PassengerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, bookings, logout, updateProfile } = useApp();

  // If user is not logged in or not passenger, redirect
  if (!currentUser) {
    navigate('/passenger-login');
    return null;
  }

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(currentUser.name);
  const [profilePhone, setProfilePhone] = useState(currentUser.phone);
  const [profileAddress, setProfileAddress] = useState(currentUser.address || '');
  const [profilePreferredCity, setProfilePreferredCity] = useState(currentUser.preferredCity || 'Chennai');

  const passengerBookings = bookings.filter(
    (b) => b.userId === currentUser.id || b.contactEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  const activeBookings = passengerBookings.filter((b) => b.status === 'Confirmed');
  const completedBookings = passengerBookings.filter((b) => b.status === 'Completed');
  const cancelledBookings = passengerBookings.filter((b) => b.status === 'Cancelled');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(currentUser.id, {
      name: profileName.trim(),
      phone: profilePhone.trim(),
      address: profileAddress.trim(),
      preferredCity: profilePreferredCity
    });
    setIsEditingProfile(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-navy to-brand-royal rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-orange text-white flex items-center justify-center font-black text-2xl shadow-md shadow-orange-500/20">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-orange-300 uppercase tracking-wider mb-1">
                Passenger Account
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Welcome back, {currentUser.name}!
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-3">
                <span>{currentUser.email}</span>
                <span>&bull;</span>
                <span>{currentUser.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto">
            <Link
              to="/search-buses"
              className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold transition shadow-md shadow-orange-500/20 flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Search Buses</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/15 flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
              {passengerBookings.length}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">Lifetime trips booked</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Active / Upcoming</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 block">
              {activeBookings.length}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">Confirmed seats</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold text-brand-royal uppercase tracking-wider block">Completed Journeys</span>
            <span className="text-2xl sm:text-3xl font-black text-brand-royal mt-1 block">
              {completedBookings.length}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">Past travels</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">Cancelled Tickets</span>
            <span className="text-2xl sm:text-3xl font-black text-rose-500 mt-1 block">
              {cancelledBookings.length}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">Refunded demo tickets</span>
          </div>
        </div>

        {/* 2 Column Layout: Recent Bookings & Profile Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent & Upcoming Bookings (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Upcoming & Active Journeys
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your scheduled trips ready for digital boarding
                  </p>
                </div>
                <Link
                  to="/my-bookings"
                  className="text-xs font-bold text-brand-royal hover:text-blue-800 flex items-center gap-1"
                >
                  <span>View All Bookings</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {activeBookings.length > 0 ? (
                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-brand-orange bg-orange-100/60 px-2 py-0.5 rounded-md">
                            PNR: {booking.pnr}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Confirmed
                          </span>
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-base">
                          {booking.sourceCity} → {booking.destinationCity}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                            {booking.journeyDate}
                          </span>
                          <span>&bull;</span>
                          <span>Departure: <strong>{booking.departureTime}</strong></span>
                          <span>&bull;</span>
                          <span>Seats: <strong className="font-mono">{booking.seatNumbers.join(', ')}</strong></span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <Link
                          to="/my-bookings"
                          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
                        >
                          View E-Ticket
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Ticket className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold text-slate-600">No active upcoming journeys right now.</p>
                  <p className="text-xs mt-1">Book your next intercity ticket with GoTravels today!</p>
                  <Link
                    to="/search-buses"
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-bold"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Buses</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Past Bookings Summary */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-black text-slate-900 mb-4">
                Booking History ({passengerBookings.length})
              </h2>
              <div className="divide-y divide-slate-100">
                {passengerBookings.slice(0, 4).map((b) => (
                  <div key={b.id} className="py-3.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{b.sourceCity} to {b.destinationCity}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {b.journeyDate} &bull; PNR: <span className="font-mono text-slate-600 font-bold">{b.pnr}</span> &bull; {b.busOperator}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">₹{b.totalFare}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          b.status === 'Confirmed'
                            ? 'text-emerald-600'
                            : b.status === 'Cancelled'
                            ? 'text-rose-500'
                            : 'text-blue-600'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Card & Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-royal" />
                  Passenger Profile
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="text-xs font-bold text-brand-orange hover:text-brand-orangeHover flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Residential Address</label>
                    <textarea
                      rows={2}
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      placeholder="Street, City, Pincode"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Preferred Departure City</label>
                    <select
                      value={profilePreferredCity}
                      onChange={(e) => setProfilePreferredCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                    >
                      {['Chennai', 'Bengaluru', 'Hyderabad', 'Madurai', 'Coimbatore', 'Kochi'].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 font-medium block">Full Name</span>
                    <span className="font-bold text-slate-900 text-sm">{currentUser.name}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">Email Address</span>
                    <span className="font-bold text-slate-900">{currentUser.email}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">Phone Number</span>
                    <span className="font-bold text-slate-900">{currentUser.phone}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">Preferred Hub</span>
                    <span className="font-bold text-brand-royal">{currentUser.preferredCity || 'Chennai'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">Address</span>
                    <span className="text-slate-700">{currentUser.address || 'Not provided'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Helpline Box */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-orange-200/80 text-xs text-amber-950 space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-brand-orange" />
                24x7 Priority Assistance
              </h4>
              <p className="text-amber-900/80 leading-relaxed">
                Need to reschedule or inquire about your coach location? Call GoTravels passenger support:
              </p>
              <div className="pt-1">
                <a
                  href="tel:18004198899"
                  className="font-extrabold text-brand-orange text-sm block hover:underline"
                >
                  1800-419-8899 (Toll Free)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
