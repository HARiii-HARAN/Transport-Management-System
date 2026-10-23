import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Bus, Map, CalendarClock, Ticket, CheckCircle2, 
  XCircle, IndianRupee, TrendingUp, Plus, ArrowRight, 
  Users, AlertCircle 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { buses, routes, trips, bookings } = useApp();

  // Metrics calculation
  const totalBuses = buses.length;
  const activeBuses = buses.filter((b) => b.status === 'Active').length;
  const totalRoutes = routes.length;

  const todayStr = '2026-10-23';
  const tripsToday = trips.filter((t) => t.journeyDate === todayStr);

  const totalBookingsCount = bookings.length;
  const confirmedBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const cancelledBookingsCount = bookings.filter((b) => b.status === 'Cancelled').length;

  const totalRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + b.totalFare, 0);

  // Chart data: 7-day bookings and revenue
  const trendData = [
    { date: '17 Oct', bookings: 12, revenue: 9800 },
    { date: '18 Oct', bookings: 18, revenue: 14200 },
    { date: '19 Oct', bookings: 15, revenue: 12100 },
    { date: '20 Oct', bookings: 22, revenue: 18500 },
    { date: '21 Oct', bookings: 26, revenue: 21900 },
    { date: '22 Oct', bookings: 28, revenue: 24300 },
    { date: '23 Oct (Today)', bookings: confirmedBookingsCount + 8, revenue: totalRevenue },
  ];

  // Route Popularity Data
  const routePopularityData = routes.slice(0, 5).map((route) => {
    const routeTrips = trips.filter((t) => t.routeId === route.id);
    const routeBookings = bookings.filter(
      (b) => b.sourceCity === route.sourceCity && b.destinationCity === route.destinationCity
    );
    const passengersCount = routeBookings.reduce((sum, b) => sum + b.passengers.length, 0);

    return {
      name: `${route.sourceCity} → ${route.destinationCity}`,
      passengers: Math.max(passengersCount, 8 + route.distanceKm % 15),
      fare: route.distanceKm * 2
    };
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Operations Executive Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time telemetry, scheduled departures, passenger bookings, and ticket revenue.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/trips"
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Schedule Trip</span>
          </Link>
          <Link
            to="/admin/buses"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add Bus</span>
          </Link>
          <Link
            to="/admin/routes"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add Route</span>
          </Link>
        </div>
      </div>

      {/* 7 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {/* Total Buses */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Buses</span>
            <Bus className="w-4 h-4 text-brand-royal" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900 block font-sans">
            {totalBuses}
          </span>
          <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">
            {activeBuses} Active in Fleet
          </span>
        </div>

        {/* Total Routes */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Routes</span>
            <Map className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900 block font-sans">
            {totalRoutes}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">
            Intercity Corridors
          </span>
        </div>

        {/* Trips Today */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Today&apos;s Trips</span>
            <CalendarClock className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900 block font-sans">
            {tripsToday.length}
          </span>
          <span className="text-[10px] text-purple-600 font-bold mt-0.5 block">
            {trips.length} Total Sched.
          </span>
        </div>

        {/* Total Bookings */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">All Bookings</span>
            <Ticket className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900 block font-sans">
            {totalBookingsCount}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">
            Across All Users
          </span>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Confirmed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-600 block font-sans">
            {confirmedBookingsCount}
          </span>
          <span className="text-[10px] text-emerald-700 font-bold mt-0.5 block">
            Valid E-Tickets
          </span>
        </div>

        {/* Cancelled Bookings */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Cancelled</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-rose-600 block font-sans">
            {cancelledBookingsCount}
          </span>
          <span className="text-[10px] text-rose-600 font-bold mt-0.5 block">
            Seats Released
          </span>
        </div>

        {/* Ticket Revenue */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Est. Revenue</span>
            <IndianRupee className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900 block font-sans">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-amber-600 font-bold mt-0.5 block">
            Gross Ticket Sales
          </span>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue & Booking Trends (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Booking Volume & Revenue Trend
              </h3>
              <p className="text-xs text-slate-400">Daily ticket booking pace over the past 7 days</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
              +18.4% This Week
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`₹${val}`, 'Gross Revenue']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Routes Bar Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Popular Route Demand
              </h3>
              <p className="text-xs text-slate-400">Passenger bookings by major travel corridor</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={routePopularityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis dataKey="name" type="category" width={110} stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val} Passengers`, 'Travel Demand']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="passengers" fill="#ea580c" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Bookings & Upcoming Scheduled Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Bookings Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Recent Passenger Reservations
              </h3>
              <p className="text-xs text-slate-400">Latest tickets issued across all terminals</p>
            </div>
            <Link
              to="/admin/bookings"
              className="text-xs font-bold text-brand-royal hover:underline flex items-center gap-1"
            >
              <span>View All ({bookings.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-xl">PNR / ID</th>
                  <th className="py-2.5 px-3">Route</th>
                  <th className="py-2.5 px-3">Seats</th>
                  <th className="py-2.5 px-3">Fare</th>
                  <th className="py-2.5 px-3 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-slate-900 block">{b.pnr}</span>
                      <span className="text-[10px] text-slate-400">{b.id}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-800 block">{b.sourceCity} → {b.destinationCity}</span>
                      <span className="text-[10px] text-slate-400">{b.journeyDate}</span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-brand-royal">
                      {b.seatNumbers.join(', ')}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      ₹{b.totalFare}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : b.status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Scheduled Trips (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Upcoming Trip Schedules
              </h3>
              <p className="text-xs text-slate-400">Scheduled departures & seat occupancy</p>
            </div>
            <Link
              to="/admin/trips"
              className="text-xs font-bold text-brand-royal hover:underline flex items-center gap-1"
            >
              <span>Manage Schedules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {trips.slice(0, 4).map((t) => {
              const route = routes.find((r) => r.id === t.routeId);
              const bus = buses.find((b) => b.id === t.busId);
              const totalSeats = bus?.totalSeats || 40;
              const bookedCount = t.bookedSeats.length;
              const occupancyPct = Math.round((bookedCount / totalSeats) * 100);

              return (
                <div key={t.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      {route?.sourceCity} → {route?.destinationCity}
                    </span>
                    <span className="font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {t.departureTime}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>{bus?.operatorName} ({bus?.regNumber})</span>
                    <span>Date: <strong>{t.journeyDate}</strong></span>
                  </div>

                  {/* Occupancy Progress */}
                  <div className="pt-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
                      <span>Occupancy: {bookedCount} / {totalSeats} seats</span>
                      <span>{occupancyPct}% Booked</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-brand-orange rounded-full transition-all duration-300"
                        style={{ width: `${occupancyPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
