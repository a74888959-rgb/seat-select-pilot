import { useState } from 'react';
import { Seat } from '../types/airline';
import { cn } from '../lib/utils';
import { Plane, MapPin } from 'lucide-react';

interface SeatMapProps {
  seats: Seat[];
  onSeatSelect: (seat: Seat) => void;
  selectedSeat?: Seat | null;
}

const SeatMap = ({ seats, onSeatSelect, selectedSeat }: SeatMapProps) => {
  const getSeatColor = (seat: Seat) => {
    if (seat.isSelected || selectedSeat?.id === seat.id) return 'bg-seat-selected text-white';
    if (!seat.isAvailable) return 'bg-seat-occupied text-muted-foreground cursor-not-allowed';
    if (seat.class === 'business') return 'bg-seat-premium hover:bg-seat-selected hover:text-white';
    if (seat.class === 'premium') return 'bg-accent/20 hover:bg-seat-selected hover:text-white';
    return 'bg-seat-available hover:bg-seat-selected hover:text-white';
  };

  const getSeatIcon = (seat: Seat) => {
    if (seat.type === 'window') return '🪟';
    if (seat.type === 'aisle') return '🚶';
    return '💺';
  };

  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<number, Seat[]>);

  return (
    <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 mb-6">
        <Plane className="h-6 w-6 text-airline-blue" />
        <h2 className="text-xl font-semibold">Select Your Seat</h2>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-seat-available rounded"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-seat-occupied rounded"></div>
          <span className="text-sm">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-seat-selected rounded"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-seat-premium rounded"></div>
          <span className="text-sm">Business</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent/20 rounded"></div>
          <span className="text-sm">Premium</span>
        </div>
      </div>

      {/* Aircraft outline */}
      <div className="max-w-lg mx-auto">
        <div className="bg-gradient-to-b from-airline-blue/5 to-transparent rounded-t-full pt-4">
          {Object.entries(groupedSeats)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([rowNum, rowSeats]) => {
              const row = Number(rowNum);
              const sortedSeats = rowSeats.sort((a, b) => a.column.localeCompare(b.column));
              
              return (
                <div key={row} className="flex items-center justify-center mb-2">
                  <span className="text-sm text-muted-foreground w-8 text-center">{row}</span>
                  
                  <div className="flex gap-1">
                    {/* Left side seats */}
                    {sortedSeats.slice(0, row <= 3 ? 2 : 3).map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => seat.isAvailable && onSeatSelect(seat)}
                        disabled={!seat.isAvailable}
                        className={cn(
                          "w-8 h-8 rounded text-xs font-medium transition-all duration-200",
                          "border border-border/50 shadow-[var(--shadow-seat)]",
                          getSeatColor(seat)
                        )}
                        title={`${seat.id} - ${seat.class} - $${seat.price} - ${seat.type}`}
                      >
                        {seat.column}
                      </button>
                    ))}
                    
                    {/* Aisle gap */}
                    <div className="w-4"></div>
                    
                    {/* Right side seats */}
                    {sortedSeats.slice(row <= 3 ? 2 : 3).map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => seat.isAvailable && onSeatSelect(seat)}
                        disabled={!seat.isAvailable}
                        className={cn(
                          "w-8 h-8 rounded text-xs font-medium transition-all duration-200",
                          "border border-border/50 shadow-[var(--shadow-seat)]",
                          getSeatColor(seat)
                        )}
                        title={`${seat.id} - ${seat.class} - $${seat.price} - ${seat.type}`}
                      >
                        {seat.column}
                      </button>
                    ))}
                  </div>
                  
                  <span className="text-sm text-muted-foreground w-8 text-center">{row}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SeatMap;