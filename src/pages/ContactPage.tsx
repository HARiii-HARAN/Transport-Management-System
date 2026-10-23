import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  MessageSquare, ShieldCheck, Bus, HelpCircle, FileText 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { companyInfo, addToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pnr, setPnr] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your passenger inquiry has been logged! Support reference #GT-REQ-9812.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-royal text-xs font-bold uppercase tracking-wider mb-2">
            <Phone className="w-3.5 h-3.5" />
            <span>Passenger Care & Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            We&apos;re Here to Assist You 24x7
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Have questions about your bus ticket, boarding locations, coach amenities, or refunds? Our support team is always ready to help.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Toll-Free Helpline</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Available 24 hours a day, 7 days a week for immediate assistance.
            </p>
            <div className="pt-2">
              <a href={`tel:${companyInfo.tollFree.replace(/[^0-9]/g, '')}`} className="font-black text-brand-orange text-lg hover:underline font-mono">
                {companyInfo.tollFree}
              </a>
              <span className="text-[11px] text-slate-400 block mt-0.5">Free from any network in India</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-royal flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Passenger Support Email</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Drop us an email regarding booking modifications, corporate bookings, or feedback.
            </p>
            <div className="pt-2">
              <a href={`mailto:${companyInfo.supportEmail}`} className="font-black text-brand-royal text-base hover:underline font-mono">
                {companyInfo.supportEmail}
              </a>
              <span className="text-[11px] text-slate-400 block mt-0.5">Average response under 2 hours</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Central Operations Headquarters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {companyInfo.corporateAddress}
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 block">GSTIN Registration:</span>
              <span className="font-mono text-xs text-slate-500">{companyInfo.gstin}</span>
            </div>
          </div>
        </div>

        {/* 2 Columns: Contact Form + Travel Policies FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-black text-slate-900 mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your journey inquiry or feedback and our duty manager will respond promptly.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-950 text-lg">Thank You for Reaching Out!</h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Your message has been assigned Ticket #GT-REQ-9812. Our passenger support team will follow up via email at <strong>{email}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-royal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-royal focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98401 23456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-royal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">PNR Number (If related to a trip)</label>
                    <input
                      type="text"
                      placeholder="e.g. GT26R782"
                      value={pnr}
                      onChange={(e) => setPnr(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 uppercase focus:ring-2 focus:ring-brand-royal focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-royal focus:outline-none"
                  >
                    <option value="General Inquiry">General Journey Inquiry</option>
                    <option value="Boarding Point Assistance">Boarding Point Location Help</option>
                    <option value="Booking Modification / Cancellation">Booking Cancellation & Refund</option>
                    <option value="Feedback / Compliment">Coach Attendant Feedback</option>
                    <option value="Lost & Found">Lost Luggage / Personal Item</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Detailed Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please specify details regarding your route, bus, or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-royal focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-sm shadow-md shadow-orange-500/20 transition flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Support</span>
                </button>
              </form>
            )}
          </div>

          {/* Passenger Travel Policies & FAQs */}
          <div className="lg:col-span-5 space-y-6">
            <div id="terms" className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-royal" />
                Terms of Passenger Carriage
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5"></span>
                  <span><strong>Reporting Time:</strong> Passengers must arrive at their boarding point at least 15 minutes prior to scheduled departure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5"></span>
                  <span><strong>Photo Identification:</strong> A government-issued photo ID is mandatory for all adult passengers.</span>
                </li>
                <li className="flex items-start gap-2" id="luggage">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5"></span>
                  <span><strong>Baggage Policy:</strong> Each passenger is entitled to 1 check-in bag up to 15 kg and 1 small personal cabin backpack.</span>
                </li>
                <li className="flex items-start gap-2" id="faq">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5"></span>
                  <span><strong>Refund Window:</strong> Cancellations up to 2 hours before trip departure receive 100% demo refund.</span>
                </li>
              </ul>
            </div>

            <div id="privacy" className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3 text-xs text-slate-600">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Passenger Privacy & Safety Charter
              </h3>
              <p>
                GoTravels protects all passenger contact information. Mobile numbers and email addresses are used solely for trip alerts, digital ticket dispatch, and driver coordination.
              </p>
              <p>
                Coaches feature emergency exits, certified first aid kits, emergency hammers, and 24x7 GPS monitoring for passenger peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
