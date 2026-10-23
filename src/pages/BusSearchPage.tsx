import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BusCard } from '../components/bus/BusCard';
import { Trip } from '../types';
import { 
  Search, Filter, MapPin, Calendar, Users, SlidersHorizontal, 
  RotateCcw, AlertCircle, ArrowRightLeft, Sparkles, ChevronDown 
} from 'lucide-react';

export const BusSearchPage: React.FC = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const navigate = useNavigate();
  const { routes, buses, trips, setSelectedTrip } = useApp();

  const availableCities = ['Chennai', 'Bengaluru', 'Hyderabad', 'Madurai', 'Coimbatore', 'Kochi', 'Tiruchirappalli'];

  // Current query params or defaults
  const from = urlParams.get('from') || 'Chennai';
  const to = urlParams.get('to') || 'Bengaluru';
  const date = urlParams.get('date') || '2026-10-23';
  const passengers = Number(urlParams.get('passengers')) || 1;

  // Search Bar state in case user changes it
  const [searchFrom, setSearchFrom] = useState(from);
  const [searchTo, setSearchTo] = useState(to);
  const [searchDate, setSearchDate] = useState(date);
  const [searchPassengers, setSearchPassengers] = useState(passengers);

  // Filters State
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [selectedBusTypes, setSelectedBusTypes] = useState<string[]>([]);
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [acFilter, setAcFilter] = useState<'all' | 'ac' | 'non-ac'>('all');
  const [seaterSleeperFilter, setSeaterSleeperFilter] = useState<'all' | 'sleeper' | 'seater'>('all');
  const [departureTimeFilter, setDepartureTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening' | 'night'>('all');
  const [minAvailableSeats, setMinAvailableSeats] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'departure-asc' | 'rating-desc'>('price-asc');

  // Swap cities
  const handleSwap = () => {
    const temp = searchFrom;
    setSearchFrom(searchTo);
    setSearchTo(temp);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchFrom === searchTo) {
      alert('Source city and destination city cannot be identical.');
      return;
    }
    setUrlParams({
      from: searchFrom,
      to: searchTo,
      date: searchDate,
      passengers: searchPassengers.toString()
    });
  };

  // Find Route ID
  const matchedRoute = useMemo(() => {
    return routes.find(
      (r) => r.sourceCity.toLowerCase() === from.toLowerCase() &&
             r.destinationCity.toLowerCase() === to.toLowerCase()
    );
  }, [routes, from, to]);

  // Unique operators for filter
  const allOperators = useMemo(() => {
    const set = new Set(buses.map((b) => b.operatorName));
    return Array.from(set);
  }, [buses]);

  // Filtered & Sorted Trips
  const filteredTrips = useMemo(() => {
    // If route matches, get trips for this route, or if none, look for trips matching date or all
    let list = trips.filter((trip) => {
      // Route filter
      if (matchedRoute && trip.routeId !== matchedRoute.id) return false;
      if (!matchedRoute) return false;

      // Date filter (if trip has date, match it, or if demo, allow same day/next day matching)
      if (trip.journeyDate !== date) return false;

      // Price filter
      if (trip.fare > maxPrice) return false;

      const bus = buses.find((b) => b.id === trip.busId);
      if (!bus) return false;

      // AC filter
      if (acFilter === 'ac' && !bus.isAC) return false;
      if (acFilter === 'non-ac' && bus.isAC) return false;

      // Sleeper vs Seater
      if (seaterSleeperFilter === 'sleeper' && !bus.isSleeper) return false;
      if (seaterSleeperFilter === 'seater' && bus.isSleeper) return false;

      // Operators
      if (selectedOperators.length > 0 && !selectedOperators.includes(bus.operatorName)) return false;

      // Available seats
      const availableSeats = bus.totalSeats - trip.bookedSeats.length;
      if (availableSeats < passengers) return false;
      if (availableSeats < minAvailableSeats) return false;

      // Departure Time slot
      if (departureTimeFilter !== 'all') {
        const hour = parseInt(trip.departureTime.split(':')[0], 10);
        if (departureTimeFilter === 'morning' && (hour < 6 || hour >= 12)) return false;
        if (departureTimeFilter === 'afternoon' && (hour < 12 || hour >= 17)) return false;
        if (departureTimeFilter === 'evening' && (hour < 17 || hour >= 21)) return false;
        if (departureTimeFilter === 'night' && hour < 21 && hour >= 6) return false;
      }

      return true;
    });

    // Sorting
    list = [...list].sort((a, b) => {
      const busA = buses.find((item) => item.id === a.busId);
      const busB = buses.find((item) => item.id === b.busId);

      if (sortBy === 'price-asc') return a.fare - b.fare;
      if (sortBy === 'price-desc') return b.fare - a.fare;
      if (sortBy === 'departure-asc') return a.departureTime.localeCompare(b.departureTime);
      if (sortBy === 'rating-desc') return (busB?.rating || 0) - (busA?.rating || 0);
      return 0;
    });

    return list;
  }, [
    trips, matchedRoute, date, maxPrice, acFilter, seaterSleeperFilter, 
    selectedOperators, passengers, minAvailableSeats, departureTimeFilter, 
    sortBy, buses
  ]);

  const resetFilters = () => {
    setMaxPrice(2000);
    setAcFilter('all');
    setSeaterSleeperFilter('all');
    setSelectedOperators([]);
    setDepartureTimeFilter('all');
    setMinAvailableSeats(0);
    setSortBy('price-asc');
  };

  const handleSelectSeats = (trip: Trip) => {
    setSelectedTrip(trip);
    navigate(`/select-seats/${trip.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Search Modify Bar */}
      <div className="bg-slate-900 text-white py-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* From */}
            <div className="md:col-span-3">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">From City</label>
              <select
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:ring-2 focus:ring-brand-royal focus:outline-none"
              >
                {availableCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Swap */}
            <div className="md:col-span-1 flex justify-center pt-4 md:pt-0">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Swap cities"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To */}
            <div className="md:col-span-3">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">To City</label>
              <select
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:ring-2 focus:ring-brand-royal focus:outline-none"
              >
                {availableCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="md:col-span-3">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Date</label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:ring-2 focus:ring-brand-royal focus:outline-none"
              />
            </div>

            {/* Action */}
            <div className="md:col-span-2 pt-4 md:pt-0">
              <label className="hidden md:block text-[10px] text-transparent">Action</label>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-sm flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Modify Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">
                {from} <span className="text-brand-orange font-normal">→</span> {to}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-brand-royal">
                {filteredTrips.length} Available Buses
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Journey Date: <strong className="text-slate-800">{date}</strong> &bull; Demo Inventory View
            </p>
          </div>

          {/* Sort By selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-bold text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-royal"
            >
              <option value="price-asc">Price: Lowest First</option>
              <option value="price-desc">Price: Highest First</option>
              <option value="departure-asc">Departure: Earliest First</option>
              <option value="rating-desc">Rating: Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Layout: Sidebar Filters + Bus List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-brand-royal" />
                  Filter Buses
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-brand-orange hover:text-brand-orangeHover flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-slate-700">Max Ticket Price</span>
                  <span className="text-brand-orange">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="2000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-orange cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹300</span>
                  <span>₹2000</span>
                </div>
              </div>

              {/* AC / Non-AC */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Climate Control
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                  <button
                    type="button"
                    onClick={() => setAcFilter('all')}
                    className={`py-1.5 rounded-lg transition ${
                      acFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setAcFilter('ac')}
                    className={`py-1.5 rounded-lg transition ${
                      acFilter === 'ac' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    AC
                  </button>
                  <button
                    type="button"
                    onClick={() => setAcFilter('non-ac')}
                    className={`py-1.5 rounded-lg transition ${
                      acFilter === 'non-ac' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    Non-AC
                  </button>
                </div>
              </div>

              {/* Seater vs Sleeper */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Seat Preference
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                  <button
                    type="button"
                    onClick={() => setSeaterSleeperFilter('all')}
                    className={`py-1.5 rounded-lg transition ${
                      seaterSleeperFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeaterSleeperFilter('sleeper')}
                    className={`py-1.5 rounded-lg transition ${
                      seaterSleeperFilter === 'sleeper' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    Sleeper
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeaterSleeperFilter('seater')}
                    className={`py-1.5 rounded-lg transition ${
                      seaterSleeperFilter === 'seater' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    Seater
                  </button>
                </div>
              </div>

              {/* Departure Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Departure Time
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'all', label: 'Any Time' },
                    { id: 'morning', label: 'Morning (06:00 - 12:00)' },
                    { id: 'afternoon', label: 'Afternoon (12:00 - 17:00)' },
                    { id: 'evening', label: 'Evening (17:00 - 21:00)' },
                    { id: 'night', label: 'Night (21:00 - 06:00)' },
                  ].map((slot) => (
                    <label key={slot.id} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900 font-medium">
                      <input
                        type="radio"
                        name="departureTime"
                        checked={departureTimeFilter === slot.id}
                        onChange={() => setDepartureTimeFilter(slot.id as any)}
                        className="accent-brand-orange"
                      />
                      <span>{slot.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Operators Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Bus Operators
                </label>
                <div className="space-y-1.5 text-xs">
                  {allOperators.map((operator) => {
                    const isChecked = selectedOperators.includes(operator);
                    return (
                      <label key={operator} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900 font-medium">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setSelectedOperators(selectedOperators.filter((o) => o !== operator));
                            } else {
                              setSelectedOperators([...selectedOperators, operator]);
                            }
                          }}
                          className="accent-brand-orange rounded"
                        />
                        <span>{operator}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Notice Bar */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-royal shrink-0" />
                <span>
                  <strong>Demonstration Portal:</strong> Real-time reservation with instant boarding pass generation. All prices in INR (₹).
                </span>
              </div>
            </div>

            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip) => {
                const bus = buses.find((b) => b.id === trip.busId);
                const route = routes.find((r) => r.id === trip.routeId);
                if (!bus || !route) return null;

                return (
                  <BusCard
                    key={trip.id}
                    bus={bus}
                    trip={trip}
                    route={route}
                    onSelectSeats={handleSelectSeats}
                  />
                );
              })
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
                <div className="w-16 h-16 rounded-3xl bg-orange-50 text-brand-orange flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  No scheduled buses found for this search
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  We currently do not have trips matching this route ({from} to {to}) on {date} with the active filters.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                  >
                    Clear Filter Criteria
                  </button>
                  <button
                    onClick={() => {
                      setSearchFrom('Chennai');
                      setSearchTo('Bengaluru');
                      setSearchDate('2026-10-23');
                      setUrlParams({ from: 'Chennai', to: 'Bengaluru', date: '2026-10-23', passengers: '1' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-brand-orangeHover transition"
                  >
                    View Popular Chennai → Bengaluru Buses
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
