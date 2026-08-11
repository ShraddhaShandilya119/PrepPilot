import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import logoImg from '../../assets/logo/image.png';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="relative flex items-center justify-between px-4 py-1.5 md:px-6 md:py-2 rounded-2xl md:rounded-full bg-[#0d091a]/85 backdrop-blur-xl border border-purple-500/20 shadow-[0_8px_32px_0_rgba(112,26,238,0.15)] transition-all duration-300">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center group py-0.5">
            <img 
              src={logoImg} 
              alt="PrepPilot AI Logo" 
              className="h-16 md:h-20 lg:h-22 w-auto -my-2.5 md:-my-3.5 object-contain filter brightness-110 contrast-105 drop-shadow-[0_0_12px_rgba(168,85,247,0.35)] transition-all duration-300 group-hover:scale-110" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-[#140f28]/60 p-1.5 rounded-full border border-purple-500/10">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveTab(item.name)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_#a855f7]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-medium text-purple-200 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-gray-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 hover:from-purple-300 hover:via-pink-300 hover:to-amber-300 rounded-xl shadow-[0_4px_20px_rgba(236,72,153,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-xl bg-purple-950/40 border border-purple-500/20 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl bg-[#0d091a]/95 backdrop-blur-2xl border border-purple-500/30 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.name
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'text-gray-300 hover:bg-purple-950/30 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-3 border-t border-purple-900/40 flex flex-col gap-2 mt-1">
                <button className="w-full py-2.5 text-sm font-medium text-purple-200 bg-purple-950/50 border border-purple-500/30 rounded-xl">
                  Login
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-gray-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 rounded-xl shadow-lg">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
