import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ServicesPage from './pages/Services/ServicesPage';
import UserBookingsPage from './pages/Dashboard/UserBookingsPage';

import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import AdminServicesPage from './pages/Admin/AdminServicesPage';
import AdminUsersPage from './pages/Admin/AdminUsersPage';
import AdminBookingsPage from './pages/Admin/AdminBookingsPage';

import ProtectedRoute from './components/Auth/ProtectedRoute';
import PublicRoute from './components/Auth/PublicRoute';
import AdminRoute from './components/Auth/AdminRoute';
import UserLayout from './components/Layout/UserLayout';
import AdminLayout from './components/Layout/AdminLayout';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
    
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      
      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/my-bookings" element={<UserBookingsPage />} />
        </Route>
      </Route>

    
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/services" element={<AdminServicesPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
