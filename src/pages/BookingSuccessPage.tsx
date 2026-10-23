import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TicketView } from '../components/bus/TicketView';
import confetti from 'canvas-confetti';
import { CheckCircle2, Ticket, Search, ArrowRight } from 'lucide-react';

export const BookingSuccessPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { bookings, cancelBooking } = useApp();

  const booking = bookings.find((b) => b.id === bookingId);

  useEffect(() => {
    // Fire confetti for celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">Booking Record Not Found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">Could not find booking with identifier {bookingId}.</p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-brand-royal text-white font-bold text-sm">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Booking Confirmed Successfully!
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Your PNR is <strong className="text-brand-orange font-mono text-base">{booking.pnr}</strong>. An electronic copy has been dispatched to {booking.contactEmail}.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/my-bookings"
              className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800 transition"
            >
              <Ticket className="w-4 h-4" />
              <span>Go to My Bookings</span>
            </Link>
            <Link
              to="/search-buses"
              className="px-5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 transition"
            >
              <Search className="w-4 h-4" />
              <span>Book Another Journey</span>
            </Link>
          </div>
        </div>

        {/* Boarding Pass Ticket Component */}
        <div className="mt-6">
          <TicketView
            booking={booking}
            onCancel={(id) => {
              if (window.confirm('Are you sure you want to cancel this booking? Full demo refund will be issued.')) {
                cancelBooking(id);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
