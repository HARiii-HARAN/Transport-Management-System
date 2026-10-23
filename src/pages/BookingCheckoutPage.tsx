import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Bus, User, Mail, Phone, ShieldCheck, CreditCard, 
  Sparkles, CheckCircle2, ChevronRight, ArrowLeft, AlertCircle 
} from 'lucide-react';

interface PassengerFormItem {
  seatNumber: string;
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
}

export const BookingCheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, selectedTrip, selectedSeats, 
    selectedBoarding, selectedDropping, buses, routes, 
    createBooking, addToast 
  } = useApp();

  const bus = selectedTrip ? buses.find((b) => b.id === selectedTrip.busId) : null;
  const route = selectedTrip ? routes.find((r) => r.id === selectedTrip.routeId) : null;

  // Passenger form array for each seat
  const [passengers, setPassengers] = useState<PassengerFormItem[]>([]);
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI / QR' | 'Credit/Debit Card' | 'Net Banking'>('UPI / QR');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedTrip || selectedSeats.length === 0 || !selectedBoarding || !selectedDropping) {
      navigate('/search-buses');
      return;
    }

    // Initialize passenger details array with pre-filled user info for seat 1 if logged in
    const initialList: PassengerFormItem[] = selectedSeats.map((seat, index) => ({
      seatNumber: seat,
      name: index === 0 && currentUser ? currentUser.name : '',
      age: '',
      gender: 'Male'
    }));
    setPassengers(initialList);
  }, [selectedTrip, selectedSeats, currentUser]);

  if (!selectedTrip || !bus || !route || !selectedBoarding || !selectedDropping) {
    return null;
  }

  const baseFare = selectedSeats.length * selectedTrip.fare;
  const taxAmount = Math.round(baseFare * 0.05); // 5% GST
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const totalFare = Math.max(0, baseFare + taxAmount - discountAmount);

  const handlePassengerChange = (index: number, field: keyof PassengerFormItem, value: any) => {
    setPassengers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'TRAVELSAFE' || cleanCode === 'FIRSTTRIP' || cleanCode === 'GOTRAVELS') {
      const discount = Math.min(200, Math.round(baseFare * 0.1));
      setAppliedPromo({ code: cleanCode, discount });
      addToast(`Promo code ${cleanCode} applied! Saved ₹${discount}`, 'success');
    } else {
      addToast('Invalid or expired promo code. Try TRAVELSAFE or FIRSTTRIP', 'error');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactEmail.trim() || !emailRegex.test(contactEmail)) {
      errors.push('Please enter a valid passenger email address.');
    }

    // Validate phone
    if (!contactPhone.trim() || contactPhone.trim().length < 10) {
      errors.push('Please enter a valid 10-digit mobile number.');
    }

    // Validate each passenger
    passengers.forEach((p, idx) => {
      if (!p.name.trim()) {
        errors.push(`Please provide passenger name for seat ${p.seatNumber}`);
      }
      const ageNum = parseInt(p.age, 10);
      if (!p.age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        errors.push(`Please provide a valid age for passenger in seat ${p.seatNumber}`);
      }
    });

    if (errors.length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setFormErrors([]);
    setIsProcessing(true);

    // Simulate payment transaction delay for realistic UX
    setTimeout(() => {
      const finalBooking = createBooking({
        trip: selectedTrip,
        passengers: passengers.map((p) => ({
          seatNumber: p.seatNumber,
          name: p.name.trim(),
          age: parseInt(p.age, 10),
          gender: p.gender
        })),
        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim(),
        emergencyContact: emergencyContact.trim() || undefined,
        seatNumbers: selectedSeats,
        baseFare,
        taxAmount,
        discountAmount,
        totalFare,
        boardingPoint: selectedBoarding,
        droppingPoint: selectedDropping,
        paymentMethod
      });

      setIsProcessing(false);
      navigate(`/booking-success/${finalBooking.id}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
          <button onClick={() => navigate(`/select-seats/${selectedTrip.id}`)} className="flex items-center gap-1 hover:text-slate-800">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Seat Map
          </button>
          <span>/</span>
          <span className="text-slate-800 font-bold">Passenger Details & Simulated Checkout</span>
        </div>

        {/* Errors Alert */}
        {formErrors.length > 0 && (
          <div className="p-4 mb-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-sm text-rose-900">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              Please correct the following fields:
            </div>
            <ul className="list-disc pl-5">
              {formErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleCheckoutSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: Passenger Details & Contact Info */}
            <div className="lg:col-span-7 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-royal" />
                    Contact & Communication
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">E-Ticket will be sent here</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. passenger@gotravels.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brand-royal focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98401 23456"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brand-royal focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Optional Emergency Contact (Name & Phone)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Relative or Colleague (+91 94440 98765)"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brand-royal focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Passengers Information Form */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-orange" />
                    Passenger Information ({passengers.length})
                  </h3>
                  <span className="text-xs text-brand-orange font-bold font-mono">
                    Seats: {selectedSeats.join(', ')}
                  </span>
                </div>

                {passengers.map((passenger, index) => (
                  <div key={passenger.seatNumber} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-700 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px]">
                          {index + 1}
                        </span>
                        Passenger Details
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-brand-orange/10 text-brand-orange font-extrabold text-xs font-mono">
                        Seat {passenger.seatNumber}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      {/* Name */}
                      <div className="sm:col-span-6">
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={passenger.name}
                          onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brand-royal focus:outline-none"
                        />
                      </div>

                      {/* Age */}
                      <div className="sm:col-span-3">
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Age (Years) *
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="110"
                          placeholder="e.g. 34"
                          value={passenger.age}
                          onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brand-royal focus:outline-none"
                        />
                      </div>

                      {/* Gender */}
                      <div className="sm:col-span-3">
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Gender *
                        </label>
                        <select
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(index, 'gender', e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brand-royal focus:outline-none"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulated Demo Payment Gateway */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    Simulated Demo Payment
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                    No Real Money Charged
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Select a demonstration payment method. Your demo booking will be immediately confirmed upon clicking submit.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'UPI / QR', label: 'UPI / GPay / QR', desc: 'Instant mobile verification' },
                    { id: 'Credit/Debit Card', label: 'Credit / Debit Card', desc: 'Visa, Master, RuPay' },
                    { id: 'Net Banking', label: 'Net Banking', desc: 'SBI, HDFC, ICICI, etc.' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`p-3.5 rounded-2xl border text-xs cursor-pointer flex flex-col justify-between transition ${
                        paymentMethod === method.id
                          ? 'border-brand-royal bg-blue-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{method.label}</span>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id as any)}
                          className="accent-brand-royal"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400">{method.desc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Journey Details, Price Breakdown & Confirmation */}
            <div className="lg:col-span-5 space-y-6">
              {/* Trip Info Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Bus className="w-4 h-4 text-brand-orange" />
                  <span className="font-bold text-slate-900 text-sm">Trip Summary</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{bus.operatorName}</h4>
                    <p className="text-slate-500 text-xs">{bus.busType} &bull; {selectedTrip.journeyDate}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                    <div>
                      <span className="text-[10px] text-emerald-700 font-bold uppercase block">Boarding Point</span>
                      <p className="font-bold text-slate-800">{selectedBoarding.location} ({selectedBoarding.time})</p>
                      <p className="text-[11px] text-slate-400">{selectedBoarding.landmark}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[10px] text-brand-royal font-bold uppercase block">Dropping Point</span>
                      <p className="font-bold text-slate-800">{selectedDropping.location} ({selectedDropping.time})</p>
                      <p className="text-[11px] text-slate-400">{selectedDropping.landmark}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code Form */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Have a Promo Code? (Try: TRAVELSAFE)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. TRAVELSAFE"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold uppercase focus:ring-2 focus:ring-brand-royal focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Coupon &apos;{appliedPromo.code}&apos; applied (-₹{appliedPromo.discount})
                  </p>
                )}
              </div>

              {/* Fare Summary Box */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base">Fare Breakdown</h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Fare ({selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''})</span>
                    <span className="font-bold text-slate-800">₹{baseFare}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Passenger GST & Toll (5%)</span>
                    <span className="font-bold text-slate-800">₹{taxAmount}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-base">Total Payable</span>
                    <span className="text-2xl font-black text-slate-900 font-sans">
                      ₹{totalFare}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-2xl bg-brand-orange hover:bg-brand-orangeHover text-white font-black text-base shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing Simulated Reservation...</span>
                    </div>
                  ) : (
                    <>
                      <span>Confirm & Book Ticket (₹{totalFare})</span>
                      <ChevronRight className="w-5 h-5 stroke-[3]" />
                    </>
                  )}
                </button>

                <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Secure Simulated Transaction Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
