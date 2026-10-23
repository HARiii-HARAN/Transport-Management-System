import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, Download, Calendar, IndianRupee, 
  Users, CheckCircle2, XCircle, TrendingUp, Filter 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

export const AdminReportsPage: React.FC = () => {
  const { bookings, trips, buses, routes, addToast } = useApp();

  const [dateRange, setDateRange] = useState<'7days' | '30days' | 'all'>('7days');

  // Stats calculation
  const totalBookings = bookings.length;
  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
  const completed = bookings.filter((b) => b.status === 'Completed').length;
  const cancelled = bookings.filter((b) => b.status === 'Cancelled').length;

  const cancellationRate = totalBookings > 0 ? ((cancelled / totalBookings) * 100).toFixed(1) : '0';
  const grossRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + b.totalFare, 0);

  const avgFare = confirmed + completed > 0
    ? Math.round(grossRevenue / (confirmed + completed))
    : 0;

  // Revenue chart data
  const revenueHistory = [
    { period: '17 Oct', revenue: 9800, bookings: 12 },
    { period: '18 Oct', revenue: 14200, bookings: 18 },
    { period: '19 Oct', revenue: 12100, bookings: 15 },
    { period: '20 Oct', revenue: 18500, bookings: 22 },
    { period: '21 Oct', revenue: 21900, bookings: 26 },
    { period: '22 Oct', revenue: 24300, bookings: 28 },
    { period: '23 Oct', revenue: grossRevenue, bookings: totalBookings },
  ];

  // Bus Occupancy data
  const busOccupancyData = buses.map((bus) => {
    const busTrips = trips.filter((t) => t.busId === bus.id);
    const totalBookedSeats = busTrips.reduce((acc, t) => acc + t.bookedSeats.length, 0);
    const totalPotentialSeats = busTrips.length * bus.totalSeats;
    const occupancyRate = totalPotentialSeats > 0 ? Math.round((totalBookedSeats / totalPotentialSeats) * 100) : 65;

    return {
      name: bus.regNumber,
      operator: bus.operatorName.replace('GoTravels ', ''),
      occupancy: Math.min(100, Math.max(35, occupancyRate))
    };
  });

  // Status Distribution Pie Data
  const statusDistribution = [
    { name: 'Confirmed', value: confirmed, color: '#10b981' },
    { name: 'Completed', value: completed, color: '#2563eb' },
    { name: 'Cancelled', value: cancelled, color: '#f43f5e' },
  ];

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Booking ID', 'PNR', 'Passenger Name', 'Contact Email', 'Route', 'Journey Date', 'Seats', 'Total Fare (INR)', 'Status'];
    const rows = bookings.map((b) => [
      b.id,
      b.pnr,
      `"${b.passengers[0]?.name || 'N/A'}"`,
      b.contactEmail,
      `"${b.sourceCity} to ${b.destinationCity}"`,
      b.journeyDate,
      `"${b.seatNumbers.join(';')}"`,
      b.totalFare,
      b.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GoTravels_Passenger_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Passenger booking report downloaded as CSV!', 'success');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-brand-royal" />
            <span>Passenger Analytics & Revenue Reports</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Analyze daily booking volumes, coach load factors, cancellation ratios, and export financial reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Gross Ticket Revenue</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
            ₹{grossRevenue.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
            Across {confirmed + completed} completed tickets
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Average Ticket Fare</span>
          <span className="text-2xl sm:text-3xl font-black text-brand-royal mt-1 block">
            ₹{avgFare}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Per passenger transaction</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Average Fleet Occupancy</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-500 mt-1 block">
            78.4%
          </span>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">High load factor</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Cancellation Ratio</span>
          <span className="text-2xl sm:text-3xl font-black text-rose-500 mt-1 block">
            {cancellationRate}%
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">Within permissible policy</span>
        </div>
      </div>

      {/* Charts 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Trend Area Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Ticket Revenue Performance
              </h3>
              <p className="text-xs text-slate-400">Total gross fare collection across all trips</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              <span className="px-3 py-1 bg-white text-slate-900 rounded-lg shadow-xs">Past 7 Days</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueHistory}>
                <defs>
                  <linearGradient id="colorRevReport" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`₹${val}`, 'Gross Revenue']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorRevReport)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Status Distribution (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              Reservation Status Ratios
            </h3>
            <p className="text-xs text-slate-400 mb-4">Confirmed vs completed vs cancelled</p>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={4}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
            {statusDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-700">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value} Bookings</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bus Occupancy & Fleet Utilization Bar Chart */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="pb-4 border-b border-slate-100 mb-6">
          <h3 className="font-extrabold text-slate-900 text-base">
            Fleet Passenger Occupancy Rate (%)
          </h3>
          <p className="text-xs text-slate-400">Load factor achieved by individual coach vehicles</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={busOccupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
              <Tooltip
                formatter={(val: any) => [`${val}%`, 'Occupancy Rate']}
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey="occupancy" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
