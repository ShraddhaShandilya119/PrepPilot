import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Mic,
  Briefcase,
  Bot,
  History,
  Bookmark,
  User,
  Settings,
  LogOut,
  Crown,
  Rocket,
  Menu,
  X,
} from 'lucide-react';
import logoImg from '../../assets/logo/image.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume Analyzer', path: '/resume', icon: FileText },
    { name: 'Mock Interview', path: '/interview', icon: Mic },
    { name: 'AI Career Coach', path: '/coach', icon: Bot },
    { name: 'Jobs & Matching', path: '/jobs', icon: Briefcase },
    { name: 'History', path: '/history', icon: History },
    { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#0d091a] border border-purple-500/30 text-purple-300 hover:text-white shadow-lg focus:outline-none"
        aria-label="Toggle Navigation Sidebar"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        />
      )}

      {/* Sidebar Main Container */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-40 w-[280px] min-h-screen bg-[#0B1120] border-r border-purple-900/30 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out shrink-0 select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Section: Logo & Branding */}
        <div>
          <div className="flex flex-col items-start pb-6 border-b border-purple-900/30">
            <Link to="/" className="flex items-center group py-0.5">
              <img
                src={logoImg}
                alt="PrepPilot AI Logo"
                className="h-16 md:h-20 lg:h-22 w-auto -my-2.5 object-contain filter brightness-110 contrast-105 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-[11px] font-medium text-gray-400 tracking-wider mt-1 pl-1">
              Practice. Prepare. Perform.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-purple-950/40'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <IconComponent
                        className={`w-5 h-5 transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-gray-400 group-hover:text-purple-300'
                        }`}
                      />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Logout & Upgrade Card */}
        <div className="space-y-4 pt-4">
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200 group"
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            <span>Logout</span>
          </button>

          {/* Premium Upgrade Card */}
          <div className="relative rounded-2xl p-4 bg-gradient-to-br from-purple-900/50 via-indigo-900/30 to-purple-950/70 border border-purple-500/30 shadow-xl overflow-hidden group">
            {/* Background Glow Effect */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Icon Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <Crown className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-sans">
                Upgrade to Pro
              </h4>
            </div>

            {/* Card Description */}
            <p className="text-xs text-gray-300 font-normal leading-relaxed mb-3 pr-6">
              Unlock unlimited AI interviews, resume analysis, ATS reports, and premium features.
            </p>

            {/* Button */}
            <Link
              to="/#pricing"
              className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Upgrade Now
            </Link>

            {/* Rocket Illustration Accent */}
            <Rocket className="absolute bottom-2 right-2 w-10 h-10 text-purple-400/20 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
