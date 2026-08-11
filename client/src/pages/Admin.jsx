import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Users, BarChart } from 'lucide-react';

const Admin = () => {
  return (
    <div className="min-h-screen bg-[#07050e] text-white p-6 md:p-10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-purple-950/40 px-4 py-2 rounded-xl border border-purple-500/20 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="p-8 rounded-3xl bg-[#131b2e]/80 border border-purple-500/30 text-center">
          <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Admin Control Dashboard</h1>
          <p className="text-sm text-gray-400">Manage platform users, system analytics, and AI model configurations.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
