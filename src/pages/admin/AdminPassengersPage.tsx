import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Booking } from '../../types';
import { 
  Users, Search, Mail, Phone, Calendar, 
  Ticket, Eye, Shield, X, MapPin 
} from 'lucide-react';

export const AdminPassengersPage: React.FC = () => {
  const { users, bookings } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPassenger, setSelectedPassenger] = useState<User | null>(null);

  const passengersOnly = users.filter((u) => u.role === 'passenger');

  const filteredPassengers = passengersOnly.filter((p) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        (p.preferredCity && p.preferredCity.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Calculate passenger's booking history
  const getPassengerBookings = (userId: string, email: string): Booking[] => {
    return bookings.filter(
      (b) => b.userId === userId || b.contactEmail.toLowerCase() === email.toLowerCase()
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Users className="w-8 h-8 text-brand-orange" />
          <span>Registered Passengers Directory</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review customer accounts, contact details, booking activity, and travel preferences.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by passenger name, email, or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <span className="text-xs font-bold text-slate-500">
          Total Passengers: <strong className="text-slate-900">{passengersOnly.length}</strong>
        </span>
      </div>

      {/* Passengers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4">Passenger Name</th>
                <th className="py-3 px-4">Contact Information</th>
                <th className="py-3 px-4">Preferred City</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4">Bookings</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredPassengers.map((p) => {
                const pBookings = getPassengerBookings(p.id, p.email);
                const totalSpent = pBookings
                  .filter((b) => b.status !== 'Cancelled')
                  .reduce((sum, b) => sum + b.totalFare, 0);

                return (
                  <tr key={p.id} className="hover:bg-slate-50/70">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-royal flex items-center justify-center font-bold text-xs">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 text-sm block">{p.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {p.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{p.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{p.phone}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                        <MapPin className="w-3 h-3 text-brand-orange" />
                        {p.preferredCity || 'Chennai'}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-500 font-mono">
                      {p.createdAt}
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                        {pBookings.length} Trips
                      </span>
                    </td>

                    <td className="py-4 px-4 font-black text-slate-900 text-sm">
                      ₹{totalSpent}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedPassenger(p)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Booking History</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Passenger Booking History Modal */}
      {selectedPassenger && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Booking History: {selectedPassenger.name}
                </h3>
                <p className="text-xs text-slate-400">{selectedPassenger.email} &bull; {selectedPassenger.phone}</p>
              </div>
              <button onClick={() => setSelectedPassenger(null)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Bookings list */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {getPassengerBookings(selectedPassenger.id, selectedPassenger.email).length > 0 ? (
                getPassengerBookings(selectedPassenger.id, selectedPassenger.email).map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-900 text-sm">{b.sourceCity} → {b.destinationCity}</span>
                      <span className="font-mono text-brand-royal">{b.pnr}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Travel Date: {b.journeyDate} ({b.departureTime})</span>
                      <span>Seats: <strong className="text-slate-800 font-mono">{b.seatNumbers.join(', ')}</strong></span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1 border-t border-slate-200">
                      <span className="font-bold text-slate-900">Fare Paid: ₹{b.totalFare}</span>
                      <span
                        className={`font-bold uppercase tracking-wider text-[10px] ${
                          b.status === 'Confirmed' ? 'text-emerald-600' : b.status === 'Cancelled' ? 'text-rose-600' : 'text-blue-600'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Ticket className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No bookings logged for this passenger yet.</p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedPassenger(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
