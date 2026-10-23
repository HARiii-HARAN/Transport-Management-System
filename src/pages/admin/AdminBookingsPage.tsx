import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, BookingStatus } from '../../types';
import { TicketView } from '../../components/bus/TicketView';
import { 
  Ticket, Search, Filter, Eye, XCircle, 
  CheckCircle2, Clock, Calendar, AlertCircle, ArrowUpDown 
} from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, cancelBooking, updateBookingStatus } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | BookingStatus>('All');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'All' && b.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        b.pnr.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.contactEmail.toLowerCase().includes(q) ||
        b.contactPhone.includes(q) ||
        b.sourceCity.toLowerCase().includes(q) ||
        b.destinationCity.toLowerCase().includes(q) ||
        b.passengers.some((p) => p.name.toLowerCase().includes(q))
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Ticket className="w-8 h-8 text-brand-royal" />
          <span>Passenger Reservations & E-Tickets</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor confirmed passenger bookings, investigate PNR records, and handle cancellations across all routes.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by PNR, Booking ID, passenger name, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 self-stretch sm:self-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status:</span>
          {(['All', 'Confirmed', 'Completed', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4">PNR / Booking ID</th>
                <th className="py-3 px-4">Route & Travel Date</th>
                <th className="py-3 px-4">Primary Contact / Passengers</th>
                <th className="py-3 px-4">Assigned Seats</th>
                <th className="py-3 px-4">Total Fare</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/70">
                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-brand-royal text-sm block">
                      {b.pnr}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{b.id}</span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 text-sm block">
                      {b.sourceCity} → {b.destinationCity}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-orange" />
                      {b.journeyDate} &bull; {b.departureTime}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-800 block">
                      {b.passengers[0]?.name}
                      {b.passengers.length > 1 && ` (+${b.passengers.length - 1} more)`}
                    </span>
                    <span className="text-[11px] text-slate-400">{b.contactPhone}</span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      {b.seatNumbers.join(', ')}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-black text-slate-900 text-sm">
                    ₹{b.totalFare}
                  </td>

                  <td className="py-4 px-4 text-[11px] text-slate-500">
                    <span className="block font-semibold text-slate-700">{b.paymentMethod}</span>
                    <span className="text-emerald-600 font-bold">PAID (Demo)</span>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : b.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                        title="View Full E-Ticket"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {b.status === 'Confirmed' && (
                        <button
                          onClick={() => setCancelModalBooking(b)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[11px] border border-rose-200 transition"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8">
            <TicketView
              booking={selectedBooking}
              onClose={() => setSelectedBooking(null)}
              onCancel={(id) => {
                cancelBooking(id);
                setSelectedBooking(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Admin Cancellation</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Cancel booking <strong className="font-mono text-slate-800">{cancelModalBooking.pnr}</strong>? Reserved seats (<strong className="font-mono">{cancelModalBooking.seatNumbers.join(', ')}</strong>) will be released back to inventory immediately.
            </p>

            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                onClick={() => setCancelModalBooking(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Dismiss
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
              >
                Yes, Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
