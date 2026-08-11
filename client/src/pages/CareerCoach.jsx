import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Send,
  Lightbulb,
  Sparkles,
  Crown,
} from 'lucide-react';
import axios from 'axios';
import authApi from '../api/authApi';
import { API_BASE_URL } from '../api/config';

const suggestedQuestions = [
  'How can I crack Amazon SDE?',
  'Roadmap for Full Stack Developer',
  'How to improve ATS Score above 90%?',
  'How to prepare for HR Round?',
  'How to negotiate tech salary?',
  'Best projects for placement?',
];

const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    text: "Hello! 👋 I'm your live AI Career Coach powered by Google Gemini. Ask me anything about tech interview preparation, learning roadmaps, resume ATS optimization, or career growth!",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const CareerCoach = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await authApi.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.user?.targetRole) {
          setTargetRole(res.data.user.targetRole);
        }
      }
    } catch (e) {
      console.error('Error fetching profile in CareerCoach:', e);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/api/chat`,
        { message: messageText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const aiReply = response.data?.reply || 'Sorry, I could not generate a response. Please try again.';

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('AI Chat API Error:', err);
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Sorry, an error occurred while connecting to the AI Coach API. Please ensure you are logged in and try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-purple-900/30"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span>REAL LIVE GEMINI AI CAREER COACH</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>🤖 AI Career Coach</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Get 24/7 real-time AI guidance from Google Gemini for interview preparation, learning roadmaps, and career growth for <strong className="text-purple-300">{targetRole}</strong>.
          </p>
        </div>

        {/* Right Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/30 shadow-lg shrink-0">
          <Crown className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wide">GEMINI AI ACTIVE</span>
        </div>
      </motion.div>

      {/* Main Responsive AI Chat Assistant Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col h-[calc(100vh-230px)] min-h-[480px] max-h-[680px] rounded-3xl bg-[#131b2e]/80 backdrop-blur-xl border border-purple-500/30 shadow-[0_15px_40px_rgba(112,26,238,0.15)] relative overflow-hidden"
      >
        {/* Chat Window Header */}
        <div className="px-6 py-3.5 border-b border-purple-900/30 bg-purple-950/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 border border-purple-400/40 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white font-sans leading-tight">PrepPilot AI Career Assistant</h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Gemini API Connected</span>
              </div>
            </div>
          </div>

          <span className="text-xs text-purple-300 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full font-medium hidden sm:inline-block">
            Google Gemini 2.5 Flash
          </span>
        </div>

        {/* Scrollable Chat Messages Area */}
        <div ref={chatContainerRef} className="flex-1 p-5 md:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-lg shadow-purple-600/20 font-medium'
                    : 'bg-[#0d091a]/95 backdrop-blur-xl border border-purple-500/30 text-gray-200 rounded-bl-none shadow-md whitespace-pre-line font-normal'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-500 mt-1 px-1">{msg.time}</span>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#0d091a]/90 border border-purple-500/30 w-fit text-purple-300 text-xs">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>Google Gemini AI is generating response...</span>
            </div>
          )}
        </div>

        {/* Suggested Questions Chips Bar */}
        <div className="px-6 py-2.5 border-t border-purple-900/30 bg-purple-950/30 shrink-0">
          <p className="text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Suggested Questions</span>
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-medium hover:text-white hover:border-purple-400 hover:bg-purple-900/60 transition-all shrink-0 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Fixed Input Form at Bottom */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3.5 md:p-4 border-t border-purple-900/40 bg-[#07050e]/95 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            placeholder="Ask Google Gemini AI any career question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-purple-950/40 border border-purple-500/30 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
          />

          <button
            type="submit"
            disabled={isTyping}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold text-sm shadow-md shadow-purple-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </motion.div>

    </div>
  );
};

export default CareerCoach;
