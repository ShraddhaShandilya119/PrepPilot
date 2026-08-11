import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Crown,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import authApi from '../../api/authApi';

const Topbar = () => {
  const [userName, setUserName] = useState('Shraddha');
  const [greeting, setGreeting] = useState({ text: 'Good Morning', icon: '🌅' });
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Dynamic Time-Based Greeting Function
  useEffect(() => {
    updateTimeBasedGreeting();
    fetchUserProfile();

    // Check scroll shadow
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting({ text: 'Good Morning', icon: '🌅' });
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting({ text: 'Good Afternoon', icon: '☀️' });
    } else if (currentHour >= 17 && currentHour < 22) {
      setGreeting({ text: 'Good Evening', icon: '🌆' });
    } else {
      setGreeting({ text: 'Good Night', icon: '🌙' });
    }
  };

  const fetchUserProfile = async () => {
    // Check localStorage first
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.name) setUserName(parsed.name);
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }

    // Fetch live user profile
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await authApi.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.user?.name) {
          setUserName(res.data.user.name);
        }
      }
    } catch (err) {
      console.error('Error fetching topbar profile:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full bg-[#0B1120]/85 backdrop-blur-xl border-b border-purple-900/30 px-4 md:px-8 py-3.5 flex items-center justify-between transition-shadow duration-300 ${
        isScrolled ? 'shadow-xl shadow-purple-950/40' : ''
      }`}
    >
      {/* Left Section: Dynamic Time Greeting & User Name */}
      <div className="flex flex-col pl-12 lg:pl-0">
        <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight flex items-center gap-2 font-sans">
          <span>{greeting.text}, {userName}!</span>
          <span>{greeting.icon}</span>
        </h1>
        <p className="text-xs text-gray-400 font-medium">
          Ready to ace your next interview?
        </p>
      </div>

      {/* Center Section: Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full flex items-center bg-[#131b2e]/70 border border-purple-500/20 focus-within:border-purple-400/60 rounded-xl px-3.5 py-2 transition-all duration-300 shadow-inner group">
          <Search className="w-4 h-4 text-gray-400 group-focus-within:text-purple-400 transition-colors shrink-0" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none px-3 font-normal"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-gray-400 bg-purple-950/50 border border-purple-500/20 rounded-md">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section: Notifications & User Profile */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* Notification Bell Badge */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-gray-300 hover:text-white hover:border-purple-500/50 transition-all duration-300 hover:scale-105 relative cursor-pointer"
            aria-label="View Notifications"
          >
            <Bell className="w-4 h-4 text-purple-300" />
            {/* Unread Counter Badge */}
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899] animate-pulse">
              3
            </span>
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-[#0d091a]/95 backdrop-blur-2xl border border-purple-500/30 shadow-2xl p-4 z-50 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-purple-900/30 mb-3">
                <h4 className="text-sm font-bold text-white">Notifications</h4>
                <span className="text-[10px] font-semibold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded-full">
                  3 Unread
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                  <p className="font-semibold text-white">Mock Interview Completed</p>
                  <p className="text-gray-400 mt-0.5">Frontend Developer round score: 92%</p>
                  <span className="text-[10px] text-purple-400 mt-1 block">2 hours ago</span>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                  <p className="font-semibold text-white">ATS Resume Score Ready</p>
                  <p className="text-gray-400 mt-0.5">Score improved to 85/100</p>
                  <span className="text-[10px] text-purple-400 mt-1 block">5 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Card Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 p-1.5 md:pr-3 rounded-2xl bg-purple-950/30 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02] focus:outline-none cursor-pointer"
          >
            {/* Circular Avatar */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt={`${userName} Avatar`}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover ring-2 ring-purple-500/50 shadow-md"
            />
            
            {/* Name & Plan Badge */}
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs md:text-sm font-bold text-white leading-tight font-sans">
                {userName}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 leading-tight">
                <Crown className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>Premium Plan</span>
              </span>
            </div>

            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-52 rounded-2xl bg-[#0d091a]/95 backdrop-blur-2xl border border-purple-500/30 shadow-2xl p-2 z-50 animate-in fade-in duration-200">
              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-purple-950/50 transition-colors"
              >
                <User className="w-4 h-4 text-purple-400" />
                <span>Profile Settings</span>
              </Link>
              
              <Link
                to="/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-purple-950/50 transition-colors"
              >
                <Settings className="w-4 h-4 text-purple-400" />
                <span>Preferences</span>
              </Link>

              <div className="border-t border-purple-900/40 my-1" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;
