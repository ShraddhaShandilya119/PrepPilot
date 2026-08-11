import React from 'react';
import {
  Sparkles,
  FileText,
  Mic,
  TrendingUp,
  Briefcase,
  Bot,
  Target,
  ArrowRight,
} from 'lucide-react';

const featuresData = [
  {
    id: 1,
    title: 'AI Resume Analyzer',
    description:
      'Upload your resume and get instant ATS score, keyword analysis, and personalized improvement tips.',
    icon: FileText,
  },
  {
    id: 2,
    title: 'AI Mock Interview',
    description:
      'Practice realistic technical and HR interviews with AI-powered questions and smart evaluation.',
    icon: Mic,
  },
  {
    id: 3,
    title: 'Performance Analytics',
    description:
      'Track your performance over time with detailed insights, scores, and improvement recommendations.',
    icon: TrendingUp,
  },
  {
    id: 4,
    title: 'Smart Job Matching',
    description:
      'Get personalized job recommendations based on your skills, resume, and career preferences.',
    icon: Briefcase,
  },
  {
    id: 5,
    title: 'AI Feedback',
    description:
      'Receive AI-powered feedback on your answers, communication, confidence, and technical skills.',
    icon: Bot,
  },
  {
    id: 6,
    title: 'Personalized Roadmap',
    description:
      'Follow a customized learning path tailored to your goals and improve your interview success rate.',
    icon: Target,
  },
];

const Features = () => {
  return (
    <section id="features" className="relative py-20 md:py-28 bg-[#07050e] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-20">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase shadow-lg shadow-purple-950/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>POWERFUL FEATURES</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
            Powerful{' '}
            <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-base sm:text-lg max-w-xl font-normal">
            Everything you need to crack your next interview with AI.
          </p>

          {/* Dual Pill Underline Indicator */}
          <div className="flex items-center gap-1.5 pt-2">
            <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_#a855f7]" />
            <div className="w-2 h-1 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
          </div>

        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuresData.map((feature) => {
            const IconComp = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative flex flex-col justify-between p-8 rounded-3xl bg-[#0f0a21]/80 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 shadow-[0_10px_30px_rgba(112,26,238,0.12)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.25)] transition-all duration-300 hover:-translate-y-2 overflow-hidden min-h-[300px]"
              >
                {/* Subtle Hover Gradient Fill */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Glowing Icon Circle */}
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1e1338] border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.3)] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComp className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    {/* Small sparkles accent icon */}
                    <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-amber-300 opacity-80" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3 font-sans group-hover:text-purple-200 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Action Icon Button */}
                <div className="pt-6 flex justify-end">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-500/30 text-purple-300 group-hover:text-white group-hover:bg-purple-600/30 group-hover:border-purple-400 transition-all duration-300 shadow-md">
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

export default Features;
