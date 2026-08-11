import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mic,
  ArrowLeft,
  Play,
  Sparkles,
  Loader2,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Target,
  Send,
  Award,
  Bot,
  AlertCircle,
  Eye,
  EyeOff,
  Bookmark,
  Check,
} from 'lucide-react';
import axios from 'axios';
import authApi from '../api/authApi';

const Interview = () => {
  const navigate = useNavigate();

  // State Management
  const [targetRole, setTargetRole] = useState('');
  const [loadingRole, setLoadingRole] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState({});
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch logged-in user profile to check targetRole
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoadingRole(false);
        return;
      }

      const response = await authApi.get('/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.user?.targetRole) {
        setTargetRole(response.data.user.targetRole);
      }
    } catch (err) {
      console.error('Fetch profile error:', err);
    } finally {
      setLoadingRole(false);
    }
  };

  // Start AI Interview & Call Backend API
  const handleStartInterview = async () => {
    if (!targetRole) {
      navigate('/select-job-role');
      return;
    }

    setGenerating(true);
    setErrorMsg('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/interview/generate',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.success && response.data?.questions) {
        setQuestions(response.data.questions);
        setSessionStarted(true);
        setCurrentIndex(0);
        setUserAnswers({});
        setShowAnswers({});
        setBookmarkedQuestions({});
      } else {
        setErrorMsg('Failed to generate interview questions.');
      }
    } catch (err) {
      console.error('Start interview error:', err);
      setErrorMsg(
        err.response?.data?.message || 'Failed to generate interview questions. Please try again.'
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleAnswerChange = (text) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: text,
    }));
  };

  const toggleShowAnswer = (index) => {
    setShowAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Bookmark specific question to MongoDB Atlas API
  const handleBookmarkQuestion = async (index) => {
    const q = questions[index];
    if (!q) return;

    const isCurrentlyBookmarked = !!bookmarkedQuestions[index];

    // Toggle local state
    setBookmarkedQuestions((prev) => ({
      ...prev,
      [index]: !isCurrentlyBookmarked,
    }));

    // If not bookmarked yet, save to backend MongoDB API
    if (!isCurrentlyBookmarked) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await axios.post(
            'http://localhost:5000/api/bookmarks',
            {
              type: 'interview-question',
              title: q.question,
              content: q.answer || `Interview Question for ${targetRole}`,
              source: targetRole || 'Mock Interview',
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
      } catch (err) {
        console.error('Error saving bookmark to MongoDB:', err);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setSessionStarted(false);
    setSessionCompleted(false);
    setQuestions([]);
    setCurrentIndex(0);
    setUserAnswers({});
    setShowAnswers({});
    setBookmarkedQuestions({});
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-[#07050e] text-white p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors bg-[#131b2e]/80 px-4 py-2.5 rounded-xl border border-purple-500/30 shadow-md backdrop-blur-xl"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Back to Dashboard</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Bot className="w-4 h-4 text-purple-400" />
            Gemini AI Interview Simulation
          </span>
        </div>

        {/* Error Toast Banner */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-semibold flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => navigate('/select-job-role')}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs rounded-lg underline cursor-pointer"
            >
              Select Role
            </button>
          </div>
        )}

        {/* CASE 1: LOBBY SCREEN (Before starting session) */}
        {!sessionStarted && !sessionCompleted && (
          <div className="p-8 md:p-12 rounded-3xl bg-[#131b2e]/80 backdrop-blur-xl border border-purple-500/30 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-600 border border-purple-400/40 flex items-center justify-center text-white mx-auto shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <Mic className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                AI Technical Mock Interview Room
              </h1>
              <p className="text-sm text-gray-400">
                Experience real-time AI interview simulations powered by Google Gemini AI tailored to your target job role.
              </p>
            </div>

            {/* Target Role Status Card */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Target className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">Target Job Role</span>
                  <span className="text-sm font-bold text-white">
                    {loadingRole ? (
                      <Loader2 className="w-4 h-4 animate-spin text-purple-400 inline" />
                    ) : (
                      targetRole || 'No role selected yet'
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/select-job-role')}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 hover:underline cursor-pointer"
              >
                Change Role →
              </button>
            </div>

            {/* Start Button */}
            <div className="pt-4">
              <button
                onClick={handleStartInterview}
                disabled={generating || loadingRole}
                className="px-10 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 hover:from-purple-300 hover:via-pink-300 hover:to-amber-300 rounded-2xl shadow-[0_4px_25px_rgba(236,72,153,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>Generating 10 AI Questions...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-slate-950" />
                    <span>Begin Interview Session</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* CASE 2: ACTIVE INTERVIEW SESSION ROOM */}
        {sessionStarted && !sessionCompleted && currentQuestion && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Session Top Bar: Progress & Role Badge */}
            <div className="p-4 rounded-2xl bg-[#131b2e]/80 border border-purple-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-xs text-gray-400 hidden sm:inline">
                  Target Role: <strong className="text-white">{targetRole}</strong>
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-32 sm:w-48 bg-purple-950 rounded-full h-2 overflow-hidden border border-purple-500/20">
                <div
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#131b2e]/90 border border-purple-500/30 shadow-2xl space-y-6">
              
              {/* Question Header & Bookmark Action Button */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Technical & Conceptual Question
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white leading-snug">
                    {currentQuestion.question}
                  </h2>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => handleBookmarkQuestion(currentIndex)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 border shrink-0 cursor-pointer ${
                    bookmarkedQuestions[currentIndex]
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30'
                      : 'bg-purple-950/60 text-purple-300 hover:text-white hover:bg-purple-900/60 border-purple-500/30'
                  }`}
                  title="Save Question to Bookmarks"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedQuestions[currentIndex] ? 'fill-white' : ''}`} />
                  <span>{bookmarkedQuestions[currentIndex] ? 'Bookmarked ✨' : 'Bookmark Question'}</span>
                </button>
              </div>

              {/* Candidate Answer Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 flex items-center justify-between">
                  <span>Your Answer:</span>
                  <span className="text-gray-500 font-normal">
                    {(userAnswers[currentIndex] || '').length} characters
                  </span>
                </label>
                <textarea
                  rows={5}
                  value={userAnswers[currentIndex] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Type your detailed answer here... (e.g. Explain core concepts, practical examples, or step-by-step logic)"
                  className="w-full p-4 rounded-2xl bg-[#07050e]/80 border border-purple-500/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 resize-none font-sans"
                />
              </div>

              {/* Toggle Ideal Reference Answer */}
              <div className="pt-2">
                <button
                  onClick={() => toggleShowAnswer(currentIndex)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {showAnswers[currentIndex] ? (
                    <>
                      <EyeOff className="w-4 h-4 text-purple-400" />
                      <span>Hide Ideal Answer</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Show Ideal Gemini AI Answer 💡</span>
                    </>
                  )}
                </button>

                {showAnswers[currentIndex] && (
                  <div className="mt-4 p-5 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-2 animate-in fade-in duration-300">
                    <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      Ideal Reference Answer (Google Gemini AI)
                    </h4>
                    <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-medium">
                      {currentQuestion.answer}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Controls Bar */}
              <div className="pt-6 border-t border-purple-900/40 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-300 bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  className="px-7 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 hover:from-purple-300 hover:via-pink-300 hover:to-amber-300 transition-all duration-300 shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105"
                >
                  <span>{currentIndex === questions.length - 1 ? 'Finish Session 🎉' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* CASE 3: SESSION COMPLETED SUMMARY */}
        {sessionCompleted && (
          <div className="p-8 md:p-12 rounded-3xl bg-[#131b2e]/90 border border-purple-500/30 text-center space-y-6 shadow-2xl animate-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(10,185,129,0.3)]">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Interview Session Completed! 🎉
              </h2>
              <p className="text-sm text-gray-400">
                Great job completing your 10-question AI technical simulation for <strong className="text-purple-300">{targetRole}</strong>.
              </p>
            </div>

            {/* Answer Stats Card */}
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-3">
              <div className="flex justify-between text-xs text-gray-300 font-medium">
                <span>Total Questions:</span>
                <strong className="text-white font-bold">{questions.length}</strong>
              </div>
              <div className="flex justify-between text-xs text-gray-300 font-medium">
                <span>Questions Answered:</span>
                <strong className="text-emerald-400 font-bold">
                  {Object.keys(userAnswers).filter((k) => userAnswers[k]?.trim() !== '').length} / {questions.length}
                </strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleRestart}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-purple-600/80 hover:bg-purple-500 border border-purple-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start New Interview</span>
              </button>

              <Link
                to="/bookmarks"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-pink-400 hover:from-amber-300 hover:to-pink-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Bookmark className="w-4 h-4 fill-slate-950" />
                <span>View Bookmarked Questions</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Interview;
