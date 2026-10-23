import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TicketView } from '../components/bus/TicketView';
import { 
  Ticket, Search, Calendar, MapPin, Clock, 
  CheckCircle2, XCircle, AlertCircle, Eye, Printer, 
  Trash2, ArrowRight, UserCheck 
} from 'lucide-react';
import { Booking } from '../types';

export const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, bookings, cancelBooking } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'Confirmed' | 'Completed' | 'Cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicketBooking, setSelectedTicketBooking] = useState<Booking | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);

  // If not logged in, show login prompt or PNR lookup
  const isGuest = !currentUser;

  // Bookings list for current user
  const userBookings = bookings.filter((b) => {
    // If logged in, filter by user id or contact email
    if (currentUser) {
      if (currentUser.role === 'admin') return true; // admin sees all
      return b.userId === currentUser.id || b.contactEmail.toLowerCase() === currentUser.email.toLowerCase();
    }
    // For guest, only show if matched by search term
    if (searchTerm.trim().length >= 4) {
      return (
        b.pnr.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        b.id.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }
    return false;
  });

  // Filter by Tab and Search Term
  const filteredList = userBookings.filter((b) => {
    if (activeTab !== 'all' && b.status !== activeTab) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      return (
        b.pnr.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.sourceCity.toLowerCase().includes(q) ||
        b.destinationCity.toLowerCase().includes(q) ||
        b.busOperator.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleConfirmCancel = () => {
    if (!cancelModalBooking) return;
    cancelBooking(cancelModalBooking.id);
    setCancelModalBooking(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Ticket className="w-8 h-8 text-brand-orange" />
              <span>My Bookings & Tickets</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your confirmed journeys, download digital boarding passes, and view trip history.
            </p>
          </div>

          <Link
            to="/search-buses"
            className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold shadow-md shadow-orange-500/20 transition flex items-center gap-1.5"
          >
            <span>Book New Ticket</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* If Guest, show gentle banner to login */}
        {isGuest && (
          <div className="mt-6 p-6 rounded-3xl bg-blue-50 border border-blue-200 text-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <UserCheck className="w-6 h-6 text-brand-royal shrink-0 mt-0.5" />
              <div>
                <h3 className="font-extrabold text-sm text-blue-950">
                  Please Log In to View Your Private Bookings
                </h3>
                <p className="text-xs text-blue-800 mt-0.5">
                  Sign in with demo credentials (<strong className="font-mono">passenger@gotravels.com</strong>) to manage your booked tickets, or search below by PNR.
                </p>
              </div>
            </div>

            <Link
              to="/passenger-login"
              className="px-4 py-2 rounded-xl bg-brand-royal hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs shrink-0"
            >
              Passenger Login
            </Link>
          </div>
        )}

        {/* Search & Tabs Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-2xl text-xs font-bold">
            {(['all', 'Confirmed', 'Completed', 'Cancelled'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl transition ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'all' ? 'All Bookings' : tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by PNR, Booking ID, or City..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-brand-royal focus:outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Bookings Card List */}
        <div className="mt-8 space-y-4">
          {filteredList.length > 0 ? (
            filteredList.map((booking) => {
              const isConfirmed = booking.status === 'Confirmed';
              const isCancelled = booking.status === 'Cancelled';
              const isCompleted = booking.status === 'Completed';

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 p-6 shadow-xs hover:shadow-md transition duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Status & PNR */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                            isConfirmed
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : isCancelled
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {booking.status}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          ID: <strong>{booking.id}</strong>
                        </span>
                      </div>

                      <div className="pt-1">
                        <span className="text-xs text-slate-400 font-semibold block">PNR Number:</span>
                        <span className="text-xl font-black text-slate-900 font-mono tracking-wider text-brand-royal">
                          {booking.pnr}
                        </span>
                      </div>
                    </div>

                    {/* Center: Journey Details */}
                    <div className="flex-1 max-w-lg bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
                        <span>{booking.sourceCity}</span>
                        <span className="text-brand-orange">→</span>
                        <span>{booking.destinationCity}</span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between text-slate-500 gap-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                          {booking.journeyDate}
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-brand-royal" />
                          {booking.departureTime} - {booking.arrivalTime}
                        </span>
                        <span className="font-bold text-slate-800">
                          Seat(s): <span className="font-mono text-brand-royal">{booking.seatNumbers.join(', ')}</span>
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200/80 truncate">
                        {booking.busOperator} &bull; {booking.busType}
                      </div>
                    </div>

                    {/* Right: Fare & Actions */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0">
                      <div className="text-left lg:text-right">
                        <span className="text-xs text-slate-400 font-medium block">Total Fare</span>
                        <span className="text-2xl font-black text-slate-900 font-sans">
                          ₹{booking.totalFare}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedTicketBooking(booking)}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Ticket</span>
                        </button>

                        {isConfirmed && (
                          <button
                            onClick={() => setCancelModalBooking(booking)}
                            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 text-brand-royal flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                No Bookings Found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
                {isGuest
                  ? 'Please login with your passenger account or type a valid PNR number above to locate your ticket.'
                  : 'You do not have any trips matching this filter criteria yet.'}
              </p>
              <Link
                to="/search-buses"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-brand-orangeHover transition shadow-sm"
              >
                <span>Search and Book Bus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicketBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8">
            <TicketView
              booking={selectedTicketBooking}
              onClose={() => setSelectedTicketBooking(null)}
              onCancel={(id) => {
                cancelBooking(id);
                setSelectedTicketBooking(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900">
              Confirm Ticket Cancellation?
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Are you sure you want to cancel booking <strong className="text-slate-800 font-mono">{cancelModalBooking.pnr}</strong> for seats <strong className="text-slate-800 font-mono">{cancelModalBooking.seatNumbers.join(', ')}</strong>?
            </p>

            <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Trip:</span>
                <span className="font-bold">{cancelModalBooking.sourceCity} → {cancelModalBooking.destinationCity}</span>
              </div>
              <div className="flex justify-between">
                <span>Refund Amount:</span>
                <span className="font-black text-emerald-600">₹{cancelModalBooking.totalFare}</span>
              </div>
              <div className="flex justify-between">
                <span>Cancellation Fee:</span>
                <span className="font-bold text-slate-500">₹0 (Demo Waiver)</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalBooking(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm"
              >
                Yes, Cancel & Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
