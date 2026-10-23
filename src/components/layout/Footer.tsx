import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Phone, Mail, MapPin, ShieldCheck, Clock, Award, CreditCard, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-brand-orange flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Verified Fleets & Drivers</h4>
              <p className="text-xs text-slate-400">Rigorously inspected luxury buses</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-sky-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">On-Time Departure</h4>
              <p className="text-xs text-slate-400">Punctual schedules guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Instant E-Tickets</h4>
              <p className="text-xs text-slate-400">Immediate digital confirmation & PNR</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24x7 Passenger Care</h4>
              <p className="text-xs text-slate-400">Toll-free round-the-clock helpline</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white font-sans">
                  Go<span className="text-brand-orange">Travels</span>
                </span>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Your Journey, Our Priority.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              GoTravels is India&apos;s premier passenger intercity bus ticketing and transport management platform.
              Experience supreme comfort with Volvo multi-axle coaches, BharatBenz sleepers, sanitized cabins, and transparent pricing.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Toll Free Helpline: <strong className="text-white">1800-419-8899</strong> (24x7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Passenger Support: <strong className="text-white">care@gotravels.com</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>GoTravels Central Terminal, GST Road, Guindy, Chennai - 600032</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/search-buses" className="hover:text-white transition">Search Buses</Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-white transition">My Bookings & Tickets</Link>
              </li>
              <li>
                <Link to="/passenger-login" className="hover:text-white transition">Passenger Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition">Create Account</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">Contact Us & Support</Link>
              </li>
            </ul>
          </div>

          {/* Popular Bus Routes */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Popular Routes
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/search-buses?from=Chennai&to=Bengaluru" className="hover:text-white transition">Chennai → Bengaluru</Link>
              </li>
              <li>
                <Link to="/search-buses?from=Chennai&to=Madurai" className="hover:text-white transition">Chennai → Madurai</Link>
              </li>
              <li>
                <Link to="/search-buses?from=Chennai&to=Coimbatore" className="hover:text-white transition">Chennai → Coimbatore</Link>
              </li>
              <li>
                <Link to="/search-buses?from=Bengaluru&to=Hyderabad" className="hover:text-white transition">Bengaluru → Hyderabad</Link>
              </li>
              <li>
                <Link to="/search-buses?from=Chennai&to=Tiruchirappalli" className="hover:text-white transition">Chennai → Tiruchirappalli</Link>
              </li>
              <li>
                <Link to="/search-buses?from=Coimbatore&to=Kochi" className="hover:text-white transition">Coimbatore → Kochi</Link>
              </li>
            </ul>
          </div>

          {/* Administrative & Policies */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Operations & Portals
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/admin-login" className="text-amber-400 hover:text-amber-300 font-semibold transition flex items-center gap-1.5">
                  Admin Login Portal
                </Link>
              </li>
              <li>
                <Link to="/contact#faq" className="hover:text-white transition">Cancellation & Refund Policy</Link>
              </li>
              <li>
                <Link to="/contact#terms" className="hover:text-white transition">Terms of Passenger Carriage</Link>
              </li>
              <li>
                <Link to="/contact#privacy" className="hover:text-white transition">Passenger Privacy Charter</Link>
              </li>
              <li>
                <Link to="/contact#luggage" className="hover:text-white transition">Luggage & Boarding Guidelines</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} GoTravels India Pvt. Ltd. All rights reserved. &bull; Tagline: <em>Your Journey, Our Priority.</em></p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
              Demo Version &bull; LocalStorage Mode
            </span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Passengers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
