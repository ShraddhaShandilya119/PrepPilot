import React from 'react';
import { Zap, FileUp, Cpu, Trophy, ArrowRight, Sparkles } from 'lucide-react';

const stepsData = [
  {
    stepNumber: '01',
    title: 'Upload Resume',
    description:
      'Upload your resume securely in PDF format for instant AI processing.',
    icon: FileUp,
    iconColor: 'text-amber-400',
    glowBg: 'bg-amber-500/10 border-amber-500/30 shadow-amber-500/20',
    numberGradient: 'from-amber-400/20 to-purple-500/10',
    accentBorder: 'group-hover:border-amber-500/50',
  },
  {
    stepNumber: '02',
    title: 'AI Analysis',
    description:
      'AI evaluates ATS score, skills, keywords, strengths, weaknesses, and generates personalized interview questions.',
    icon: Cpu,
    iconColor: 'text-purple-400',
    glowBg: 'bg-purple-500/10 border-purple-500/30 shadow-purple-500/20',
    numberGradient: 'from-purple-400/20 to-pink-500/10',
    accentBorder: 'group-hover:border-purple-500/50',
  },
  {
    stepNumber: '03',
    title: 'Ace Your Interview',
    description:
      'Practice AI mock interviews, receive instant feedback, improve your confidence, and land your dream job.',
    icon: Trophy,
    iconColor: 'text-yellow-400',
    glowBg: 'bg-amber-400/10 border-amber-400/30 shadow-amber-400/20',
    numberGradient: 'from-yellow-400/20 to-amber-500/10',
    accentBorder: 'group-hover:border-amber-400/50',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-20 md:py-32 bg-[#0B1120] overflow-hidden border-t border-purple-900/20">
      {/* Background ambient light reflections */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating neon accent particles */}
      <div className="absolute top-12 right-20 w-2 h-2 rounded-full bg-purple-400 blur-[1px] animate-ping opacity-75" />
      <div className="absolute bottom-20 left-16 w-2 h-2 rounded-full bg-amber-400 blur-[1px] animate-pulse opacity-75" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20 md:mb-24">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase shadow-lg shadow-purple-950/40">
            <Zap className="w-3.5 h-3.5 fill-amber-400 animate-bounce" />
            <span>HOW IT WORKS</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
            How It{' '}
            <span className="bg-gradient-to-r from-purple-300 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-base sm:text-lg max-w-xl font-normal">
            Get interview-ready in just three simple AI-powered steps.
          </p>

          {/* Dual Pill Underline Accent */}
          <div className="flex items-center gap-1.5 pt-2">
            <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_#a855f7]" />
            <div className="w-2 h-1 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
          </div>

        </div>

        {/* 3-Step Process Cards with Connecting Beam Timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          
          {/* Desktop Connecting Beam Line */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/50 to-amber-500/20 -translate-y-12 z-0 pointer-events-none" />

          {stepsData.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.stepNumber}
                className={`relative flex flex-col justify-between p-8 rounded-3xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 ${step.accentBorder} shadow-[0_15px_35px_rgba(112,26,238,0.12)] hover:shadow-[0_25px_60px_rgba(168,85,247,0.25)] transition-all duration-500 hover:-translate-y-2.5 group overflow-hidden z-10 min-h-[340px]`}
              >
                {/* Large Background Step Number Watermark */}
                <span className="absolute top-4 right-6 text-7xl font-extrabold tracking-tighter text-purple-500/10 group-hover:text-purple-400/20 transition-colors duration-500 pointer-events-none select-none font-sans">
                  {step.stepNumber}
                </span>

                {/* Subtle Hover Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                <div>
                  {/* Glowing Icon Container */}
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-2xl ${step.glowBg} border shadow-lg mb-8 transition-transform duration-500 group-hover:scale-110 relative`}
                  >
                    <IconComponent className={`w-8 h-8 ${step.iconColor}`} />
                    <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-amber-300 opacity-80" />
                  </div>

                  {/* Step Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/30">
                      Step {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight mb-3 font-sans group-hover:text-purple-200 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Card Action Footer */}
                <div className="pt-6 border-t border-purple-900/30 flex items-center justify-between mt-6">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider group-hover:text-purple-300 transition-colors">
                    PrepPilot AI Process
                  </span>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full border border-purple-500/30 text-purple-300 group-hover:text-white group-hover:bg-purple-600/30 group-hover:border-purple-400 transition-all duration-300 shadow-md">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
