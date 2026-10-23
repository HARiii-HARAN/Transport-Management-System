import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Route } from '../../types';
import { 
  Map, Plus, Search, Edit3, Trash2, Clock, 
  MapPin, AlertCircle, X, ChevronRight, CheckCircle2 
} from 'lucide-react';

export const AdminRoutesPage: React.FC = () => {
  const { routes, trips, addRoute, updateRoute, deleteRoute } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [sourceCity, setSourceCity] = useState('Chennai');
  const [destinationCity, setDestinationCity] = useState('Bengaluru');
  const [distanceKm, setDistanceKm] = useState(345);
  const [estimatedDuration, setEstimatedDuration] = useState('6h 30m');
  const [intermediateInput, setIntermediateInput] = useState('Vellore Bypass, Ambur, Hosur');
  const [isPopular, setIsPopular] = useState(true);
  const [formError, setFormError] = useState('');

  const availableCities = ['Chennai', 'Bengaluru', 'Hyderabad', 'Madurai', 'Coimbatore', 'Kochi', 'Tiruchirappalli', 'Salem', 'Tirupati'];

  const filteredRoutes = routes.filter((r) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        r.sourceCity.toLowerCase().includes(q) ||
        r.destinationCity.toLowerCase().includes(q) ||
        r.intermediateStops.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingRoute(null);
    setSourceCity('Chennai');
    setDestinationCity('Bengaluru');
    setDistanceKm(345);
    setEstimatedDuration('6h 30m');
    setIntermediateInput('Vellore Bypass, Hosur');
    setIsPopular(true);
    setFormError('');
  };

  const handleOpenEdit = (route: Route) => {
    setModalMode('edit');
    setEditingRoute(route);
    setSourceCity(route.sourceCity);
    setDestinationCity(route.destinationCity);
    setDistanceKm(route.distanceKm);
    setEstimatedDuration(route.estimatedDuration);
    setIntermediateInput(route.intermediateStops.join(', '));
    setIsPopular(!!route.isPopular);
    setFormError('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (sourceCity === destinationCity) {
      setFormError('Source city and destination city cannot be identical.');
      return;
    }

    const stopsList = intermediateInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (modalMode === 'create') {
      addRoute({
        sourceCity: sourceCity.trim(),
        destinationCity: destinationCity.trim(),
        distanceKm: Number(distanceKm),
        estimatedDuration: estimatedDuration.trim(),
        intermediateStops: stopsList,
        isPopular
      });
    } else if (modalMode === 'edit' && editingRoute) {
      updateRoute(editingRoute.id, {
        sourceCity: sourceCity.trim(),
        destinationCity: destinationCity.trim(),
        distanceKm: Number(distanceKm),
        estimatedDuration: estimatedDuration.trim(),
        intermediateStops: stopsList,
        isPopular
      });
    }

    setModalMode(null);
  };

  const handleDeleteRoute = (id: string) => {
    deleteRoute(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Map className="w-8 h-8 text-emerald-600" />
            <span>Intercity Route Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure transit corridors, intermediate stops, distance, and associate trips.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Travel Route</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by city or intermediate waypoint..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutes.map((route) => {
          const associatedTrips = trips.filter((t) => t.routeId === route.id);

          return (
            <div
              key={route.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {route.id}
                  </span>
                  {route.isPopular && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-brand-orange">
                      High Demand
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>{route.sourceCity}</span>
                    <span className="text-brand-orange">→</span>
                    <span>{route.destinationCity}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                    <span>{route.distanceKm} km</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {route.estimatedDuration}
                    </span>
                  </p>
                </div>

                {/* Waypoints */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Intermediate Stops ({route.intermediateStops.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {route.intermediateStops.map((stop, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700">
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Scheduled Trips:</span>
                  <strong className="text-brand-royal font-mono font-bold">
                    {associatedTrips.length} Trips
                  </strong>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(route)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(route.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center gap-1 transition border border-rose-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create / Edit Route */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {modalMode === 'create' ? 'Add New Transit Route' : 'Edit Route Details'}
              </h3>
              <button onClick={() => setModalMode(null)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {formError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Source City *</label>
                  <select
                    value={sourceCity}
                    onChange={(e) => setSourceCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    {availableCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Destination City *</label>
                  <select
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    {availableCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Highway Distance (km)</label>
                  <input
                    type="number"
                    min="10"
                    max="3000"
                    required
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6h 30m"
                    value={estimatedDuration}
                    onChange={(e) => setEstimatedDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Intermediate Stops (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vellore Bypass, Ambur, Hosur"
                  value={intermediateInput}
                  onChange={(e) => setIntermediateInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="accent-brand-orange"
                  />
                  <span>Mark as Popular High-Demand Corridor</span>
                </label>
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
                  {modalMode === 'create' ? 'Create Route' : 'Save Changes'}
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
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Delete Route Corridor?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              This route will be permanently removed. Ensure that no active trips or passenger bookings rely on this route.
            </p>

            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteRoute(deleteConfirmId)}
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
