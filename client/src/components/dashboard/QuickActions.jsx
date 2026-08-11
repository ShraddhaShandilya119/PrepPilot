import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Mic,
  Briefcase,
  Bot,
  BookOpen,
  BarChart3,
  ArrowRight,
  Zap,
} from 'lucide-react';

const defaultActions = [
  {
    id: 'resume',
    title: 'Resume Analyzer',
    description: 'Analyze your ATS score',
    icon: FileText,
    path: '/resume',
    iconColor: 'text-purple-400',
    glowBg: 'bg-purple-500/15 border-purple-500/30',
  },
  {
    id: 'interview',
    title: 'Mock Interview',
    description: 'Practice with AI',
    icon: Mic,
    path: '/interview',
    iconColor: 'text-pink-400',
    glowBg: 'bg-pink-500/15 border-pink-500/30',
  },
  {
    id: 'jobs',
    title: 'Job Recommendations',
    description: 'Find matching jobs',
    icon: Briefcase,
    path: '/jobs',
    iconColor: 'text-amber-400',
    glowBg: 'bg-amber-500/15 border-amber-500/30',
  },
  {
    id: 'coach',
    title: 'AI Career Coach',
    description: 'Career guidance',
    icon: Bot,
    path: '/coach',
    iconColor: 'text-cyan-400',
    glowBg: 'bg-cyan-500/15 border-cyan-500/30',
  },
  {
    id: 'questions',
    title: 'Interview Questions',
    description: 'Practice questions',
    icon: BookOpen,
    path: '/history',
    iconColor: 'text-emerald-400',
    glowBg: 'bg-emerald-500/15 border-emerald-500/30',
  },
  {
    id: 'analytics',
    title: 'Performance Analytics',
    description: 'Track your growth',
    icon: BarChart3,
    path: '/history',
    iconColor: 'text-indigo-400',
    glowBg: 'bg-indigo-500/15 border-indigo-500/30',
  },
];

const QuickActions = ({
  title = 'Quick Actions',
  actions = defaultActions,
}) => {
  return (
    <div className="space-y-4">
      {/* Title Header */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-amber-400">
          <Zap className="w-4 h-4" />
        </div>
        <h3 className="text-xl font-bold text-white font-sans">{title}</h3>
      </div>

      {/* 6 Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={action.id || action.title}
              to={action.path}
              className="p-5 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 shadow-[0_8px_25px_rgba(112,26,238,0.08)] hover:shadow-[0_12px_35px_rgba(168,85,247,0.22)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 group flex items-center justify-between relative overflow-hidden"
            >
              {/* Card Ambient Glow Accent */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex items-center gap-4 relative z-10">
                {/* Icon Badge */}
                <div
                  className={`p-3.5 rounded-xl ${action.glowBg} border shadow-md transition-transform duration-300 group-hover:scale-110 shrink-0`}
                >
                  <IconComponent className={`w-5 h-5 ${action.iconColor}`} />
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors font-sans">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 font-normal">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* Right Arrow Icon */}
              <div className="p-2 rounded-xl text-gray-500 group-hover:text-purple-300 group-hover:bg-purple-950/50 transition-all duration-300 relative z-10 shrink-0">
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
