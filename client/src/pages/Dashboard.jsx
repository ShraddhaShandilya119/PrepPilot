import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Mic,
  Award,
  Star,
  Calendar,
  Play,
  CheckCircle2,
  Target,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import axios from 'axios';
import authApi from '../api/authApi';
import StatsCard from '../components/dashboard/StatsCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  const navigate = useNavigate();
  const [targetRole, setTargetRole] = useState('');
  const [resumeScore, setResumeScore] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Fetch logged-in user profile & resume data on Dashboard load
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoadingProfile(false);
        return;
      }

      // 1. Fetch User Target Role from Profile API
      const profileRes = await authApi.get('/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (profileRes.data?.user?.targetRole) {
        setTargetRole(profileRes.data.user.targetRole);
      }

      // 2. Fetch User Latest Resume ATS Score
      try {
        const resumeRes = await axios.get('http://localhost:5000/api/resume/my-resumes', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resumeRes.data?.resumes && resumeRes.data.resumes.length > 0) {
          const latestResume = resumeRes.data.resumes[0];
          const score = latestResume.analysis?.atsScore || latestResume.atsScore;
          if (score) {
            setResumeScore(score);
          }
        }
      } catch (resumeErr) {
        console.error('Fetch resume score error:', resumeErr);
      }
    } catch (err) {
      console.error('Fetch dashboard profile error:', err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const activeRoleName = targetRole || 'Full Stack Developer';

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Target Job Role Header Banner Card */}
      <div className="p-6 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Target className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block">Target Job Role</span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mt-0.5">
              <span>🎯</span>
              {loadingProfile ? (
                <span className="inline-flex items-center gap-2 text-sm font-normal text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                  Loading target role...
                </span>
              ) : (
                <span>{targetRole ? targetRole : 'Select your target role'}</span>
              )}
            </h3>
          </div>
        </div>

        <Link
          to="/select-job-role"
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-purple-300 hover:text-white bg-purple-950/60 hover:bg-purple-600/40 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-md"
        >
          <span>Change Role</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4-Card Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Resume Score"
          value={resumeScore ? `${resumeScore}/100` : '85/100'}
          subtitle={resumeScore ? "Live ATS Score" : "Great Job! Your resume is strong."}
          icon={FileText}
          iconColor="text-purple-400"
          glowBg="bg-purple-500/15 border-purple-500/30"
          buttonText="Improve Now"
          onClick={() => navigate('/resume')}
        />

        <StatsCard
          title="Mock Interviews"
          value="24"
          subtitle="Completed"
          icon={Mic}
          iconColor="text-pink-400"
          glowBg="bg-pink-500/15 border-pink-500/30"
          trend={{ text: "12 this month", isUp: true }}
        />

        <StatsCard
          title="Success Rate"
          value="92%"
          subtitle="Outstanding"
          icon={Award}
          iconColor="text-emerald-400"
          glowBg="bg-emerald-500/15 border-emerald-500/30"
          trend={{ text: "8% this month", isUp: true }}
        />

        <StatsCard
          title="Average Score"
          value="4.6"
          subtitle="Out of 5"
          icon={Star}
          iconColor="text-amber-400"
          glowBg="bg-amber-500/15 border-amber-500/30"
          trend={{ text: "0.6 this month", isUp: true }}
        />
      </div>

      {/* Main Content Grid: Chart + Upcoming Interview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2-Columns: Dynamic Progress Chart */}
        <div className="lg:col-span-2">
          <ProgressChart
            title="Interview Progress"
            subtitle="Last 7 Days"
            avgScore={86}
            highestScore={96}
            weeklyImprovement="+14%"
          />
        </div>

        {/* Right 1-Column: Upcoming Interview & Recent Activity */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* Dynamic Upcoming Interview Card */}
          <div className="p-6 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-purple-400 font-semibold text-sm mb-4">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Upcoming Interview</span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>🎯</span>
                    <span>{activeRoleName}</span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">PrepPilot AI Simulation</p>
                </div>
                <div className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-center">
                  <span className="text-xs font-bold text-amber-400 block">TODAY</span>
                  <span className="text-[10px] text-gray-400 block">Live Session</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="px-2.5 py-1 rounded-md bg-purple-950/40 text-[11px] font-medium text-purple-300 border border-purple-500/20">
                  AI Technical Round
                </span>
                <span className="px-2.5 py-1 rounded-md bg-purple-950/40 text-[11px] font-medium text-gray-400 border border-purple-500/20">
                  10 Questions
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/interview')}
              className="w-full mt-6 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Preparation</span>
            </button>
          </div>

          {/* Dynamic Recent Activity Card */}
          <div className="p-6 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white">Recent Activity</h4>
              <Link to="/history" className="text-xs text-purple-400 hover:underline font-semibold">View All</Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/10">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Mic className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">Completed Mock Interview</p>
                  <p className="text-[10px] text-gray-400">{activeRoleName} Interview</p>
                </div>
                <span className="text-[10px] text-gray-500">2h ago</span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-500/30 border border-purple-500/10">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">Resume Analyzed</p>
                  <p className="text-[10px] text-gray-400">
                    {resumeScore ? `Score: ${resumeScore}/100` : 'Score improved to 85/100'}
                  </p>
                </div>
                <span className="text-[10px] text-gray-500">5h ago</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Reusable Quick Actions Section */}
      <div className="pt-2">
        <QuickActions />
      </div>

    </div>
  );
};

export default Dashboard;