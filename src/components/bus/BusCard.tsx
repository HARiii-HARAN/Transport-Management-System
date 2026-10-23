import React from 'react';
import { Bus, Trip, Route } from '../../types';
import { 
  Star, Wifi, Zap, Wind, Droplets, MapPin, 
  Clock, ArrowRight, ShieldCheck, ChevronRight 
} from 'lucide-react';

interface BusCardProps {
  bus: Bus;
  trip: Trip;
  route: Route;
  onSelectSeats: (trip: Trip) => void;
}

export const BusCard: React.FC<BusCardProps> = ({
  bus,
  trip,
  route,
  onSelectSeats
}) => {
  const availableSeatsCount = bus.totalSeats - trip.bookedSeats.length;
  const isAlmostFull = availableSeatsCount <= 5;

  const renderAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <span title="High-Speed WiFi"><Wifi className="w-3.5 h-3.5 text-sky-500" /></span>;
    if (lower.includes('charg')) return <span title="Charging Point"><Zap className="w-3.5 h-3.5 text-amber-500" /></span>;
    if (lower.includes('air') || lower.includes('ac')) return <span title="Air Conditioned"><Wind className="w-3.5 h-3.5 text-cyan-500" /></span>;
    if (lower.includes('water')) return <span title="Water Bottle"><Droplets className="w-3.5 h-3.5 text-blue-500" /></span>;
    return <span title={amenity}><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /></span>;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-200 p-5 md:p-6 group">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Section: Operator & Type */}
        <div className="lg:w-1/3">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-brand-royal transition-colors">
              {bus.operatorName}
            </h3>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg text-xs font-bold border border-emerald-200">
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              <span>{bus.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-500 mb-2">
            {bus.model} &bull; <span className="text-brand-royal font-bold">{bus.busType}</span>
          </p>

          {/* Amenities Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {bus.amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-[11px] font-medium text-slate-600 border border-slate-100"
              >
                {renderAmenityIcon(amenity)}
                <span>{amenity}</span>
              </span>
            ))}
            {bus.amenities.length > 4 && (
              <span className="text-[10px] text-slate-400 font-semibold">
                +{bus.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Center Section: Times & Duration */}
        <div className="lg:w-5/12 flex items-center justify-between gap-4 px-2 py-3 lg:py-0 bg-slate-50 lg:bg-transparent rounded-xl lg:rounded-none">
          {/* Departure */}
          <div className="text-left">
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight block">
              {trip.departureTime}
            </span>
            <span className="text-xs font-bold text-slate-700 block truncate max-w-[130px]">
              {route.sourceCity}
            </span>
            <span className="text-[11px] text-slate-400 block truncate max-w-[130px]" title={trip.boardingPoints[0]?.location}>
              {trip.boardingPoints[0]?.location}
            </span>
          </div>

          {/* Duration Graphic */}
          <div className="flex-1 flex flex-col items-center px-2">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {route.estimatedDuration}
            </span>
            <div className="w-full flex items-center gap-1">
              <div className="w-2 h-2 rounded-full border-2 border-brand-royal bg-white"></div>
              <div className="flex-1 h-0.5 bg-slate-200 relative">
                <ArrowRight className="w-3 h-3 text-brand-royal absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
              </div>
              <div className="w-2 h-2 rounded-full bg-brand-royal"></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1">{route.distanceKm} km</span>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight block">
              {trip.arrivalTime}
            </span>
            <span className="text-xs font-bold text-slate-700 block truncate max-w-[130px]">
              {route.destinationCity}
            </span>
            <span className="text-[11px] text-slate-400 block truncate max-w-[130px]" title={trip.droppingPoints[0]?.location}>
              {trip.droppingPoints[0]?.location}
            </span>
          </div>
        </div>

        {/* Right Section: Price & Action */}
        <div className="lg:w-1/4 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 gap-3">
          <div className="text-left lg:text-right">
            <span className="text-xs text-slate-400 block font-medium">Starting from</span>
            <div className="flex items-baseline gap-1 lg:justify-end">
              <span className="text-2xl md:text-3xl font-black text-slate-900 font-sans tracking-tight">
                ₹{trip.fare}
              </span>
            </div>
            <span
              className={`text-xs font-bold block mt-0.5 ${
                isAlmostFull ? 'text-amber-600' : 'text-emerald-600'
              }`}
            >
              {availableSeatsCount} seats available
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectSeats(trip)}
              className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-sm font-bold shadow-md shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <span>View Seats</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Boarding/Dropping Preview Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
          <span className="font-semibold text-slate-700">Boarding:</span>
          <span className="truncate">{trip.boardingPoints.map((p) => p.location).join(' • ')}</span>
        </div>
        <div className="text-[11px] text-slate-400 font-medium shrink-0">
          Trip Reg: <strong className="text-slate-600">{bus.regNumber}</strong>
        </div>
      </div>
    </div>
  );
};
