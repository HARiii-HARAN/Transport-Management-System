import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bus, BusType, BusStatus } from '../../types';
import { 
  Bus as BusIcon, Plus, Search, Filter, Edit3, 
  Trash2, CheckCircle2, AlertCircle, Wrench, Shield, X 
} from 'lucide-react';

export const AdminBusesPage: React.FC = () => {
  const { buses, drivers, addBus, updateBus, deleteBus } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | BusStatus>('All');
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [regNumber, setRegNumber] = useState('');
  const [operatorName, setOperatorName] = useState('');
  const [model, setModel] = useState('');
  const [busType, setBusType] = useState<BusType>('Volvo Multi-Axle AC Sleeper');
  const [totalSeats, setTotalSeats] = useState(30);
  const [isAC, setIsAC] = useState(true);
  const [isSleeper, setIsSleeper] = useState(true);
  const [amenitiesInput, setAmenitiesInput] = useState('WiFi, Charging Point, AC, Water Bottle, Blankets');
  const [assignedDriverId, setAssignedDriverId] = useState('');
  const [status, setStatus] = useState<BusStatus>('Active');

  const filteredBuses = buses.filter((bus) => {
    if (statusFilter !== 'All' && bus.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        bus.regNumber.toLowerCase().includes(q) ||
        bus.operatorName.toLowerCase().includes(q) ||
        bus.model.toLowerCase().includes(q) ||
        bus.busType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingBus(null);
    setRegNumber('');
    setOperatorName('GoTravels Royal Cruise');
    setModel('Volvo 9600 Multi-Axle Coach');
    setBusType('Volvo Multi-Axle AC Sleeper');
    setTotalSeats(30);
    setIsAC(true);
    setIsSleeper(true);
    setAmenitiesInput('WiFi, Charging Point, AC, Blankets, Water Bottle, Reading Lamp');
    setAssignedDriverId(drivers[0]?.id || '');
    setStatus('Active');
  };

  const handleOpenEdit = (bus: Bus) => {
    setModalMode('edit');
    setEditingBus(bus);
    setRegNumber(bus.regNumber);
    setOperatorName(bus.operatorName);
    setModel(bus.model);
    setBusType(bus.busType);
    setTotalSeats(bus.totalSeats);
    setIsAC(bus.isAC);
    setIsSleeper(bus.isSleeper);
    setAmenitiesInput(bus.amenities.join(', '));
    setAssignedDriverId(bus.assignedDriverId || '');
    setStatus(bus.status);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amenitiesList = amenitiesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (modalMode === 'create') {
      addBus({
        regNumber: regNumber.trim().toUpperCase(),
        operatorName: operatorName.trim(),
        model: model.trim(),
        busType,
        totalSeats: Number(totalSeats),
        isAC,
        isSleeper,
        amenities: amenitiesList,
        assignedDriverId: assignedDriverId || undefined,
        status,
        rating: 4.8,
        totalReviews: 12
      });
    } else if (modalMode === 'edit' && editingBus) {
      updateBus(editingBus.id, {
        regNumber: regNumber.trim().toUpperCase(),
        operatorName: operatorName.trim(),
        model: model.trim(),
        busType,
        totalSeats: Number(totalSeats),
        isAC,
        isSleeper,
        amenities: amenitiesList,
        assignedDriverId: assignedDriverId || undefined,
        status
      });
    }

    setModalMode(null);
  };

  const handleDeleteBus = (id: string) => {
    deleteBus(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BusIcon className="w-8 h-8 text-brand-orange" />
            <span>Bus Fleet Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain luxury coaches, inspect capacities, assign drivers, and manage operational readiness.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Bus Coach</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by registration, operator, model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 self-stretch sm:self-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status:</span>
          {(['All', 'Active', 'Maintenance', 'In-Transit'] as const).map((st) => (
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

      {/* Buses Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuses.map((bus) => {
          const assignedDriver = drivers.find((d) => d.id === bus.assignedDriverId);

          return (
            <div
              key={bus.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                      {bus.regNumber}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-lg mt-2">
                      {bus.operatorName}
                    </h3>
                    <p className="text-xs text-slate-400">{bus.model}</p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      bus.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : bus.status === 'Maintenance'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {bus.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <strong className="text-slate-800">{bus.busType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <strong className="text-slate-800">{bus.totalSeats} Passenger Seats</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>AC / Sleeper:</span>
                    <strong className="text-slate-800">
                      {bus.isAC ? 'Air Conditioned' : 'Non-AC'} &bull; {bus.isSleeper ? 'Sleeper' : 'Seater'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Assigned Driver:</span>
                    <strong className="text-brand-royal">
                      {assignedDriver ? assignedDriver.name : 'Unassigned'}
                    </strong>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Amenities ({bus.amenities.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {bus.amenities.map((a, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-medium text-slate-600">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(bus)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(bus.id)}
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

      {/* Create / Edit Bus Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {modalMode === 'create' ? 'Add New Luxury Bus Coach' : 'Edit Coach Information'}
              </h3>
              <button onClick={() => setModalMode(null)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Registration Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TN 01 AB 4455"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Operator Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GoTravels Royal Cruise"
                    value={operatorName}
                    onChange={(e) => setOperatorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bus Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Volvo 9600 Multi-Axle"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Coach Type</label>
                  <select
                    value={busType}
                    onChange={(e) => setBusType(e.target.value as BusType)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="Volvo Multi-Axle AC Sleeper">Volvo Multi-Axle AC Sleeper</option>
                    <option value="AC Sleeper (2+1)">AC Sleeper (2+1)</option>
                    <option value="AC Semi-Sleeper (2+2)">AC Semi-Sleeper (2+2)</option>
                    <option value="Non-AC Seater (2+2)">Non-AC Seater (2+2)</option>
                    <option value="BharatBenz Luxury AC (2+2)">BharatBenz Luxury AC (2+2)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Total Capacity</label>
                  <input
                    type="number"
                    min="20"
                    max="60"
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned Driver</label>
                  <select
                    value={assignedDriverId}
                    onChange={(e) => setAssignedDriverId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="">Unassigned</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.status})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Operational Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as BusStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="In-Transit">In-Transit</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6 py-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isAC}
                    onChange={(e) => setIsAC(e.target.checked)}
                    className="accent-brand-royal"
                  />
                  <span>Air Conditioned (AC)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isSleeper}
                    onChange={(e) => setIsSleeper(e.target.checked)}
                    className="accent-brand-orange"
                  />
                  <span>Sleeper Layout</span>
                </label>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  value={amenitiesInput}
                  onChange={(e) => setAmenitiesInput(e.target.value)}
                  placeholder="WiFi, Charging Point, Blankets, Water Bottle"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-sm"
                >
                  {modalMode === 'create' ? 'Save Bus to Fleet' : 'Update Bus Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Remove Bus From Fleet?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              This bus record will be permanently deleted from the database. Ensure no upcoming trips are active on this coach.
            </p>

            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBus(deleteConfirmId)}
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
