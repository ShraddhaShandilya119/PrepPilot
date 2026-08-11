import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Info,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import logoImg from '../assets/logo/image.png';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#07050e] text-white p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors bg-[#131b2e]/80 px-4 py-2.5 rounded-xl border border-purple-500/30 shadow-md backdrop-blur-xl"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Back to Dashboard</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            PrepPilot Settings
          </span>
        </div>

        {/* Page Title Header */}
        <div className="flex items-center gap-4 p-6 rounded-3xl bg-[#131b2e]/80 backdrop-blur-xl border border-purple-500/30 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0">
            <SettingsIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Settings</span>
              <span className="text-xl">⚙️</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Manage your account, security credentials, appearance, and platform information
            </p>
          </div>
        </div>

        {/* Settings Sections List */}
        <div className="space-y-6">
          
          {/* SECTION 1: 👤 ACCOUNT */}
          <div className="p-6 rounded-3xl bg-[#131b2e]/70 backdrop-blur-xl border border-purple-500/20 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>👤 Account</span>
            </div>

            <div
              onClick={() => navigate('/profile')}
              className="group p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 flex items-center justify-between cursor-pointer hover:bg-purple-900/20 hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    Edit Profile
                  </h3>
                  <p className="text-xs text-gray-400">Update your full name, email address, and avatar picture</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-purple-400 group-hover:underline hidden sm:inline">
                  Edit Profile
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* SECTION 2: 🔒 SECURITY */}
          <div className="p-6 rounded-3xl bg-[#131b2e]/70 backdrop-blur-xl border border-purple-500/20 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>🔒 Security</span>
            </div>

            <div
              onClick={() => navigate('/profile')}
              className="group p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 flex items-center justify-between cursor-pointer hover:bg-purple-900/20 hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Change Password
                  </h3>
                  <p className="text-xs text-gray-400">Update your account password or request a reset link</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 group-hover:underline hidden sm:inline">
                  Change Password
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* SECTION 4: ℹ️ ABOUT */}
          <div className="p-6 rounded-3xl bg-[#131b2e]/70 backdrop-blur-xl border border-purple-500/20 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>ℹ️ About</span>
            </div>

            <div className="p-6 rounded-2xl bg-purple-950/30 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img src={logoImg} alt="PrepPilot Logo" className="h-14 w-auto filter drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]" />
                <div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">PrepPilot AI</h3>
                  <p className="text-xs text-purple-300 font-medium">Practice. Prepare. Perform.</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Made with ❤️ for Future Developers <strong className="text-purple-300 font-semibold">by Shraddha Shandilya</strong>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-1.5 shrink-0">
                <span className="px-3.5 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-bold shadow-inner">
                  Version 1.0.0
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Production Stable
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;
