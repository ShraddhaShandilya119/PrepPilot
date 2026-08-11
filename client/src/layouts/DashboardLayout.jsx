import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';

const DashboardLayout = () => {
  const token = localStorage.getItem('token');

  // Auth Guard: If no token found in LocalStorage, redirect to /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#07050e] text-white flex overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area with Sticky Topbar */}
      <div className="flex-1 flex flex-col overflow-y-auto max-h-screen relative z-10">
        {/* Sticky Topbar Header */}
        <Topbar />

        {/* Dynamic Route Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
