import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SeatMap } from '../components/bus/SeatMap';
import { 
  Bus, MapPin, Clock, ArrowRight, Shield, AlertCircle, 
  ChevronRight, Calendar, Info 
} from 'lucide-react';

export const SeatSelectionPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { 
    trips, buses, routes, 
    selectedTrip, setSelectedTrip, 
    selectedSeats, setSelectedSeats,
    selectedBoarding, setSelectedBoarding,
    selectedDropping, setSelectedDropping
  } = useApp();

  const trip = trips.find((t) => t.id === tripId) || selectedTrip;
  const bus = trip ? buses.find((b) => b.id === trip.busId) : null;
  const route = trip ? routes.find((r) => r.id === trip.routeId) : null;

  // Local selection of points
  const [boardingIndex, setBoardingIndex] = useState<number>(0);
  const [droppingIndex, setDroppingIndex] = useState<number>(0);

  useEffect(() => {
    if (trip) {
      setSelectedTrip(trip);
      if (trip.boardingPoints.length > 0 && !selectedBoarding) {
        setSelectedBoarding(trip.boardingPoints[0]);
      }
      if (trip.droppingPoints.length > 0 && !selectedDropping) {
        setSelectedDropping(trip.droppingPoints[0]);
      }
    }
  }, [trip]);

  if (!trip || !bus || !route) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
        <h2 className="text-xl font-bold text-slate-800">Trip Not Found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">The selected trip schedule could not be located or has expired.</p>
        <button
          onClick={() => navigate('/search-buses')}
          className="px-5 py-2.5 rounded-xl bg-brand-royal text-white font-bold text-sm"
        >
          Return to Bus Search
        </button>
      </div>
    );
  }

  const handleToggleSeat = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBoardingChange = (idx: number) => {
    setBoardingIndex(idx);
    setSelectedBoarding(trip.boardingPoints[idx]);
  };

  const handleDroppingChange = (idx: number) => {
    setDroppingIndex(idx);
    setSelectedDropping(trip.droppingPoints[idx]);
  };

  const totalFare = selectedSeats.length * trip.fare;

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to continue.');
      return;
    }
    if (!selectedBoarding) {
      setSelectedBoarding(trip.boardingPoints[boardingIndex]);
    }
    if (!selectedDropping) {
      setSelectedDropping(trip.droppingPoints[droppingIndex]);
    }
    navigate('/booking-checkout');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
          <button onClick={() => navigate('/search-buses')} className="hover:text-slate-800">
            Search Buses
          </button>
          <span>/</span>
          <span className="text-slate-800">Seat Selection</span>
          <span>/</span>
          <span className="text-slate-400">Passenger Details</span>
        </div>

        {/* Trip Summary Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-orange text-white">
                  {bus.busType}
                </span>
                <span className="text-xs text-slate-300 font-mono">Reg: {bus.regNumber}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {bus.operatorName}
              </h1>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                <span>Date: <strong>{trip.journeyDate}</strong></span>
                <span>&bull;</span>
                <span>Driver: <strong>Selvam M. (Rating: 4.9 ★)</strong></span>
              </p>
            </div>

            {/* Time Bar */}
            <div className="flex items-center gap-6 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
              <div className="text-left">
                <span className="text-xs text-slate-400 block font-bold uppercase">Departure</span>
                <span className="text-2xl font-black text-white">{trip.departureTime}</span>
                <span className="text-xs font-bold text-slate-300 block">{route.sourceCity}</span>
              </div>

              <div className="flex flex-col items-center px-2">
                <span className="text-[10px] text-slate-400 font-bold">{route.estimatedDuration}</span>
                <ArrowRight className="w-4 h-4 text-brand-orange my-0.5" />
                <span className="text-[10px] text-slate-400 font-bold">{route.distanceKm} km</span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-bold uppercase">Arrival</span>
                <span className="text-2xl font-black text-white">{trip.arrivalTime}</span>
                <span className="text-xs font-bold text-slate-300 block">{route.destinationCity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Columns: Seat Map + Boarding/Dropping & Price Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left / Center: Interactive Seat Layout */}
          <div className="lg:col-span-7">
            <SeatMap
              bus={bus}
              trip={trip}
              selectedSeats={selectedSeats}
              onToggleSeat={handleToggleSeat}
              maxSeats={6}
            />
          </div>

          {/* Right: Boarding / Dropping & Fare Calculation Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Boarding Points Selection */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Select Boarding Point ({route.sourceCity})</span>
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {trip.boardingPoints.map((point, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-2xl border text-xs cursor-pointer transition ${
                      boardingIndex === idx
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="boardingPoint"
                      checked={boardingIndex === idx}
                      onChange={() => handleBoardingChange(idx)}
                      className="mt-0.5 accent-emerald-600"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center font-bold text-slate-900">
                        <span>{point.location}</span>
                        <span className="text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md font-mono">
                          {point.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{point.landmark}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Dropping Points Selection */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-brand-royal" />
                <span>Select Dropping Point ({route.destinationCity})</span>
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {trip.droppingPoints.map((point, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-2xl border text-xs cursor-pointer transition ${
                      droppingIndex === idx
                        ? 'border-brand-royal bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="droppingPoint"
                      checked={droppingIndex === idx}
                      onChange={() => handleDroppingChange(idx)}
                      className="mt-0.5 accent-brand-royal"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center font-bold text-slate-900">
                        <span>{point.location}</span>
                        <span className="text-brand-royal bg-blue-100/60 px-2 py-0.5 rounded-md font-mono">
                          {point.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{point.landmark}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Summary & Action */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                Reservation Summary
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Selected Seat(s):</span>
                  <span className="font-extrabold text-brand-orange text-sm font-mono">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Seats Count:</span>
                  <span className="font-bold text-slate-800">{selectedSeats.length}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Fare per seat:</span>
                  <span className="font-bold text-slate-800">₹{trip.fare}</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-sm">Total Base Fare:</span>
                  <span className="text-2xl font-black text-slate-900 font-sans">
                    ₹{totalFare}
                  </span>
                </div>
              </div>

              {selectedSeats.length === 0 ? (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Click available seats on the bus map to proceed.</span>
                </div>
              ) : null}

              <button
                type="button"
                disabled={selectedSeats.length === 0}
                onClick={handleProceed}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  selectedSeats.length > 0
                    ? 'bg-brand-orange hover:bg-brand-orangeHover text-white shadow-orange-500/25 cursor-pointer transform hover:-translate-y-0.5'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span>Continue to Passenger Details</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
