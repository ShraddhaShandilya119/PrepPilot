import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft, Rocket, Sparkles, CheckCircle2, Star } from 'lucide-react';
import logoImg from '../assets/logo/image.png';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#07050e] text-white flex flex-col lg:flex-row relative overflow-hidden font-sans">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Left Column: Brand Feature Showcase (Hidden on Mobile/Tablet, visible on Large screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0B1120]/80 p-12 lg:p-16 flex-col justify-between border-r border-purple-900/30">
        
        {/* Top Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center group">
            <img
              src={logoImg}
              alt="PrepPilot AI Logo"
              className="h-16 md:h-20 lg:h-24 w-auto -my-2 object-contain filter brightness-110 contrast-105 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Middle Feature Highlights */}
        <div className="space-y-8 max-w-lg my-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>AI INTERVIEW PREPARATION PLATFORM</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Master Your Next Tech Interview with{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              PrepPilot AI
            </span>
          </h1>

          {/* Bullet Points */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-amber-400 shrink-0 mt-0.5">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">AI Mock Interviews</h4>
                <p className="text-xs text-gray-400 mt-0.5">Practice realistic technical & HR questions with real-time feedback.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-amber-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">ATS Resume Analyzer</h4>
                <p className="text-xs text-gray-400 mt-0.5">Instant keyword optimization, ATS compatibility score & feedback.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-amber-400 shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Detailed Performance Insights</h4>
                <p className="text-xs text-gray-400 mt-0.5">Track your confidence, communication, and technical readiness over time.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Social Proof Badge */}
        <div className="pt-8 border-t border-purple-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-purple-900 object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="User 1"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-purple-900 object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="User 2"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-purple-900 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="User 3"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium">Loved by 10,000+ candidates</span>
            </div>
          </div>

          <span className="text-xs text-gray-500">PrepPilot AI © {new Date().getFullYear()}</span>
        </div>

      </div>

      {/* Right Column: Auth Form via Outlet */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 min-h-screen lg:min-h-0">
        
        {/* Back to Home Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 sm:left-12 inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-purple-950/40 hover:bg-purple-900/50 px-4 py-2 rounded-xl border border-purple-500/20 shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Mobile Header Logo */}
        <div className="lg:hidden mb-8 mt-12 text-center">
          <Link to="/" className="inline-block">
            <img src={logoImg} alt="PrepPilot AI Logo" className="h-16 sm:h-20 w-auto mx-auto object-contain filter brightness-110 drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]" />
          </Link>
        </div>

        {/* Dynamic Form Content */}
        <div className="w-full max-w-md">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AuthLayout;