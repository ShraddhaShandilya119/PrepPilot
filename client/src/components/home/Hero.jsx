import React from 'react';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import dashbordImg from '../../assets/images/dashbord.png';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 md:space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs md:text-sm font-medium tracking-wide shadow-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>AI-Powered Interview Preparation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Practice Smarter. <br />
            Prepare Better. <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
              Perform{' '}
            </span>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Confidently.
            </span>
          </h1>

          {/* Subtext Description */}
          <p className="text-gray-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            PrepPilot AI helps you crack interviews with AI-powered mock interviews, real-time feedback, and personalized improvement tips.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="flex items-center gap-2.5 px-7 py-3.5 text-base font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl shadow-[0_6px_25px_rgba(245,158,11,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button className="px-6 py-3.5 text-base font-medium text-purple-200 hover:text-white bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/30 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              Explore Features
            </button>
          </div>

          {/* Social Proof / Ratings */}
          <div className="pt-4 flex items-center gap-4">
            {/* User Avatars */}
            <div className="flex -space-x-2.5">
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-purple-900 object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="User avatar 1"
              />
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-purple-900 object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="User avatar 2"
              />
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-purple-900 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="User avatar 3"
              />
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-purple-900 object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="User avatar 4"
              />
            </div>

            {/* Stars & Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium mt-0.5">
                Loved by <strong className="text-gray-200">10,000+ users</strong>
              </span>
            </div>
          </div>

        </div>

        {/* Right Dashboard Showcase Column */}
        <div className="lg:col-span-6 relative group">
          <div className="relative mx-auto max-w-2xl lg:max-w-none rounded-2xl md:rounded-3xl p-1 bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent shadow-[0_20px_60px_rgba(112,26,238,0.25)] transition-transform duration-500 hover:scale-[1.01]">
            <div className="overflow-hidden rounded-[20px] md:rounded-[22px] bg-[#0c0819] border border-purple-500/20">
              <img
                src={dashbordImg}
                alt="PrepPilot AI Dashboard"
                className="w-full h-auto object-cover rounded-[20px] md:rounded-[22px] transform transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
