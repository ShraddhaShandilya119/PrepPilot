import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  History as HistoryIcon,
  ArrowLeft,
  FileText,
  Mic,
  Calendar,
  Award,
  CheckCircle2,
  Search,
  ExternalLink,
  Sparkles,
  Target,
  Loader2,
  Trash2,
  Eye,
  Play,
  RotateCcw,
} from 'lucide-react';
import axios from 'axios';
import authApi from '../api/authApi';
import { API_BASE_URL } from '../api/config';

const mockInterviewsData = [
  {
    id: 'int-1',
    role: 'Full Stack Developer',
    score: 88,
    totalQuestions: 10,
    completedAt: '2 hours ago',
    type: 'AI Technical Round',
    feedback: 'Strong technical knowledge in React & Node.js. Improve system design metrics.',
  },
  {
    id: 'int-2',
    role: 'Frontend Developer',
    score: 92,
    totalQuestions: 10,
    completedAt: 'Yesterday',
    type: 'Conceptual & UI Round',
    feedback: 'Excellent explanation of React Virtual DOM & State reconciliation.',
  },
  {
    id: 'int-3',
    role: 'Full Stack Developer',
    score: 84,
    totalQuestions: 10,
    completedAt: '3 days ago',
    type: 'Backend & REST API Round',
    feedback: 'Good understanding of Express middleware and MongoDB aggregation.',
  },
];

const History = () => {
  const navigate = useNavigate();

  // State Management
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'interviews' | 'resumes'
  const [targetRole, setTargetRole] = useState('');
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch logged-in user profile & resume history from backend
  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      // 1. Fetch User Profile for targetRole
      try {
        const profileRes = await authApi.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (profileRes.data?.user?.targetRole) {
          setTargetRole(profileRes.data.user.targetRole);
        }
      } catch (pErr) {
        console.error('Profile fetch error in history:', pErr);
      }

      // 2. Fetch User Resume History
      try {
        const resumeRes = await axios.get(`${API_BASE_URL}/api/resume/my-resumes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resumeRes.data?.resumes) {
          setResumes(resumeRes.data.resumes);
        }
      } catch (rErr) {
        console.error('Resumes fetch error in history:', rErr);
      }
    } catch (err) {
      console.error('Fetch history error:', err);
    } finally {
      setLoading(false);
    }
  };

  const latestAtsScore = resumes.length > 0 ? (resumes[0].analysis?.atsScore || resumes[0].atsScore || 85) : 85;
  const currentRole = targetRole || 'Full Stack Developer';

  // Filtered Interviews
  const filteredInterviews = mockInterviewsData.filter(
    (item) =>
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered Resumes
  const filteredResumes = resumes.filter(
    (item) =>
      item.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.fileName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07050e] text-white p-6 md:p-10 font-sans relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors bg-[#131b2e]/80 px-4 py-2 rounded-xl border border-purple-500/30 shadow-md backdrop-blur-xl mb-4"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              <span>Back to Dashboard</span>
            </Link>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <HistoryIcon className="w-8 h-8 text-pink-400" />
              <span>Interview & Activity History</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Track your past AI mock interviews, resume ATS evaluations, and career progress.
            </p>
          </div>

          <button
            onClick={() => navigate('/interview')}
            className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 hover:from-purple-300 hover:to-amber-300 transition-all duration-300 shadow-lg shadow-purple-600/25 hover:scale-105 inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Start New Interview</span>
          </button>
        </div>

        {/* 4 Summary Stats Header Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-5 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold block">Total Sessions</span>
                <span className="text-xl font-extrabold text-white">{mockInterviewsData.length} Completed</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold block">Average Score</span>
                <span className="text-xl font-extrabold text-emerald-400">88%</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold block">Latest ATS Score</span>
                <span className="text-xl font-extrabold text-amber-400">{latestAtsScore}/100</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold block">Target Career Role</span>
                <span className="text-sm font-extrabold text-purple-300 truncate max-w-[140px] block">
                  {currentRole}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Tab Selector & Search Bar Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 rounded-2xl bg-[#131b2e]/70 border border-purple-500/20 shadow-lg">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-purple-950/60 p-1.5 rounded-xl border border-purple-500/30">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'interviews'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Mock Interviews ({filteredInterviews.length})
            </button>
            <button
              onClick={() => setActiveTab('resumes')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'resumes'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Resume Uploads ({resumes.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex items-center bg-purple-950/40 border border-purple-500/30 focus-within:border-purple-400 rounded-xl px-3 py-2 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none px-2"
            />
          </div>

        </div>

        {/* TAB CONTENTS */}

        {/* 1. MOCK INTERVIEWS TAB OR COMBINED ALL TAB */}
        {(activeTab === 'all' || activeTab === 'interviews') && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Mic className="w-4 h-4 text-purple-400" />
              <span>AI Mock Interview Sessions</span>
            </h3>

            <div className="space-y-4">
              {filteredInterviews.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 shadow-md">
                      <Mic className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-white">{item.role} Interview</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[10px] font-semibold">
                          {item.type}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          {item.completedAt}
                        </span>
                        <span>•</span>
                        <span>{item.totalQuestions} Questions Completed</span>
                      </p>

                      <p className="text-xs text-gray-300 italic pt-1">
                        "{item.feedback}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-purple-900/30">
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-gray-400 block uppercase">AI Rating</span>
                      <span className="text-lg font-extrabold text-amber-400">{item.score}/100</span>
                    </div>

                    <button
                      onClick={() => navigate('/interview')}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. RESUME UPLOADS TAB OR COMBINED ALL TAB */}
        {(activeTab === 'all' || activeTab === 'resumes') && (
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Uploaded PDF Resumes & ATS Reports</span>
            </h3>

            {loading ? (
              <div className="p-8 text-center rounded-2xl bg-[#131b2e]/60 border border-purple-500/20 text-gray-400 text-xs flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                <span>Loading resume history from database...</span>
              </div>
            ) : filteredResumes.length > 0 ? (
              <div className="space-y-4">
                {filteredResumes.map((resItem) => {
                  const score = resItem.analysis?.atsScore || resItem.atsScore || 85;
                  const dateStr = resItem.createdAt
                    ? new Date(resItem.createdAt).toLocaleDateString()
                    : 'Recent';

                  return (
                    <div
                      key={resItem._id}
                      className="p-6 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
                          <FileText className="w-6 h-6" />
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white">{resItem.originalName}</h4>
                          <p className="text-xs text-gray-400 flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-500" />
                              {dateStr}
                            </span>
                            <span>•</span>
                            <span>PDF Document</span>
                          </p>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
                            Gemini AI Analyzed
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-purple-900/30">
                        <div className="text-right">
                          <span className="text-[10px] font-semibold text-gray-400 block uppercase">ATS Score</span>
                          <span className="text-lg font-extrabold text-emerald-400">{score}/100</span>
                        </div>

                        <button
                          onClick={() => navigate('/resume')}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Report</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-[#131b2e]/60 border border-purple-500/20 text-gray-400 text-xs">
                No uploaded resumes found in database. Upload a resume on the Resume page!
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default History;
