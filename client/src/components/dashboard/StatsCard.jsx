import React from 'react';
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: IconComponent,
  iconColor = 'text-purple-400',
  glowBg = 'bg-purple-500/15 border-purple-500/30',
  trend,
  buttonText,
  onClick,
}) => {
  return (
    <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 shadow-[0_10px_30px_rgba(112,26,238,0.1)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.22)] transition-all duration-300 hover:scale-[1.02] overflow-hidden min-h-[170px]">
      {/* Background Subtle Hover Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top Row: Icon Badge & Title */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-300 font-sans tracking-wide">
          {title}
        </span>
        {IconComponent && (
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-xl ${glowBg} border shadow-md transition-transform duration-300 group-hover:scale-110`}
          >
            <IconComponent className={`w-5 h-5 ${iconColor}`} />
          </div>
        )}
      </div>

      {/* Center: Large Value */}
      <div className="my-1">
        <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans">
          {value}
        </h3>
      </div>

      {/* Bottom Row: Subtitle, Trend & Optional Action Button */}
      <div className="mt-3 flex items-center justify-between pt-3 border-t border-purple-900/20 gap-2">
        <div className="flex flex-col">
          {subtitle && (
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-0.5">
              {trend.isUp ? (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span
                className={`text-xs font-semibold ${
                  trend.isUp ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {trend.text}
              </span>
            </div>
          )}
        </div>

        {/* Optional Action Button */}
        {buttonText && (
          <button
            onClick={onClick}
            className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/30 px-3 py-1.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] shrink-0"
          >
            <span>{buttonText}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
