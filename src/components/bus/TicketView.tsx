import React from 'react';
import { Booking } from '../../types';
import { 
  Bus, Printer, CheckCircle2, XCircle, Clock, MapPin, 
  Calendar, Shield, QrCode, Phone, Mail, User, AlertTriangle 
} from 'lucide-react';

interface TicketViewProps {
  booking: Booking;
  onClose?: () => void;
  onCancel?: (bookingId: string) => void;
  showActions?: boolean;
}

export const TicketView: React.FC<TicketViewProps> = ({
  booking,
  onClose,
  onCancel,
  showActions = true
}) => {
  const handlePrint = () => {
    window.print();
  };

  const isConfirmed = booking.status === 'Confirmed';
  const isCancelled = booking.status === 'Cancelled';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-2xl mx-auto print:shadow-none print:border-none print:max-w-none print:w-full">
      {/* Top Header / Brand Stripe */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-navyLight to-brand-royal text-white p-6 md:p-8 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center font-black">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight flex items-center gap-1 font-sans">
                Go<span className="text-brand-orange">Travels</span>
              </span>
              <p className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">
                Official E-Boarding Pass &bull; Passenger Ticket
              </p>
            </div>
          </div>

          <div className="text-right">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                isConfirmed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : isCancelled
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}
            >
              {isConfirmed && <CheckCircle2 className="w-3.5 h-3.5" />}
              {isCancelled && <XCircle className="w-3.5 h-3.5" />}
              {booking.status}
            </span>
          </div>
        </div>

        {/* PNR and Booking ID Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">PNR NUMBER</span>
            <span className="text-base font-black text-amber-400 font-mono tracking-wider">
              {booking.pnr}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">BOOKING ID</span>
            <span className="text-sm font-bold text-white font-mono">
              {booking.id}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">SEAT NUMBERS</span>
            <span className="text-sm font-black text-white bg-white/10 px-2 py-0.5 rounded-md inline-block">
              {booking.seatNumbers.join(', ')}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">TOTAL PAID</span>
            <span className="text-base font-black text-white">
              ₹{booking.totalFare}
            </span>
          </div>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Route & Times */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Journey Route</p>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                {booking.sourceCity} <span className="text-brand-orange">→</span> {booking.destinationCity}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-bold uppercase">Journey Date</p>
              <p className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-brand-royal" />
                {booking.journeyDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Boarding Point */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Departure: {booking.departureTime}</span>
              </div>
              <p className="font-bold text-slate-900 text-sm">
                {booking.boardingPoint.location}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 flex items-start gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                {booking.boardingPoint.landmark}
              </p>
            </div>

            {/* Dropping Point */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-royal uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Arrival: {booking.arrivalTime}</span>
              </div>
              <p className="font-bold text-slate-900 text-sm">
                {booking.droppingPoint.location}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 flex items-start gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                {booking.droppingPoint.landmark}
              </p>
            </div>
          </div>
        </div>

        {/* Coach Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Bus Operator</span>
            <span className="font-bold text-slate-800 text-sm">{booking.busOperator}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Coach Type</span>
            <span className="font-bold text-slate-800 text-sm">{booking.busType}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Vehicle Reg No.</span>
            <span className="font-bold text-slate-800 text-sm font-mono">{booking.busRegNumber}</span>
          </div>
        </div>

        {/* Passenger Information */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Passenger Details ({booking.passengers.length})
          </h4>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
            {booking.passengers.map((passenger, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-brand-royal flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{passenger.name}</span>
                    <span className="text-xs text-slate-500 ml-2">
                      ({passenger.age} yrs, {passenger.gender})
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Assigned Seat</span>
                  <span className="font-black text-brand-royal font-mono">{passenger.seatNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info & Fare Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="font-bold text-slate-800">Primary Contact & Support</p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{booking.contactEmail}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{booking.contactPhone}</span>
            </p>
            {booking.emergencyContact && (
              <p className="flex items-center gap-2 text-slate-500">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Emergency: {booking.emergencyContact}</span>
              </p>
            )}
            <p className="pt-1 text-[11px] text-slate-400">
              Payment Method: <strong>{booking.paymentMethod}</strong> (Simulated Demo)
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Base Fare ({booking.passengers.length} seat{booking.passengers.length > 1 ? 's' : ''})</span>
                <span className="font-semibold">₹{booking.baseFare}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Passenger GST & Toll (5%)</span>
                <span className="font-semibold">₹{booking.taxAmount}</span>
              </div>
              {booking.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Special Promo Discount</span>
                  <span>-₹{booking.discountAmount}</span>
                </div>
              )}
            </div>
            <div className="border-t border-slate-200 pt-2.5 mt-2 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 text-sm">Total Paid</span>
              <span className="text-xl font-black text-slate-900 font-sans">
                ₹{booking.totalFare}
              </span>
            </div>
          </div>
        </div>

        {/* Cancellation Notice if Cancelled */}
        {isCancelled && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">This booking was cancelled</p>
              <p className="mt-0.5 text-rose-700">
                Full demo refund of ₹{booking.refundAmount || booking.totalFare} has been credited to your simulated account.
              </p>
            </div>
          </div>
        )}

        {/* Important Passenger Guidelines */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-xs text-amber-950">
            <Shield className="w-3.5 h-3.5 text-amber-700" />
            Important Passenger Travel Instructions:
          </p>
          <ul className="list-disc pl-4 space-y-0.5 text-amber-800">
            <li>Please arrive at the boarding point at least 15 minutes before the departure time.</li>
            <li>All passengers must present a government-issued photo ID upon boarding.</li>
            <li>Standard luggage allowance is 15 kg per passenger.</li>
            <li>For 24x7 bus assistance, call toll-free helpline: <strong>1800-419-8899</strong>.</li>
          </ul>
        </div>
      </div>

      {/* Footer / Actions Bar */}
      {showActions && (
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Ticket</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {isConfirmed && onCancel && (
              <button
                onClick={() => onCancel(booking.id)}
                className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition"
              >
                Cancel Booking
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
