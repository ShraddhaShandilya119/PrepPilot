import React, { useState, useEffect, useRef } from 'react';
import { Star, GraduationCap, Mic, TrendingUp, Bot } from 'lucide-react';

// Smooth Animated Counter Component
const AnimatedCounter = ({ target, decimals = 0, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Smooth easeOutCubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * target);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [isVisible, target]);

  return (
    <span ref={counterRef}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const statsData = [
    {
      id: 1,
      icon: Star,
      target: 4.9,
      decimals: 1,
      suffix: '/5',
      label: 'Overall Rating',
      iconColor: 'text-amber-400',
      glowBg: 'bg-amber-500/10 border-amber-500/30 shadow-amber-500/20',
      badgeGradient: 'from-amber-400 to-yellow-500',
    },
    {
      id: 2,
      icon: GraduationCap,
      target: 10,
      decimals: 0,
      suffix: 'K+',
      label: 'Active Students',
      iconColor: 'text-purple-400',
      glowBg: 'bg-purple-500/10 border-purple-500/30 shadow-purple-500/20',
      badgeGradient: 'from-purple-400 to-indigo-400',
    },
    {
      id: 3,
      icon: Mic,
      target: 500,
      decimals: 0,
      suffix: '+',
      label: 'Mock Interviews',
      iconColor: 'text-pink-400',
      glowBg: 'bg-pink-500/10 border-pink-500/30 shadow-pink-500/20',
      badgeGradient: 'from-pink-400 to-rose-400',
    },
    {
      id: 4,
      icon: TrendingUp,
      target: 98,
      decimals: 0,
      suffix: '%',
      label: 'Success Rate',
      iconColor: 'text-emerald-400',
      glowBg: 'bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/20',
      badgeGradient: 'from-emerald-400 to-teal-400',
    },
    {
      id: 5,
      icon: Bot,
      target: 24,
      decimals: 0,
      suffix: '/7',
      label: 'AI Support',
      iconColor: 'text-cyan-400',
      glowBg: 'bg-cyan-500/10 border-cyan-500/30 shadow-cyan-500/20',
      badgeGradient: 'from-cyan-400 to-blue-400',
    },
  ];

  return (
    <section className="relative py-12 md:py-16 bg-[#0B1120] overflow-hidden border-y border-purple-900/20">
      {/* Subtle background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating neon accent dots */}
      <div className="absolute top-6 left-12 w-2 h-2 rounded-full bg-purple-400 blur-[1px] animate-ping opacity-75" />
      <div className="absolute bottom-6 right-16 w-2 h-2 rounded-full bg-amber-400 blur-[1px] animate-pulse opacity-75" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="group relative flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 shadow-[0_10px_30px_rgba(112,26,238,0.1)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.22)] transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Background Card Subtle Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Glowing Modern Icon Badge */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl ${stat.glowBg} border shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                </div>

                {/* Animated Count-up Number */}
                <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1 font-sans">
                  <span className={`bg-gradient-to-r ${stat.badgeGradient} bg-clip-text text-transparent`}>
                    <AnimatedCounter
                      target={stat.target}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </span>
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm font-semibold tracking-wider text-gray-400 uppercase font-sans">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
