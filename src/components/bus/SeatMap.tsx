import React, { useState } from 'react';
import { Bus, Trip } from '../../types';
import { Users, Check, AlertCircle } from 'lucide-react';

interface SeatMapProps {
  bus: Bus;
  trip: Trip;
  selectedSeats: string[];
  onToggleSeat: (seatNumber: string) => void;
  maxSeats?: number;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  bus,
  trip,
  selectedSeats,
  onToggleSeat,
  maxSeats = 6
}) => {
  const [activeDeck, setActiveDeck] = useState<'lower' | 'upper'>('lower');
  const isSleeper = bus.isSleeper;

  // Seat generator based on bus configuration
  // For sleeper: 15 lower berths (L1 - L15) and 15 upper berths (U1 - U15) in a 2+1 sleeper arrangement
  // For seater: 40 seats (1 to 40) in a 2+2 arrangement with central aisle
  const generateSleeperSeats = (deck: 'L' | 'U') => {
    // 5 rows of 3 berths: [Single Berth] [Aisle] [Double Berth 1] [Double Berth 2]
    const rows = [];
    for (let r = 1; r <= 5; r++) {
      const single = `${deck}${ (r - 1) * 3 + 1 }`;
      const double1 = `${deck}${ (r - 1) * 3 + 2 }`;
      const double2 = `${deck}${ (r - 1) * 3 + 3 }`;
      rows.push({
        rowNum: r,
        single,
        double1,
        double2
      });
    }
    return rows;
  };

  const generateSeaterSeats = () => {
    // 10 rows of 4 seats: [Left Window] [Left Aisle] [Aisle] [Right Aisle] [Right Window]
    const rows = [];
    for (let r = 1; r <= 10; r++) {
      const leftW = `${ (r - 1) * 4 + 1 }`;
      const leftA = `${ (r - 1) * 4 + 2 }`;
      const rightA = `${ (r - 1) * 4 + 3 }`;
      const rightW = `${ (r - 1) * 4 + 4 }`;
      rows.push({
        rowNum: r,
        leftW,
        leftA,
        rightA,
        rightW
      });
    }
    return rows;
  };

  const isBooked = (seat: string) => trip.bookedSeats.includes(seat);
  const isSelected = (seat: string) => selectedSeats.includes(seat);

  const handleSeatClick = (seat: string) => {
    if (isBooked(seat)) return;
    if (!isSelected(seat) && selectedSeats.length >= maxSeats) {
      alert(`Maximum ${maxSeats} seats can be selected per booking.`);
      return;
    }
    onToggleSeat(seat);
  };

  const renderSleeperBerth = (seatNum: string, isSingle: boolean = false) => {
    const booked = isBooked(seatNum);
    const selected = isSelected(seatNum);

    return (
      <button
        key={seatNum}
        type="button"
        disabled={booked}
        onClick={() => handleSeatClick(seatNum)}
        className={`relative flex flex-col items-center justify-between p-2 rounded-xl transition-all font-semibold text-xs border ${
          isSingle ? 'w-24 h-14' : 'w-24 h-14'
        } ${
          booked
            ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-60'
            : selected
            ? 'bg-brand-orange text-white border-brand-orangeHover shadow-md shadow-orange-500/30 scale-105 z-10'
            : 'bg-white text-slate-800 border-slate-300 hover:border-brand-royal hover:shadow-sm'
        }`}
        title={`Seat ${seatNum} - ${booked ? 'Already Booked' : `₹${trip.fare}`}`}
      >
        {/* Pillow representation */}
        <span
          className={`w-7 h-2 rounded-sm ${
            booked ? 'bg-slate-300' : selected ? 'bg-orange-300' : 'bg-slate-200'
          }`}
        />
        <div className="flex items-center justify-between w-full px-1">
          <span className="font-bold text-xs">{seatNum}</span>
          {selected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
          {booked && <span className="text-[10px] text-slate-400 font-bold">X</span>}
        </div>
      </button>
    );
  };

  const renderSeaterChair = (seatNum: string) => {
    const booked = isBooked(seatNum);
    const selected = isSelected(seatNum);

    return (
      <button
        key={seatNum}
        type="button"
        disabled={booked}
        onClick={() => handleSeatClick(seatNum)}
        className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all font-semibold text-xs border ${
          booked
            ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-60'
            : selected
            ? 'bg-brand-orange text-white border-brand-orangeHover shadow-md shadow-orange-500/30 scale-105 z-10'
            : 'bg-white text-slate-800 border-slate-300 hover:border-brand-royal hover:shadow-sm'
        }`}
        title={`Seat ${seatNum} - ${booked ? 'Already Booked' : `₹${trip.fare}`}`}
      >
        <div className="w-6 h-1 rounded-full mb-1 bg-current opacity-40"></div>
        <span className="font-bold">{seatNum}</span>
        {selected && (
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white"></div>
        )}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-2xl mx-auto">
      {/* Header Info & Deck Selection */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            Select Your Preferred Seats
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click available berths/seats to select or deselect (Max {maxSeats} passengers)
          </p>
        </div>

        {isSleeper && (
          <div className="flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveDeck('lower')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeDeck === 'lower'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Lower Deck (15)
            </button>
            <button
              type="button"
              onClick={() => setActiveDeck('upper')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeDeck === 'upper'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Upper Deck (15)
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 py-4 bg-slate-50/80 rounded-2xl my-6 text-xs font-medium text-slate-600 border border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md border border-slate-300 bg-white shadow-xs"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md border border-brand-orangeHover bg-brand-orange shadow-xs"></div>
          <span className="font-semibold text-slate-900">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md border border-slate-300 bg-slate-200"></div>
          <span className="text-slate-400">Booked</span>
        </div>
      </div>

      {/* Bus Exterior Frame & Seating Cabin */}
      <div className="relative border-4 border-slate-300 rounded-[36px] bg-slate-50/50 p-6 md:p-8 max-w-lg mx-auto shadow-inner">
        {/* Front Cabin / Windshield indicator */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-dashed border-slate-200">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            Front Entrance Door
          </div>
          <div className="flex items-center gap-2 text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold">Driver Cabin</span>
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <span className="text-xs">⎈</span>
            </div>
          </div>
        </div>

        {/* Sleeper Bus Layout */}
        {isSleeper ? (
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
              <span>Single Berth (Window)</span>
              <span>Aisle</span>
              <span>Double Berths</span>
            </div>

            <div className="space-y-4">
              {generateSleeperSeats(activeDeck === 'lower' ? 'L' : 'U').map((row) => (
                <div key={row.rowNum} className="flex items-center justify-between gap-4">
                  {/* Single Berth */}
                  {renderSleeperBerth(row.single, true)}

                  {/* Aisle */}
                  <div className="flex-1 flex justify-center text-[10px] text-slate-300 font-mono tracking-widest">
                    &bull; &bull; &bull;
                  </div>

                  {/* Double Berths */}
                  <div className="flex items-center gap-2">
                    {renderSleeperBerth(row.double1)}
                    {renderSleeperBerth(row.double2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Seater 2+2 Layout */
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
              <span>Left (2)</span>
              <span>Walking Aisle</span>
              <span>Right (2)</span>
            </div>

            <div className="space-y-3">
              {generateSeaterSeats().map((row) => (
                <div key={row.rowNum} className="flex items-center justify-between gap-4">
                  {/* Left 2 */}
                  <div className="flex items-center gap-2">
                    {renderSeaterChair(row.leftW)}
                    {renderSeaterChair(row.leftA)}
                  </div>

                  {/* Central Aisle */}
                  <div className="flex-1 flex justify-center text-[10px] text-slate-300 font-mono">
                    ||
                  </div>

                  {/* Right 2 */}
                  <div className="flex items-center gap-2">
                    {renderSeaterChair(row.rightA)}
                    {renderSeaterChair(row.rightW)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back of bus */}
        <div className="pt-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          — Rear of Coach —
        </div>
      </div>
    </div>
  );
};
