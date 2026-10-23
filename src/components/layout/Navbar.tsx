import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Bus, User as UserIcon, Shield, LogOut, Menu, X, 
  Ticket, Search, PhoneCall, ChevronDown 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path.includes('#')) {
      return location.hash === path.substring(path.indexOf('#'));
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Bus className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1 font-sans">
                Go<span className="text-brand-orange">Travels</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                Your Journey, Our Priority
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/') ? 'text-brand-royal bg-blue-50/70 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Home
            </Link>

            <Link
              to="/search-buses"
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                isActive('/search-buses') ? 'text-brand-royal bg-blue-50/70 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Search className="w-4 h-4 text-brand-orange" />
              Search Buses
            </Link>

            <a
              href="/#popular-routes"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-colors"
            >
              Popular Routes
            </a>

            <Link
              to="/my-bookings"
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                isActive('/my-bookings') ? 'text-brand-royal bg-blue-50/70 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Ticket className="w-4 h-4 text-blue-600" />
              My Bookings
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                isActive('/contact') ? 'text-brand-royal bg-blue-50/70 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              Contact Us
            </Link>
          </nav>

          {/* Desktop Right Actions (Auth / User Profile / Admin Link) */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 transition border border-slate-200 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-royal text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-brand-orange">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500 ml-1" />
                </button>

                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.email}</p>
                    </div>

                    {currentUser.role === 'passenger' && (
                      <Link
                        to="/passenger/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-royal transition font-medium"
                      >
                        <UserIcon className="w-4 h-4" />
                        Passenger Dashboard
                      </Link>
                    )}

                    <Link
                      to="/my-bookings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-royal transition font-medium"
                    >
                      <Ticket className="w-4 h-4" />
                      My Bookings & Tickets
                    </Link>

                    {currentUser.role === 'admin' ? (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-amber-700 bg-amber-50/50 hover:bg-amber-100/70 transition font-medium"
                      >
                        <Shield className="w-4 h-4 text-amber-600" />
                        Admin Operations Center
                      </Link>
                    ) : (
                      <Link
                        to="/admin-login"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-500 hover:bg-slate-50 transition"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        Admin Login Portal
                      </Link>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/passenger-login"
                  className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-brand-royal hover:bg-slate-100 transition-colors"
                >
                  Passenger Login
                </Link>

                <Link
                  to="/admin-login"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors border border-slate-200"
                  title="Administrative Portal"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-700" />
                  Admin Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orangeHover shadow-md shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-3 shadow-2xl">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            to="/search-buses"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            <Search className="w-4 h-4 text-brand-orange" />
            Search Buses
          </Link>
          <a
            href="/#popular-routes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            Popular Routes
          </a>
          <Link
            to="/my-bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            <Ticket className="w-4 h-4 text-blue-600" />
            My Bookings
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
          >
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            Contact Us
          </Link>

          <div className="border-t border-slate-200 pt-3 space-y-2">
            {currentUser ? (
              <>
                <div className="px-3 py-2 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500">Logged in as</p>
                  <p className="font-bold text-slate-900">{currentUser.name} ({currentUser.role})</p>
                </div>
                {currentUser.role === 'passenger' && (
                  <Link
                    to="/passenger/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-semibold text-brand-royal bg-blue-50"
                  >
                    Passenger Dashboard
                  </Link>
                )}
                {currentUser.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-semibold text-amber-800 bg-amber-50"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-2 pt-1">
                <Link
                  to="/passenger-login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 px-4 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200"
                >
                  Passenger Login
                </Link>
                <Link
                  to="/admin-login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50"
                >
                  <Shield className="w-4 h-4 text-slate-600" />
                  Admin Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orangeHover shadow-md"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
