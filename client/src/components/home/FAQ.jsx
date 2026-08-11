import React, { useState } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: 'Is PrepPilot AI free to use?',
    answer:
      'Yes! PrepPilot AI offers a free Starter plan that includes 1 full AI mock interview per month, basic ATS resume analysis, and access to our core question bank. You can upgrade to Pro anytime for unlimited access.',
  },
  {
    id: 2,
    question: 'How does AI Resume Analysis work?',
    answer:
      'Our advanced AI parses your resume to evaluate ATS compatibility score, keyword density, and formatting. It compares your resume against target job descriptions to give actionable feedback.',
  },
  {
    id: 3,
    question: 'Can I upload multiple resumes?',
    answer:
      'Yes, Pro and Enterprise users can upload, manage, and analyze multiple tailored resumes for different job roles, tech stacks, or target companies.',
  },
  {
    id: 4,
    question: 'Are mock interviews AI-generated?',
    answer:
      'Yes! Questions are generated in real-time by AI models trained on real industry interviews, customized to your specific job role, experience level, and tech domain.',
  },
  {
    id: 5,
    question: 'Is my resume data secure?',
    answer:
      'Your privacy is our priority. All uploaded resumes and user data are encrypted in transit and at rest using enterprise-grade AES-256 encryption. We never share your data with third parties.',
  },
  {
    id: 6,
    question: 'Which file formats are supported?',
    answer:
      'PrepPilot AI supports PDF, DOCX, and TXT file formats for resume upload (up to 10MB file size).',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="relative py-20 md:py-32 bg-[#0B1120] overflow-hidden border-t border-purple-900/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating neon accent particles */}
      <div className="absolute top-12 right-16 w-2 h-2 rounded-full bg-purple-400 blur-[1px] animate-ping opacity-75" />
      <div className="absolute bottom-16 left-20 w-2 h-2 rounded-full bg-amber-400 blur-[1px] animate-pulse opacity-75" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-20">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase shadow-lg shadow-purple-950/40">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-base sm:text-lg max-w-xl font-normal">
            Everything you need to know about PrepPilot AI.
          </p>

          {/* Dual Pill Underline Indicator */}
          <div className="flex items-center gap-1.5 pt-2">
            <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_#a855f7]" />
            <div className="w-2 h-1 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
          </div>

        </div>

        {/* 6 Glassmorphism Accordion Cards */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.id}
                className={`rounded-[24px] transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? 'bg-[#15102a]/80 border-purple-500/50 shadow-[0_10px_35px_rgba(168,85,247,0.2)]'
                    : 'bg-[#131b2e]/60 border-purple-500/20 hover:border-purple-500/40 shadow-[0_5px_20px_rgba(112,26,238,0.08)]'
                }`}
              >
                {/* Accordion Header / Question */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 md:p-7 text-left focus:outline-none group"
                >
                  <span className="text-lg md:text-xl font-bold text-white font-sans group-hover:text-purple-200 transition-colors pr-4">
                    {item.question}
                  </span>

                  {/* Plus / Minus Icon Badge */}
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 shrink-0 ${
                      isOpen
                        ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_12px_#a855f7]'
                        : 'bg-purple-950/40 border-purple-500/30 text-purple-300 group-hover:border-purple-400'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Accordion Body / Answer */}
                {isOpen && (
                  <div className="px-6 pb-7 md:px-7 pt-0 text-gray-300 text-base leading-relaxed font-normal border-t border-purple-900/30 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
