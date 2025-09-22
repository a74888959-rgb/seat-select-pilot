import { Flight, Seat } from '../types/airline';

export const mockFlight: Flight = {
  id: '1',
  flightNumber: 'AA 2847',
  departure: 'New York (JFK)',
  arrival: 'Los Angeles (LAX)',
  departureTime: '14:30',
  arrivalTime: '18:45',
  date: '2024-02-15',
  aircraft: 'Boeing 737-800',
  duration: '6h 15m'
};

// Generate seats for a Boeing 737-800 configuration
export const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  // Business class: rows 1-3 (2-2 configuration)
  for (let row = 1; row <= 3; row++) {
    ['A', 'C', 'D', 'F'].forEach((col, index) => {
      seats.push({
        id: `${row}${col}`,
        row,
        column: col,
        class: 'business',
        isAvailable: Math.random() > 0.3, // 70% available
        isSelected: false,
        price: 899,
        type: index === 0 || index === 3 ? 'window' : 'aisle'
      });
    });
  }
  
  // Premium Economy: rows 4-8 (3-3 configuration)
  for (let row = 4; row <= 8; row++) {
    columns.forEach((col, index) => {
      seats.push({
        id: `${row}${col}`,
        row,
        column: col,
        class: 'premium',
        isAvailable: Math.random() > 0.4, // 60% available
        isSelected: false,
        price: 349,
        type: index === 0 || index === 5 ? 'window' : index === 2 || index === 3 ? 'aisle' : 'middle'
      });
    });
  }
  
  // Economy: rows 9-33 (3-3 configuration)
  for (let row = 9; row <= 33; row++) {
    columns.forEach((col, index) => {
      seats.push({
        id: `${row}${col}`,
        row,
        column: col,
        class: 'economy',
        isAvailable: Math.random() > 0.5, // 50% available
        isSelected: false,
        price: 189,
        type: index === 0 || index === 5 ? 'window' : index === 2 || index === 3 ? 'aisle' : 'middle'
      });
    });
  }
  
  return seats;
};

export const mockSeats = generateSeats();