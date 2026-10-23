import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trip, TripStatus, StopPoint } from '../../types';
import { 
  CalendarClock, Plus, Search, Filter, Edit3, 
  Trash2, AlertTriangle, CheckCircle2, Clock, MapPin, 
  Bus as BusIcon, UserCheck, X 
} from 'lucide-react';

export const AdminTripsPage: React.FC = () => {
  const { trips, routes, buses, drivers, addTrip, updateTrip, deleteTrip, addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | TripStatus>('All');
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [routeId, setRouteId] = useState(routes[0]?.id || '');
  const [busId, setBusId] = useState(buses[0]?.id || '');
  const [driverId, setDriverId] = useState(drivers[0]?.id || '');
  const [journeyDate, setJourneyDate] = useState('2026-10-24');
  const [departureTime, setDepartureTime] = useState('21:00');
  const [arrivalTime, setArrivalTime] = useState('05:30');
  const [fare, setFare] = useState(850);
  const [status, setStatus] = useState<TripStatus>('Scheduled');
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // Boarding & Dropping Points simple text lists
  const [boardingText, setBoardingText] = useState('Koyambedu Omni Stand (21:00, Bay 3)\nTambaram MEPZ (21:45, Flyover foot)');
  const [droppingText, setDroppingText] = useState('Electronic City (04:45, Toll exit)\nMajestic KBS (05:30, Platform 1)');

  const filteredTrips = trips.filter((t) => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    const route = routes.find((r) => r.id === t.routeId);
    const bus = buses.find((b) => b.id === t.busId);

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        t.journeyDate.includes(q) ||
        t.departureTime.includes(q) ||
        route?.sourceCity.toLowerCase().includes(q) ||
        route?.destinationCity.toLowerCase().includes(q) ||
        bus?.operatorName.toLowerCase().includes(q) ||
        bus?.regNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const checkConflicts = (date: string, bus_id: string, driver_id: string, currentTripId?: string) => {
    const busConflict = trips.find(
      (t) => t.journeyDate === date && t.busId === bus_id && t.status === 'Scheduled' && t.id !== currentTripId
    );
    if (busConflict) {
      return `Warning: Bus is already scheduled on ${date} at ${busConflict.departureTime}.`;
    }

    const driverConflict = trips.find(
      (t) => t.journeyDate === date && t.driverId === driver_id && t.status === 'Scheduled' && t.id !== currentTripId
    );
    if (driverConflict) {
      return `Warning: Assigned driver already has a scheduled trip on ${date}.`;
    }

    return null;
  };

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingTrip(null);
    setRouteId(routes[0]?.id || '');
    setBusId(buses[0]?.id || '');
    setDriverId(drivers[0]?.id || '');
    setJourneyDate('2026-10-24');
    setDepartureTime('21:00');
    setArrivalTime('05:30');
    setFare(850);
    setStatus('Scheduled');
    setConflictWarning(null);
  };

  const handleOpenEdit = (trip: Trip) => {
    setModalMode('edit');
    setEditingTrip(trip);
    setRouteId(trip.routeId);
    setBusId(trip.busId);
    setDriverId(trip.driverId);
    setJourneyDate(trip.journeyDate);
    setDepartureTime(trip.departureTime);
    setArrivalTime(trip.arrivalTime);
    setFare(trip.fare);
    setStatus(trip.status);

    const bText = trip.boardingPoints
      .map((p) => `${p.location} (${p.time}, ${p.landmark})`)
      .join('\n');
    setBoardingText(bText);

    const dText = trip.droppingPoints
      .map((p) => `${p.location} (${p.time}, ${p.landmark})`)
      .join('\n');
    setDroppingText(dText);

    setConflictWarning(null);
  };

  const parseStopPoints = (rawText: string, defaultTime: string): StopPoint[] => {
    const lines = rawText.split('\n').filter((l) => l.trim().length > 0);
    return lines.map((line) => {
      // e.g. "Koyambedu (21:00, Bay 3)"
      const match = line.match(/^(.*?)(?:\((.*?)(?:,\s*(.*?))?\))?$/);
      if (match) {
        return {
          location: match[1]?.trim() || line,
          time: match[2]?.trim() || defaultTime,
          landmark: match[3]?.trim() || 'Designated Bus Bay'
        };
      }
      return {
        location: line.trim(),
        time: defaultTime,
        landmark: 'Bus Bay'
      };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const warning = checkConflicts(journeyDate, busId, driverId, editingTrip?.id);
    if (warning && !window.confirm(`${warning}\n\nDo you want to proceed with this scheduling anyway?`)) {
      return;
    }

    const parsedBoarding = parseStopPoints(boardingText, departureTime);
    const parsedDropping = parseStopPoints(droppingText, arrivalTime);

    if (modalMode === 'create') {
      addTrip({
        routeId,
        busId,
        driverId,
        journeyDate,
        departureTime,
        arrivalTime,
        fare: Number(fare),
        boardingPoints: parsedBoarding,
        droppingPoints: parsedDropping
      });
    } else if (modalMode === 'edit' && editingTrip) {
      updateTrip(editingTrip.id, {
        routeId,
        busId,
        driverId,
        journeyDate,
        departureTime,
        arrivalTime,
        fare: Number(fare),
        status,
        boardingPoints: parsedBoarding,
        droppingPoints: parsedDropping
      });
    }

    setModalMode(null);
  };

  const handleDeleteTrip = (id: string) => {
    deleteTrip(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarClock className="w-8 h-8 text-purple-600" />
            <span>Trip Scheduling & Dispatch</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Schedule intercity departures, assign buses and certified drivers, and track occupancy.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Schedule New Journey</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search date, route, or bus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 self-stretch sm:self-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status:</span>
          {(['All', 'Scheduled', 'Ongoing', 'Completed', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Trips Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4">Trip ID / Date</th>
                <th className="py-3 px-4">Route Corridors</th>
                <th className="py-3 px-4">Coach & Driver</th>
                <th className="py-3 px-4">Departure & Arrival</th>
                <th className="py-3 px-4">Fare</th>
                <th className="py-3 px-4">Occupancy</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredTrips.map((trip) => {
                const route = routes.find((r) => r.id === trip.routeId);
                const bus = buses.find((b) => b.id === trip.busId);
                const driver = drivers.find((d) => d.id === trip.driverId);
                const totalSeats = bus?.totalSeats || 40;
                const bookedCount = trip.bookedSeats.length;
                const pct = Math.round((bookedCount / totalSeats) * 100);

                return (
                  <tr key={trip.id} className="hover:bg-slate-50/70">
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-slate-900 block">{trip.id}</span>
                      <span className="text-slate-500 font-semibold">{trip.journeyDate}</span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-black text-slate-900 text-sm block">
                        {route?.sourceCity} → {route?.destinationCity}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {route?.distanceKm} km &bull; {route?.estimatedDuration}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-800 block">{bus?.operatorName}</span>
                      <span className="text-[11px] text-slate-500">
                        {bus?.regNumber} &bull; Driver: <strong>{driver ? driver.name : 'Unassigned'}</strong>
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono">
                      <span className="font-bold text-slate-900 block">{trip.departureTime} dep</span>
                      <span className="text-slate-500 text-[11px]">{trip.arrivalTime} arr</span>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-900 text-sm">
                      ₹{trip.fare}
                    </td>

                    <td className="py-4 px-4">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>{bookedCount}/{totalSeats}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className="h-full bg-brand-royal rounded-full"
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          trip.status === 'Scheduled'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : trip.status === 'Ongoing'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : trip.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {trip.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(trip)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          title="Edit Trip Schedule"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(trip.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                          title="Delete Trip"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule / Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {modalMode === 'create' ? 'Schedule New Coach Journey' : 'Update Scheduled Trip'}
              </h3>
              <button onClick={() => setModalMode(null)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Route Corridor *</label>
                  <select
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    {routes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.sourceCity} → {r.destinationCity} ({r.distanceKm} km)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assign Bus Coach *</label>
                  <select
                    value={busId}
                    onChange={(e) => setBusId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    {buses.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.regNumber} &bull; {b.operatorName} ({b.totalSeats} seats)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assign Driver *</label>
                  <select
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} &bull; Lic: {d.licenseNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Journey Date *</label>
                  <input
                    type="date"
                    required
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Departure Time *</label>
                  <input
                    type="time"
                    required
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Arrival Time *</label>
                  <input
                    type="time"
                    required
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ticket Base Fare (₹) *</label>
                  <input
                    type="number"
                    min="100"
                    max="5000"
                    required
                    value={fare}
                    onChange={(e) => setFare(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              {modalMode === 'edit' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Schedule Operational Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TripStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Ongoing">Ongoing (In Transit)</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Boarding Points (One per line: Location (Time, Landmark))
                </label>
                <textarea
                  rows={2}
                  value={boardingText}
                  onChange={(e) => setBoardingText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Dropping Points (One per line: Location (Time, Landmark))
                </label>
                <textarea
                  rows={2}
                  value={droppingText}
                  onChange={(e) => setDroppingText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-sm"
                >
                  {modalMode === 'create' ? 'Dispatch Trip Schedule' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Remove Trip Schedule?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Are you sure you want to cancel and delete this trip schedule?
            </p>

            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Keep Trip
              </button>
              <button
                onClick={() => handleDeleteTrip(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
