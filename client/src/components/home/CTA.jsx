import React from 'react';
import { Rocket, ArrowRight, Play, Star, GraduationCap, Lock } from 'lucide-react';

const CTA = () => {
  return (
    <section className="relative py-20 md:py-32 bg-[#0B1120] overflow-hidden border-t border-purple-900/20">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-purple-600/20 via-pink-500/15 to-amber-500/20 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Floating neon accent particles */}
      <div className="absolute top-12 left-16 w-2 h-2 rounded-full bg-purple-400 blur-[1px] animate-ping opacity-75" />
      <div className="absolute bottom-16 right-20 w-2 h-2 rounded-full bg-amber-400 blur-[1px] animate-pulse opacity-75" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="relative rounded-[32px] p-8 md:p-16 md:py-20 bg-[#131b2e]/60 backdrop-blur-2xl border border-purple-500/30 shadow-[0_25px_70px_rgba(112,26,238,0.25)] overflow-hidden text-center flex flex-col items-center">
          
          {/* Subtle Grid Lines Background Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f133d_1px,transparent_1px),linear-gradient(to_bottom,#1f133d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg shadow-purple-950/50">
            <Rocket className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>START YOUR JOURNEY</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-tight font-sans">
            Ready to{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Ace Your Next Interview?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-6 text-gray-300 text-base sm:text-xl max-w-2xl font-normal leading-relaxed">
            Join thousands of students who are preparing smarter with AI-powered resume analysis and mock interviews.
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {/* Get Started Free */}
            <button className="flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 hover:from-purple-300 hover:to-amber-300 rounded-xl shadow-[0_6px_30px_rgba(236,72,153,0.4)] transition-all duration-300 hover:scale-105 active:scale-95">
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Watch Demo */}
            <button className="flex items-center gap-2.5 px-7 py-4 text-base font-medium text-purple-200 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Trust Indicators Bar */}
          <div className="mt-12 pt-8 border-t border-purple-900/40 w-full max-w-2xl flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs sm:text-sm font-semibold text-gray-300">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-white font-bold">4.9/5 Rating</span>
            </div>

            {/* Students */}
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span className="text-white font-bold">10K+ Students</span>
            </div>

            {/* Security */}
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-bold">Secure & Private</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
