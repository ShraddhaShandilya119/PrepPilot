import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Resume from '../pages/Resume';
import Interview from '../pages/Interview';
import History from '../pages/History';
import Bookmarks from '../pages/Bookmarks';
import Settings from '../pages/Settings';
import Jobs from '../pages/Jobs';
import CareerCoach from '../pages/CareerCoach';
import SelectJobRole from '../pages/SelectJobRole';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication Layout Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Standalone Role Selection Route */}
      <Route path="/select-role" element={<ProtectedRoute><SelectJobRole /></ProtectedRoute>} />
      <Route path="/select-job-role" element={<ProtectedRoute><SelectJobRole /></ProtectedRoute>} />

      {/* Dashboard Layout Routes with Sidebar */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard" element={ <ProtectedRoute>  <Dashboard /> </ProtectedRoute> } />
        <Route path="/resume" element={<Resume />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/coach" element={<CareerCoach />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/history" element={<History />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Admin Route */}
      <Route path="/admin" element={<Admin />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
