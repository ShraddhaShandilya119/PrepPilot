import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  Trash2,
  Search,
  Bot,
  HelpCircle,
  Clock,
  Tag,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const initialBookmarks = [
  {
    _id: '1',
    type: 'ai-answer',
    title: 'What is JWT Authentication & how does it work?',
    content:
      'JSON Web Tokens (JWT) are an open standard (RFC 7519) used for securely transmitting information between client and server as a JSON object. A JWT consists of 3 parts separated by dots: Header, Payload, and Signature. Upon login, the server issues a JWT token which the client stores in localStorage and sends in the Authorization Bearer header on subsequent API requests.',
    source: 'MERN Stack & Security',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    type: 'interview-question',
    title: 'Explain the Virtual DOM in React and how Reconciliation works.',
    content:
      'The Virtual DOM is an in-memory lightweight JavaScript representation of the actual DOM. When component state changes, React creates a new Virtual DOM tree, performs a diffing operation against the previous tree, and batch-updates only the changed real DOM nodes for optimal performance.',
    source: 'Frontend Engineering',
    createdAt: new Date().toISOString(),
  },
];

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:5000/api/bookmarks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data?.success && Array.isArray(response.data.bookmarks)) {
          // If backend has bookmarks, use backend data; otherwise fallback to starter items
          if (response.data.bookmarks.length > 0) {
            setBookmarks(response.data.bookmarks);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching bookmarks from MongoDB:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove Bookmark via API & local state
  const handleRemoveBookmark = async (id) => {
    // Local optimistic update
    setBookmarks((prev) => prev.filter((item) => item._id !== id));

    try {
      const token = localStorage.getItem('token');
      if (token && id && id.length === 24) {
        await axios.delete(`http://localhost:5000/api/bookmarks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error('Error deleting bookmark from MongoDB:', err);
    }
  };

  // Filter Bookmarks based on activeTab & searchQuery
  const filteredBookmarks = bookmarks.filter((item) => {
    const matchesTab =
      activeTab === 'All'
        ? true
        : activeTab === 'AI Answers'
        ? item.type === 'ai-answer'
        : activeTab === 'Interview Questions'
        ? item.type === 'interview-question'
        : item.type === 'resource';

    const matchesSearch =
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.source || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-900/30"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Bookmark className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            <span>MONGODB CONNECTED KNOWLEDGE BASE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>🔖 My Bookmarks</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Save important answers and interview questions for quick revision.
          </p>
        </div>

        {/* Counter Badge Pill */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 shadow-lg shrink-0">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-bold text-white tracking-wide">
            {bookmarks.length} Saved {bookmarks.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>
      </motion.div>

      {/* Control Bar: Filter Tabs & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#131b2e]/80 border border-purple-500/20 w-full sm:w-auto">
          {['All', 'AI Answers', 'Interview Questions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-950/40'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input Box & Refresh */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131b2e]/80 border border-purple-500/20 focus:border-purple-400 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={fetchBookmarks}
            className="p-2.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white transition-colors cursor-pointer"
            title="Refresh Bookmarks"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      {/* Bookmarks Grid / Empty State */}
      <AnimatePresence mode="wait">
        {filteredBookmarks.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredBookmarks.map((item) => {
              const isAiAnswer = item.type === 'ai-answer' || item.type === 'AI Answer';
              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-3xl bg-[#131b2e]/70 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 shadow-lg hover:shadow-purple-950/40 transition-all duration-300 flex flex-col justify-between group space-y-4"
                >
                  {/* Card Top Row: Type Badge & Category */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                          isAiAnswer
                            ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {isAiAnswer ? (
                          <Bot className="w-3.5 h-3.5" />
                        ) : (
                          <HelpCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{isAiAnswer ? 'AI Answer' : 'Interview Question'}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-400 bg-purple-950/40 px-2.5 py-0.5 rounded-lg border border-purple-500/20">
                        <Tag className="w-3 h-3 text-purple-400" />
                        <span>{item.source || 'General'}</span>
                      </span>
                    </div>

                    {/* Title / Question */}
                    <h3 className="text-base md:text-lg font-bold text-white leading-snug group-hover:text-purple-300 transition-colors font-sans mb-2">
                      {item.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-xs text-gray-300 leading-relaxed font-normal line-clamp-3 whitespace-pre-line bg-purple-950/30 p-3 rounded-2xl border border-purple-500/10">
                      {item.content}
                    </p>
                  </div>

                  {/* Card Footer: Date & Action Buttons */}
                  <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>Saved: {new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Bookmark Saved Indicator */}
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-xl">
                        <Bookmark className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
                        <span>Saved</span>
                      </span>

                      {/* Delete / Remove Button */}
                      <button
                        onClick={() => handleRemoveBookmark(item._id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/80 border border-red-500/30 px-3 py-1 rounded-xl transition-all duration-200 cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-12 rounded-3xl bg-[#131b2e]/60 border border-purple-500/20 text-center space-y-4 max-w-lg mx-auto my-8 shadow-xl"
          >
            <div className="w-16 h-16 rounded-3xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400 shadow-inner">
              <Bookmark className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-sans">No bookmarks yet</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Save important AI answers or interview questions to see them here.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              {activeTab !== 'All' || searchQuery !== '' ? (
                <button
                  onClick={() => {
                    setActiveTab('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              ) : (
                <Link
                  to="/coach"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <span>Explore AI Career Coach</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Bookmarks;
