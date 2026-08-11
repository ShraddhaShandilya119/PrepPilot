import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Sparkles,
  Flame,
  Target,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [atsScore, setAtsScore] = useState(85);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  // Fetch Live Jobs from Backend API
  useEffect(() => {
    fetchLiveJobs();
  }, []);

  const fetchLiveJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/jobs/matched', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success) {
        setJobs(response.data.jobs || []);
        if (response.data.targetRole) setTargetRole(response.data.targetRole);
        if (response.data.atsScore) setAtsScore(response.data.atsScore);
      }
    } catch (err) {
      console.error('Fetch live jobs error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLiveJobs();
  };

  const toggleBookmark = (id) => {
    if (bookmarkedJobs.includes(id)) {
      setBookmarkedJobs(bookmarkedJobs.filter((jobId) => jobId !== id));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, id]);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-900/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>REAL LIVE JOB MATCHING API</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Live Job Openings Aligned with Your Resume</span>
            <span className="text-2xl">🎯</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real live tech job recommendations matched with your Target Role (<strong className="text-purple-300">{targetRole}</strong>) & ATS Resume Score (<strong className="text-emerald-400">{atsScore}/100</strong>).
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-gray-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-amber-400' : 'text-purple-400'}`} />
            <span>Refresh Jobs</span>
          </button>

          <Link
            to="/select-job-role"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Target className="w-4 h-4 text-white" />
            <span>Change Role ({targetRole})</span>
          </Link>
        </div>
      </div>

      {/* Main Job Cards Container */}
      <div className="space-y-5">
        {loading ? (
          <div className="p-12 text-center rounded-2xl bg-[#131b2e]/60 border border-purple-500/20 text-gray-400 text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
            <span>Fetching live job openings from web API matching {targetRole}...</span>
          </div>
        ) : jobs.length > 0 ? (
          jobs.map((job) => {
            const isBookmarked = bookmarkedJobs.includes(job.id);
            return (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 shadow-[0_10px_30px_rgba(112,26,238,0.08)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.22)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Top Header: Company & Match Score */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-xl object-contain bg-white/10 p-1 ring-2 ring-purple-500/30 shadow-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                        {job.role}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-amber-300 text-xs font-bold shadow-md">
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
                    <span>{job.matchScore}% Match</span>
                  </div>
                </div>

                {/* Details Meta Info */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-300 mb-4 font-medium">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Briefcase className="w-3.5 h-3.5 text-pink-400" />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{job.postedTime}</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {job.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-purple-950/50 border border-purple-500/20 text-purple-300 text-[11px] font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action Buttons Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-purple-900/30">
                  <button
                    onClick={() => toggleBookmark(job.id)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isBookmarked
                        ? 'bg-purple-900/60 border-purple-400 text-amber-400 shadow-md'
                        : 'bg-purple-950/40 border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/50'
                    }`}
                    aria-label="Bookmark Job"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 fill-amber-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 hover:from-purple-300 hover:to-amber-300 shadow-lg shadow-purple-600/25 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Apply Now (Live Site)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#131b2e]/60 border border-purple-500/20">
            <Briefcase className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Jobs Found</h3>
            <p className="text-xs text-gray-400 mt-1">Try refreshing or changing your target job role.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Jobs;
