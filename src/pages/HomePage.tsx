import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { POPULAR_CITIES } from '../data/initialData';
import { 
  Bus, Search, Calendar, Users, ArrowRightLeft, ShieldCheck, 
  Clock, Award, Sparkles, MapPin, ChevronRight, Star, 
  CheckCircle2, HelpCircle, PhoneCall, ChevronDown 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { buses, routes, searchParams, setSearchParams } = useApp();

  const [fromCity, setFromCity] = useState(searchParams.from || 'Chennai');
  const [toCity, setToCity] = useState(searchParams.to || 'Bengaluru');
  const [journeyDate, setJourneyDate] = useState(searchParams.date || '2026-10-23');
  const [passengers, setPassengers] = useState(searchParams.passengers || 1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const availableCities = ['Chennai', 'Bengaluru', 'Hyderabad', 'Madurai', 'Coimbatore', 'Kochi', 'Tiruchirappalli'];

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromCity === toCity) {
      alert('Source city and destination city cannot be identical. Please pick distinct cities.');
      return;
    }
    setSearchParams({
      from: fromCity,
      to: toCity,
      date: journeyDate,
      passengers
    });
    navigate(`/search-buses?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${journeyDate}&passengers=${passengers}`);
  };

  const setDateShortcut = (daysFromToday: number) => {
    const baseDate = new Date(2026, 9, 23); // 2026-10-23
    baseDate.setDate(baseDate.getDate() + daysFromToday);
    const dateStr = baseDate.toISOString().split('T')[0];
    setJourneyDate(dateStr);
  };

  const faqs = [
    {
      q: 'How do I book a passenger bus ticket on GoTravels?',
      a: 'Booking is simple: choose your departure and destination cities, pick your travel date, click "Search Buses", choose your bus coach and seats on our visual layout, enter passenger details, and confirm with demo payment. Your e-ticket and PNR will be issued instantly!'
    },
    {
      q: 'What is the cancellation and refund policy?',
      a: 'You can cancel any eligible booking up to 2 hours before scheduled departure directly from the "My Bookings" page. A 100% demo refund will be credited instantly back to your account.'
    },
    {
      q: 'Do I need to carry a printed physical ticket?',
      a: 'No! You can show the digital e-ticket on your mobile phone or tablet along with a government-issued photo ID (Aadhaar, Voter ID, Passport, or Driving License) to the coach attendant when boarding.'
    },
    {
      q: 'What amenities are available on GoTravels luxury coaches?',
      a: 'Our premium fleet features high-speed passenger WiFi, individual USB and 220V charging ports, sanitized blankets and pillows, fresh mineral water bottles, personal reading lights, and GPS tracking.'
    },
    {
      q: 'Can I choose my specific seat or sleeper berth?',
      a: 'Yes, our interactive seat selection map lets you see real-time availability of Lower and Upper berths for sleeper buses and window/aisle seats for semi-sleeper coaches.'
    }
  ];

  const popularRoutesList = [
    { from: 'Chennai', to: 'Bengaluru', time: '6h 30m', fare: '₹680', dailyBuses: 18 },
    { from: 'Chennai', to: 'Madurai', time: '7h 45m', fare: '₹850', dailyBuses: 14 },
    { from: 'Chennai', to: 'Coimbatore', time: '8h 15m', fare: '₹890', dailyBuses: 12 },
    { from: 'Bengaluru', to: 'Hyderabad', time: '9h 00m', fare: '₹1,150', dailyBuses: 16 },
    { from: 'Chennai', to: 'Tiruchirappalli', time: '5h 30m', fare: '₹550', dailyBuses: 10 },
    { from: 'Coimbatore', to: 'Kochi', time: '4h 15m', fare: '₹350', dailyBuses: 8 },
  ];

  const reviews = [
    {
      name: 'Dr. Vigneshwaran R.',
      route: 'Chennai → Bengaluru',
      rating: 5,
      comment: 'The Volvo multi-axle sleeper coach was impeccably clean. The journey was so smooth and reached Majestic right on time. Highly recommended for business travelers!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Ananya Deshmukh',
      route: 'Bengaluru → Hyderabad',
      rating: 5,
      comment: 'Booking seat L4 on GoTravels was seamless. Clean fresh blankets, high-speed WiFi throughout the highway, and courteous staff made a night journey peaceful.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Karthik Subramanian',
      route: 'Chennai → Madurai',
      rating: 5,
      comment: 'Prompt departure from Koyambedu. The digital ticket downloaded immediately and checking in was effortless. Great value for money!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-brand-navy to-slate-900 text-white pt-12 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorative elements & coach photo */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-royal/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-orange-400 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>India&apos;s Premium Intercity Passenger Transport</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Book Your Next Journey with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                GoTravels
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium">
              Your Journey, Our Priority. Connecting top South & Central Indian cities with verified luxury coaches, comfortable sleeper berths, and guaranteed on-time arrivals.
            </p>
          </div>

          {/* Interactive Bus Search Box */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-800 border border-slate-100 max-w-5xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* From City */}
                <div className="md:col-span-3 relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                    From City
                  </label>
                  <div className="relative">
                    <select
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="w-full pl-3.5 pr-8 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition appearance-none"
                    >
                      {availableCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="md:col-span-1 flex justify-center -my-2 md:my-0">
                  <button
                    type="button"
                    onClick={handleSwapCities}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-brand-orange text-slate-600 border border-slate-200 flex items-center justify-center transition shadow-xs group"
                    title="Swap Source and Destination"
                    aria-label="Swap Cities"
                  >
                    <ArrowRightLeft className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                </div>

                {/* To City */}
                <div className="md:col-span-3 relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-royal" />
                    To City
                  </label>
                  <div className="relative">
                    <select
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      className="w-full pl-3.5 pr-8 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition appearance-none"
                    >
                      {availableCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Journey Date */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Journey Date
                  </label>
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition"
                  />
                </div>

                {/* Passengers count */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                    Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Quick Shortcuts & Search Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>Quick Dates:</span>
                  <button
                    type="button"
                    onClick={() => setDateShortcut(0)}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    Today (23 Oct)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDateShortcut(1)}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    Tomorrow (24 Oct)
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white font-black text-base shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                  <span>Search Buses</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="bg-white py-6 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-slate-100">
            <div className="p-2">
              <span className="text-2xl lg:text-3xl font-black text-slate-900 block font-sans">
                100,000+
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Happy Passengers
              </span>
            </div>
            <div className="p-2">
              <span className="text-2xl lg:text-3xl font-black text-brand-orange block font-sans">
                250+
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Daily Scheduled Trips
              </span>
            </div>
            <div className="p-2">
              <span className="text-2xl lg:text-3xl font-black text-brand-royal block font-sans">
                98.8%
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                On-Time Punctuality
              </span>
            </div>
            <div className="p-2">
              <span className="text-2xl lg:text-3xl font-black text-emerald-600 block font-sans">
                4.8 / 5.0
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Passenger Satisfaction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Bus Routes Section */}
      <section id="popular-routes" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-brand-royal text-xs font-bold uppercase tracking-wider mb-2">
              <Bus className="w-3.5 h-3.5" />
              <span>Intercity Network</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Popular Bus Routes
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Frequent daily luxury buses connecting key commercial and cultural hubs
            </p>
          </div>

          <button
            onClick={() => navigate('/search-buses')}
            className="text-sm font-bold text-brand-royal hover:text-blue-800 flex items-center gap-1 transition"
          >
            <span>View All Schedules</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutesList.map((routeItem, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md hover:border-brand-royal/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {routeItem.dailyBuses} Daily Departures
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs">
                    from {routeItem.fare}
                  </span>
                </div>

                <div className="flex items-center gap-3 my-2">
                  <span className="text-lg font-black text-slate-900">{routeItem.from}</span>
                  <div className="flex-1 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-royal"></div>
                    <div className="flex-1 border-t-2 border-dashed border-slate-200"></div>
                    <ChevronRight className="w-4 h-4 text-brand-royal -ml-1.5" />
                  </div>
                  <span className="text-lg font-black text-slate-900">{routeItem.to}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 mt-3">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Duration: ~{routeItem.time}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Volvo Sleeper & Semi-Sleeper</span>
                <button
                  onClick={() => {
                    setFromCity(routeItem.from);
                    setToCity(routeItem.to);
                    navigate(`/search-buses?from=${encodeURIComponent(routeItem.from)}&to=${encodeURIComponent(routeItem.to)}&date=2026-10-23&passengers=1`);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-orange hover:text-white text-slate-800 text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Book Bus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations Showcase */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Top Travel Destinations
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Explore vibrant cities with convenient boarding points and reliable drop-offs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_CITIES.slice(0, 4).map((city, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setToCity(city.name);
                  navigate(`/search-buses?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(city.name)}&date=2026-10-23&passengers=1`);
                }}
                className="group relative rounded-3xl overflow-hidden shadow-md cursor-pointer h-72 flex flex-col justify-end p-6 transition-transform hover:-translate-y-1"
              >
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                <div className="relative z-10 text-white">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    {city.state}
                  </span>
                  <h3 className="text-2xl font-black">{city.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                    {city.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-orange-400 group-hover:text-orange-300">
                    <span>Find Buses to {city.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-50 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Our Fleet</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Engineered for Supreme Comfort
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Every GoTravels coach is maintained to international standards for safety, hygiene, and passenger satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {buses.slice(0, 3).map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="h-44 bg-gradient-to-br from-slate-800 to-slate-950 p-6 flex flex-col justify-between text-white relative">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/10 text-white">
                    {bus.busType}
                  </span>
                  <div className="flex items-center gap-1 bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-400/30">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{bus.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold">{bus.operatorName}</h3>
                  <p className="text-xs text-slate-400">{bus.model} &bull; Reg: {bus.regNumber}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-600 pb-3 border-b border-slate-100">
                  <span>Passenger Capacity:</span>
                  <span className="font-bold text-slate-900">{bus.totalSeats} Reclining Berths/Seats</span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Key Amenities Included
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {bus.amenities.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-slate-50 text-[11px] font-semibold text-slate-700 border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigate('/search-buses')}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-brand-royal text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <span>Check Coach Availability</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose GoTravels */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-white">
              Why Millions of Travelers Trust GoTravels
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Dedicated to delivering safe, reliable, and comfortable passenger transportation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-800/60 border border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-brand-orange flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Verified Drivers & Fleets</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                All drivers undergo extensive background checks, medical screenings, and highway safety certification.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/60 border border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-sky-400 flex items-center justify-center">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Guaranteed Punctuality</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We respect your schedule. Real-time GPS tracking ensures seamless passenger pickup and on-time drop-offs.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/60 border border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Instant E-Ticket & Easy Refunds</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Receive instant confirmation, PNR, and boarding pass. Cancel anytime before departure with hassle-free demo refunds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            What Our Passengers Say
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Real feedback from verified travelers who choose GoTravels daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm italic leading-relaxed mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-orange"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                  <span className="text-xs font-semibold text-brand-royal">{rev.route}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything you need to know about booking, travelling, and managing tickets with GoTravels.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-base hover:text-brand-royal transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-brand-royal' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-bold text-slate-900">Have questions about your journey?</h4>
              <p className="text-xs text-slate-500">Our customer support executive team is available 24 hours a day.</p>
            </div>
            <a
              href="tel:18004198899"
              className="px-5 py-2.5 rounded-xl bg-brand-royal hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline: 1800-419-8899</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
