import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Award, BarChart2, Calendar } from 'lucide-react';

const DATA_SETS = {
  'Last 7 Days': [
    { day: 'Mon', score: 68 },
    { day: 'Tue', score: 75 },
    { day: 'Wed', score: 82 },
    { day: 'Thu', score: 78 },
    { day: 'Fri', score: 88 },
    { day: 'Sat', score: 92 },
    { day: 'Sun', score: 96 },
  ],
  'This Month': [
    { day: 'Week 1', score: 72 },
    { day: 'Week 2', score: 79 },
    { day: 'Week 3', score: 86 },
    { day: 'Week 4', score: 94 },
  ],
  'Last 30 Days': [
    { day: 'Day 1', score: 65 },
    { day: 'Day 7', score: 74 },
    { day: 'Day 14', score: 81 },
    { day: 'Day 21', score: 88 },
    { day: 'Day 30', score: 95 },
  ],
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-xl bg-[#0d091a]/95 backdrop-blur-2xl border border-purple-500/30 shadow-2xl animate-in zoom-in duration-150">
        <p className="text-xs font-semibold text-gray-400">{label}</p>
        <p className="text-sm font-bold text-white mt-0.5 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
          Score: <span className="text-amber-400 font-extrabold">{payload[0].value}/100</span>
        </p>
      </div>
    );
  }
  return null;
};

const ProgressChart = ({
  title = 'Interview Progress',
}) => {
  const [timeRange, setTimeRange] = useState('Last 7 Days');

  const activeData = DATA_SETS[timeRange] || DATA_SETS['Last 7 Days'];

  // Dynamic calculations
  const totalScore = activeData.reduce((acc, curr) => acc + curr.score, 0);
  const avgScore = Math.round(totalScore / activeData.length);
  const highestScore = Math.max(...activeData.map((d) => d.score));
  const gain = activeData[activeData.length - 1].score - activeData[0].score;
  const weeklyImprovement = `${gain >= 0 ? '+' : ''}${gain}%`;

  return (
    <div className="p-6 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 shadow-[0_10px_30px_rgba(112,26,238,0.1)] transition-all duration-300 flex flex-col justify-between select-none">
      
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-900/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shadow-md">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-sans">{title}</h3>
            <p className="text-xs text-purple-400 font-medium">{timeRange}</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-1.5 bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-500/30 text-xs shadow-inner">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent text-gray-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="Last 7 Days" className="bg-[#0b1120] text-white">Last 7 Days</option>
            <option value="This Month" className="bg-[#0b1120] text-white">This Month</option>
            <option value="Last 30 Days" className="bg-[#0b1120] text-white">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full h-64 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.5} />
                <stop offset="50%" stopColor="#ec4899" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#2a2245" vertical={false} />

            <XAxis
              dataKey="day"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            
            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#c084fc"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#purpleGradient)"
              activeDot={{ r: 7, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Section: Dynamic Stats Cards */}
      <div className="grid grid-cols-3 gap-3 pt-5 mt-4 border-t border-purple-900/30">
        
        {/* Average Score */}
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
            <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Avg Score</span>
          </div>
          <p className="text-base font-extrabold text-white">{avgScore}%</p>
        </div>

        {/* Highest Score */}
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Highest Score</span>
          </div>
          <p className="text-base font-extrabold text-white">{highestScore}%</p>
        </div>

        {/* Weekly Improvement */}
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gain</span>
          </div>
          <p className="text-base font-extrabold text-emerald-400">{weeklyImprovement}</p>
        </div>

      </div>

    </div>
  );
};

export default ProgressChart;
