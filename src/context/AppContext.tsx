import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Bus, Route, Driver, Trip, Booking, SearchParams, StopPoint, BookingStatus 
} from '../types';
import { 
  INITIAL_USERS, INITIAL_BUSES, INITIAL_ROUTES, INITIAL_DRIVERS, 
  INITIAL_TRIPS, INITIAL_BOOKINGS, COMPANY_INFO 
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  buses: Bus[];
  routes: Route[];
  drivers: Driver[];
  trips: Trip[];
  bookings: Booking[];
  companyInfo: typeof COMPANY_INFO;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Search & Booking Wizard State
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  selectedTrip: Trip | null;
  setSelectedTrip: (trip: Trip | null) => void;
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
  selectedBoarding: StopPoint | null;
  setSelectedBoarding: (point: StopPoint | null) => void;
  selectedDropping: StopPoint | null;
  setSelectedDropping: (point: StopPoint | null) => void;

  // Auth Operations
  login: (email: string, password: string, requiredRole?: 'passenger' | 'admin') => { success: boolean; error?: string };
  register: (userData: Omit<User, 'id' | 'createdAt'>) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (userId: string, data: Partial<User>) => void;

  // Passenger Booking Operations
  createBooking: (bookingPayload: {
    trip: Trip;
    passengers: { name: string; age: number; gender: 'Male' | 'Female' | 'Other'; seatNumber: string }[];
    contactEmail: string;
    contactPhone: string;
    emergencyContact?: string;
    seatNumbers: string[];
    baseFare: number;
    taxAmount: number;
    discountAmount: number;
    totalFare: number;
    boardingPoint: StopPoint;
    droppingPoint: StopPoint;
    paymentMethod: 'UPI / QR' | 'Credit/Debit Card' | 'Net Banking';
  }) => Booking;
  cancelBooking: (bookingId: string) => boolean;

  // Admin Management Operations
  addBus: (bus: Omit<Bus, 'id'>) => void;
  updateBus: (id: string, bus: Partial<Bus>) => void;
  deleteBus: (id: string) => boolean;

  addRoute: (route: Omit<Route, 'id'>) => void;
  updateRoute: (id: string, route: Partial<Route>) => void;
  deleteRoute: (id: string) => boolean;

  addTrip: (trip: Omit<Trip, 'id' | 'bookedSeats' | 'status'>) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  deleteTrip: (id: string) => boolean;

  addDriver: (driver: Omit<Driver, 'id' | 'rating'>) => void;
  updateDriver: (id: string, driver: Partial<Driver>) => void;
  deleteDriver: (id: string) => boolean;

  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'gotravels_users_v1',
  CURRENT_USER: 'gotravels_current_user_v1',
  BUSES: 'gotravels_buses_v1',
  ROUTES: 'gotravels_routes_v1',
  DRIVERS: 'gotravels_drivers_v1',
  TRIPS: 'gotravels_trips_v1',
  BOOKINGS: 'gotravels_bookings_v1',
  INITIALIZED: 'gotravels_initialized_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Safe localStorage helper
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`Error reading localStorage for key ${key}:`, e);
      return fallback;
    }
  };

  // App State Initialization
  const [users, setUsers] = useState<User[]>(() => loadStored(STORAGE_KEYS.USERS, INITIAL_USERS));
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadStored(STORAGE_KEYS.CURRENT_USER, null));
  const [buses, setBuses] = useState<Bus[]>(() => loadStored(STORAGE_KEYS.BUSES, INITIAL_BUSES));
  const [routes, setRoutes] = useState<Route[]>(() => loadStored(STORAGE_KEYS.ROUTES, INITIAL_ROUTES));
  const [drivers, setDrivers] = useState<Driver[]>(() => loadStored(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS));
  const [trips, setTrips] = useState<Trip[]>(() => loadStored(STORAGE_KEYS.TRIPS, INITIAL_TRIPS));
  const [bookings, setBookings] = useState<Booking[]>(() => loadStored(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS));

  // Search parameters default
  const todayStr = '2026-10-23';
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: 'Chennai',
    to: 'Bengaluru',
    date: todayStr,
    passengers: 1
  });

  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedBoarding, setSelectedBoarding] = useState<StopPoint | null>(null);
  const [selectedDropping, setSelectedDropping] = useState<StopPoint | null>(null);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) { console.error(e); }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (e) { console.error(e); }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BUSES, JSON.stringify(buses));
    } catch (e) { console.error(e); }
  }, [buses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(routes));
    } catch (e) { console.error(e); }
  }, [routes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(drivers));
    } catch (e) { console.error(e); }
  }, [drivers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
    } catch (e) { console.error(e); }
  }, [trips]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) { console.error(e); }
  }, [bookings]);

  // Authentication
  const login = (email: string, password: string, requiredRole?: 'passenger' | 'admin') => {
    const trimmedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!user) {
      return { success: false, error: 'No account registered with this email address.' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    if (requiredRole && user.role !== requiredRole) {
      if (requiredRole === 'admin') {
        return { success: false, error: 'Access denied: This portal is reserved for GoTravels administrative staff.' };
      } else {
        return { success: false, error: 'Administrator accounts should login via the dedicated Admin Portal.' };
      }
    }

    // Do not expose password in current active session object
    const { password: _, ...safeUser } = user;
    setCurrentUser(safeUser as User);
    addToast(`Welcome back, ${user.name}!`, 'success');
    return { success: true };
  };

  const register = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const trimmedEmail = userData.email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, error: 'An account with this email address is already registered.' };
    }

    const newUser: User = {
      ...userData,
      id: `USR-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      role: 'passenger'
    };

    setUsers((prev) => [...prev, newUser]);
    
    // Automatically log in the newly registered passenger
    const { password: _, ...safeUser } = newUser;
    setCurrentUser(safeUser as User);
    addToast(`Account created successfully! Welcome to GoTravels, ${newUser.name}.`, 'success');
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('You have been logged out successfully.', 'info');
  };

  const updateProfile = (userId: string, data: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...data } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, ...data } : null));
    }
    addToast('Profile updated successfully!', 'success');
  };

  // Booking Flow
  const createBooking = (payload: {
    trip: Trip;
    passengers: { name: string; age: number; gender: 'Male' | 'Female' | 'Other'; seatNumber: string }[];
    contactEmail: string;
    contactPhone: string;
    emergencyContact?: string;
    seatNumbers: string[];
    baseFare: number;
    taxAmount: number;
    discountAmount: number;
    totalFare: number;
    boardingPoint: StopPoint;
    droppingPoint: StopPoint;
    paymentMethod: 'UPI / QR' | 'Credit/Debit Card' | 'Net Banking';
  }) => {
    const bus = buses.find((b) => b.id === payload.trip.busId);
    const route = routes.find((r) => r.id === payload.trip.routeId);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `BK-${randomSuffix}${Date.now().toString().slice(-2)}`;
    const pnr = `GT${payload.trip.journeyDate.slice(2, 4)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${randomSuffix}`;

    const newBooking: Booking = {
      id: bookingId,
      pnr,
      tripId: payload.trip.id,
      userId: currentUser?.id || 'GUEST-USER',
      passengers: payload.passengers,
      contactEmail: payload.contactEmail,
      contactPhone: payload.contactPhone,
      emergencyContact: payload.emergencyContact,
      seatNumbers: payload.seatNumbers,
      baseFare: payload.baseFare,
      taxAmount: payload.taxAmount,
      discountAmount: payload.discountAmount,
      totalFare: payload.totalFare,
      sourceCity: route?.sourceCity || 'Chennai',
      destinationCity: route?.destinationCity || 'Bengaluru',
      busOperator: bus?.operatorName || 'GoTravels Royal Cruise',
      busType: bus?.busType || 'AC Sleeper (2+1)',
      busRegNumber: bus?.regNumber || 'TN 01 AB 4455',
      journeyDate: payload.trip.journeyDate,
      departureTime: payload.trip.departureTime,
      arrivalTime: payload.trip.arrivalTime,
      boardingPoint: payload.boardingPoint,
      droppingPoint: payload.droppingPoint,
      bookingDate: new Date().toISOString(),
      status: 'Confirmed',
      paymentMethod: payload.paymentMethod
    };

    // Update the trip's booked seats
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id === payload.trip.id) {
          const updatedBooked = Array.from(new Set([...t.bookedSeats, ...payload.seatNumbers]));
          return { ...t, bookedSeats: updatedBooked };
        }
        return t;
      })
    );

    // Save booking
    setBookings((prev) => [newBooking, ...prev]);

    // Reset selection wizard
    setSelectedSeats([]);
    setSelectedBoarding(null);
    setSelectedDropping(null);

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return false;

    // Release seats on the trip
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id === target.tripId) {
          const updatedBooked = t.bookedSeats.filter((s) => !target.seatNumbers.includes(s));
          return { ...t, bookedSeats: updatedBooked };
        }
        return t;
      })
    );

    // Mark booking as Cancelled with full demo refund
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'Cancelled',
              cancellationDate: new Date().toISOString(),
              refundAmount: b.totalFare
            }
          : b
      )
    );

    addToast(`Booking ${target.pnr} has been cancelled. Demo refund of ₹${target.totalFare} initiated.`, 'info');
    return true;
  };

  // Admin Management Actions
  const addBus = (busData: Omit<Bus, 'id'>) => {
    const newBus: Bus = {
      ...busData,
      id: `BUS-${Date.now().toString().slice(-4)}`
    };
    setBuses((prev) => [...prev, newBus]);
    addToast(`Bus ${newBus.regNumber} added successfully!`, 'success');
  };

  const updateBus = (id: string, busData: Partial<Bus>) => {
    setBuses((prev) => prev.map((b) => (b.id === id ? { ...b, ...busData } : b)));
    addToast('Bus details updated successfully!', 'success');
  };

  const deleteBus = (id: string) => {
    const hasScheduledTrips = trips.some((t) => t.busId === id && t.status === 'Scheduled');
    if (hasScheduledTrips) {
      addToast('Cannot delete bus: It has active scheduled trips. Reassign or cancel trips first.', 'error');
      return false;
    }
    setBuses((prev) => prev.filter((b) => b.id !== id));
    addToast('Bus removed from fleet.', 'info');
    return true;
  };

  const addRoute = (routeData: Omit<Route, 'id'>) => {
    const newRoute: Route = {
      ...routeData,
      id: `RT-${Date.now().toString().slice(-4)}`
    };
    setRoutes((prev) => [...prev, newRoute]);
    addToast(`Route ${newRoute.sourceCity} → ${newRoute.destinationCity} added!`, 'success');
  };

  const updateRoute = (id: string, routeData: Partial<Route>) => {
    setRoutes((prev) => prev.map((r) => (r.id === id ? { ...r, ...routeData } : r)));
    addToast('Route details updated successfully!', 'success');
  };

  const deleteRoute = (id: string) => {
    const hasTrips = trips.some((t) => t.routeId === id && t.status === 'Scheduled');
    if (hasTrips) {
      addToast('Cannot delete route: It has scheduled trips. Please remove those trips first.', 'error');
      return false;
    }
    setRoutes((prev) => prev.filter((r) => r.id !== id));
    addToast('Route removed successfully.', 'info');
    return true;
  };

  const addTrip = (tripData: Omit<Trip, 'id' | 'bookedSeats' | 'status'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: `TRIP-${Date.now().toString().slice(-4)}`,
      bookedSeats: [],
      status: 'Scheduled'
    };
    setTrips((prev) => [...prev, newTrip]);
    addToast('New trip scheduled successfully!', 'success');
  };

  const updateTrip = (id: string, tripData: Partial<Trip>) => {
    setTrips((prev) => prev.map((t) => (t.id === id ? { ...t, ...tripData } : t)));
    addToast('Trip schedule updated.', 'success');
  };

  const deleteTrip = (id: string) => {
    const trip = trips.find((t) => t.id === id);
    if (trip && trip.bookedSeats.length > 0) {
      addToast('Warning: Cancelling a trip with existing passenger reservations.', 'info');
    }
    setTrips((prev) => prev.filter((t) => t.id !== id));
    addToast('Trip deleted from schedule.', 'info');
    return true;
  };

  const addDriver = (driverData: Omit<Driver, 'id' | 'rating'>) => {
    const newDriver: Driver = {
      ...driverData,
      id: `DRV-${Date.now().toString().slice(-4)}`,
      rating: 5.0
    };
    setDrivers((prev) => [...prev, newDriver]);
    addToast(`Driver ${newDriver.name} onboarded!`, 'success');
  };

  const updateDriver = (id: string, driverData: Partial<Driver>) => {
    setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, ...driverData } : d)));
    addToast('Driver information updated.', 'success');
  };

  const deleteDriver = (id: string) => {
    const isAssigned = buses.some((b) => b.assignedDriverId === id);
    if (isAssigned) {
      addToast('Cannot delete driver: currently assigned to a bus. Unassign first.', 'error');
      return false;
    }
    setDrivers((prev) => prev.filter((d) => d.id !== id));
    addToast('Driver record deleted.', 'info');
    return true;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    if (status === 'Cancelled') {
      cancelBooking(bookingId);
      return;
    }
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    addToast(`Booking status changed to ${status}`, 'success');
  };

  const resetDemoData = () => {
    setUsers(INITIAL_USERS);
    setBuses(INITIAL_BUSES);
    setRoutes(INITIAL_ROUTES);
    setDrivers(INITIAL_DRIVERS);
    setTrips(INITIAL_TRIPS);
    setBookings(INITIAL_BOOKINGS);

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(STORAGE_KEYS.BUSES, JSON.stringify(INITIAL_BUSES));
    localStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(INITIAL_ROUTES));
    localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(INITIAL_DRIVERS));
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(INITIAL_TRIPS));
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));

    addToast('All demonstration data has been restored to factory state.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        buses,
        routes,
        drivers,
        trips,
        bookings,
        companyInfo: COMPANY_INFO,
        toasts,
        addToast,
        removeToast,
        searchParams,
        setSearchParams,
        selectedTrip,
        setSelectedTrip,
        selectedSeats,
        setSelectedSeats,
        selectedBoarding,
        setSelectedBoarding,
        selectedDropping,
        setSelectedDropping,
        login,
        register,
        logout,
        updateProfile,
        createBooking,
        cancelBooking,
        addBus,
        updateBus,
        deleteBus,
        addRoute,
        updateRoute,
        deleteRoute,
        addTrip,
        updateTrip,
        deleteTrip,
        addDriver,
        updateDriver,
        deleteDriver,
        updateBookingStatus,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
