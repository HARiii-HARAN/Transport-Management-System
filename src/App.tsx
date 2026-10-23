import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/common/ToastContainer';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public & Passenger Pages
import { HomePage } from './pages/HomePage';
import { BusSearchPage } from './pages/BusSearchPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { BookingCheckoutPage } from './pages/BookingCheckoutPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { PassengerDashboardPage } from './pages/PassengerDashboardPage';
import { ContactPage } from './pages/ContactPage';

// Auth Pages
import { PassengerLoginPage } from './pages/PassengerLoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Admin Management Suite
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminBusesPage } from './pages/admin/AdminBusesPage';
import { AdminRoutesPage } from './pages/admin/AdminRoutesPage';
import { AdminTripsPage } from './pages/admin/AdminTripsPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminPassengersPage } from './pages/admin/AdminPassengersPage';
import { AdminDriversPage } from './pages/admin/AdminDriversPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Layout wrapper for Public / Passenger pages that display the GoTravels Navbar & Footer
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {/* Public & Passenger Flow */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/search-buses" element={<PublicLayout><BusSearchPage /></PublicLayout>} />
          <Route path="/select-seats/:tripId" element={<PublicLayout><SeatSelectionPage /></PublicLayout>} />
          <Route path="/booking-checkout" element={<PublicLayout><BookingCheckoutPage /></PublicLayout>} />
          <Route path="/booking-success/:bookingId" element={<PublicLayout><BookingSuccessPage /></PublicLayout>} />
          <Route path="/my-bookings" element={<PublicLayout><MyBookingsPage /></PublicLayout>} />
          <Route path="/passenger/dashboard" element={<PublicLayout><PassengerDashboardPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

          {/* Dedicated Auth Pages */}
          <Route path="/passenger-login" element={<PassengerLoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dedicated Admin Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="buses" element={<AdminBusesPage />} />
            <Route path="routes" element={<AdminRoutesPage />} />
            <Route path="trips" element={<AdminTripsPage />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="passengers" element={<AdminPassengersPage />} />
            <Route path="drivers" element={<AdminDriversPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
