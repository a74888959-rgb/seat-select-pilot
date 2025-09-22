export interface Seat {
  id: string;
  row: number;
  column: string;
  class: 'economy' | 'premium' | 'business';
  isAvailable: boolean;
  isSelected: boolean;
  price: number;
  type: 'window' | 'middle' | 'aisle';
}

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
}

export interface Flight {
  id: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  aircraft: string;
  duration: string;
}

export interface Booking {
  id: string;
  flight: Flight;
  passenger: Passenger;
  seat: Seat;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}