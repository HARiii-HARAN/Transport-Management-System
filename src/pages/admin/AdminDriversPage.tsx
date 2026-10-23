import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Driver, DriverStatus } from '../../types';
import { 
  UserCheck, Plus, Search, Filter, Edit3, 
  Trash2, Phone, Mail, Award, AlertCircle, X, Star, Bus as BusIcon 
} from 'lucide-react';

export const AdminDriversPage: React.FC = () => {
  const { drivers, buses, addDriver, updateDriver, deleteDriver } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | DriverStatus>('All');
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [experienceYears, setExperienceYears] = useState(10);
  const [assignedBusId, setAssignedBusId] = useState('');
  const [status, setStatus] = useState<DriverStatus>('Available');

  const filteredDrivers = drivers.filter((d) => {
    if (statusFilter !== 'All' && d.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.licenseNumber.toLowerCase().includes(q) ||
        d.phone.includes(q) ||
        d.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingDriver(null);
    setName('');
    setPhone('+91 98410 00000');
    setEmail('driver@gotravels.com');
    setLicenseNumber('TN0120200008899');
    setExperienceYears(10);
    setAssignedBusId('');
    setStatus('Available');
  };

  const handleOpenEdit = (driver: Driver) => {
    setModalMode('edit');
    setEditingDriver(driver);
    setName(driver.name);
    setPhone(driver.phone);
    setEmail(driver.email);
    setLicenseNumber(driver.licenseNumber);
    setExperienceYears(driver.experienceYears);
    setAssignedBusId(driver.assignedBusId || '');
    setStatus(driver.status);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (modalMode === 'create') {
      addDriver({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        licenseNumber: licenseNumber.trim().toUpperCase(),
        experienceYears: Number(experienceYears),
        assignedBusId: assignedBusId || undefined,
        status
      });
    } else if (modalMode === 'edit' && editingDriver) {
      updateDriver(editingDriver.id, {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        licenseNumber: licenseNumber.trim().toUpperCase(),
        experienceYears: Number(experienceYears),
        assignedBusId: assignedBusId || undefined,
        status
      });
    }

    setModalMode(null);
  };

  const handleDeleteDriver = (id: string) => {
    deleteDriver(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <UserCheck className="w-8 h-8 text-amber-500" />
            <span>Driver Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain verified commercial bus drivers, track active duty status, and oversee highway safety records.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Onboard New Driver</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by driver name, license, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 self-stretch sm:self-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status:</span>
          {(['All', 'Available', 'On Trip', 'Off Duty'] as const).map((st) => (
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

      {/* Drivers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => {
          const assignedBus = buses.find((b) => b.id === driver.assignedBusId);

          return (
            <div
              key={driver.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-lg">
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{driver.name}</h3>
                      <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-emerald-600" />
                        <span>{driver.rating.toFixed(1)} / 5.0</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      driver.status === 'Available'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : driver.status === 'On Trip'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {driver.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Driving License:</span>
                    <strong className="font-mono text-slate-800">{driver.licenseNumber}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience:</span>
                    <strong className="text-slate-800">{driver.experienceYears} Years Heavy Passenger</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Assigned Coach:</span>
                    <strong className="text-brand-royal font-mono">
                      {assignedBus ? `${assignedBus.regNumber} (${assignedBus.operatorName})` : 'Unassigned'}
                    </strong>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>{driver.email}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(driver)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(driver.id)}
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

      {/* Modal: Create / Edit Driver */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {modalMode === 'create' ? 'Onboard Commercial Driver' : 'Update Driver Record'}
              </h3>
              <button onClick={() => setModalMode(null)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M. Selvam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98410 77651"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="selvam.drv@gotravels.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">License Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="TN0120150004921"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Experience (Yrs)</label>
                  <input
                    type="number"
                    min="1"
                    max="45"
                    required
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned Coach</label>
                  <select
                    value={assignedBusId}
                    onChange={(e) => setAssignedBusId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="">None</option>
                    {buses.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.regNumber}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as DriverStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                  >
                    <option value="Available">Available</option>
                    <option value="On Trip">On Trip</option>
                    <option value="Off Duty">Off Duty</option>
                  </select>
                </div>
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
                  {modalMode === 'create' ? 'Save Driver Record' : 'Save Changes'}
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
            <h3 className="text-lg font-black text-slate-900">Remove Commercial Driver?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              This driver profile will be deleted from the database. Ensure this driver is not currently assigned to an active trip.
            </p>

            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteDriver(deleteConfirmId)}
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
