export type UserRole = 'passenger' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  password?: string; // Stored securely in demo localStorage, never exposed in UI
  avatar?: string;
  address?: string;
  preferredCity?: string;
}

export type BusType = 
  | 'AC Sleeper (2+1)' 
  | 'AC Semi-Sleeper (2+2)' 
  | 'Non-AC Sleeper (2+1)' 
  | 'Non-AC Seater (2+2)' 
  | 'Volvo Multi-Axle AC Sleeper' 
  | 'BharatBenz Luxury AC (2+2)';

export type BusStatus = 'Active' | 'Maintenance' | 'In-Transit';

export interface Bus {
  id: string;
  regNumber: string;
  operatorName: string;
  model: string;
  busType: BusType;
  isAC: boolean;
  isSleeper: boolean;
  totalSeats: number;
  amenities: string[];
  assignedDriverId?: string;
  status: BusStatus;
  rating: number;
  totalReviews: number;
}

export interface Route {
  id: string;
  sourceCity: string;
  destinationCity: string;
  distanceKm: number;
  estimatedDuration: string; // e.g. "6h 30m"
  intermediateStops: string[];
  isPopular?: boolean;
}

export type TripStatus = 'Scheduled' | 'Ongoing' | 'Completed' | 'Cancelled';

export interface StopPoint {
  time: string;
  location: string;
  landmark: string;
}

export interface Trip {
  id: string;
  routeId: string;
  busId: string;
  driverId: string;
  journeyDate: string; // YYYY-MM-DD
  departureTime: string; // HH:MM
  arrivalTime: string; // HH:MM
  fare: number; // Base fare in INR (₹)
  boardingPoints: StopPoint[];
  droppingPoints: StopPoint[];
  bookedSeats: string[]; // e.g. ["L1", "L2", "U4"]
  status: TripStatus;
}

export interface PassengerDetail {
  seatNumber: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
}

export type BookingStatus = 'Confirmed' | 'Cancelled' | 'Completed';

export interface Booking {
  id: string; // e.g. "GT-BK-98231"
  pnr: string; // e.g. "GT26A984"
  tripId: string;
  userId: string;
  passengers: PassengerDetail[];
  contactEmail: string;
  contactPhone: string;
  emergencyContact?: string;
  seatNumbers: string[];
  baseFare: number;
  taxAmount: number;
  discountAmount: number;
  totalFare: number;
  sourceCity: string;
  destinationCity: string;
  busOperator: string;
  busType: string;
  busRegNumber: string;
  journeyDate: string;
  departureTime: string;
  arrivalTime: string;
  boardingPoint: StopPoint;
  droppingPoint: StopPoint;
  bookingDate: string; // ISO date string
  status: BookingStatus;
  paymentMethod: 'UPI / QR' | 'Credit/Debit Card' | 'Net Banking';
  cancellationDate?: string;
  refundAmount?: number;
}

export type DriverStatus = 'Available' | 'On Trip' | 'Off Duty';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  experienceYears: number;
  assignedBusId?: string;
  status: DriverStatus;
  rating: number;
}

export interface CityInfo {
  name: string;
  state: string;
  popularPickupPoints: string[];
  popularDropPoints: string[];
  imageUrl: string;
  description: string;
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
  passengers: number;
}
