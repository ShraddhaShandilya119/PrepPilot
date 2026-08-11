import React, { useState, useEffect, useRef } from 'react';
import { Star, Heart, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Software Engineer',
    company: 'TCS',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    quote:
      'PrepPilot AI completely changed my interview preparation. The AI feedback helped me improve my confidence and I finally cracked my dream job.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Frontend Developer',
    company: 'Infosys',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    quote:
      'The mock interviews felt incredibly realistic. The resume analyzer pointed out mistakes I never noticed before.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Aisha Khan',
    role: 'Data Analyst',
    company: 'Accenture',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    quote:
      'The dashboard, analytics, and AI suggestions made my preparation structured and effective. Highly recommended!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Vikram Patel',
    role: 'Product Manager',
    company: 'Microsoft',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    quote:
      'The system design and behavioral question practice gave me a huge edge during my final interview rounds.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Sneha Gupta',
    role: 'Full Stack Developer',
    company: 'Wipro',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    quote:
      'Getting instant feedback on my communication skills and code efficiency boosted my confidence tenfold!',
    rating: 5,
  },
  {
    id: 6,
    name: 'Ananya Deshmukh',
    role: 'Cloud Engineer',
    company: 'AWS',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    quote:
      'The AI mock interviews adapted to my target job role effortlessly. PrepPilot AI is an absolute game-changer.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const itemsPerPage = 3; // Show 3 cards on desktop grid
  const maxIndex = testimonialsData.length - itemsPerPage;

  // Auto slide every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  return (
    <section id="testimonials" className="relative py-20 md:py-32 bg-[#0B1120] overflow-hidden border-t border-purple-900/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating neon accent dots */}
      <div className="absolute top-16 left-16 w-2 h-2 rounded-full bg-purple-400 blur-[1px] animate-ping opacity-75" />
      <div className="absolute bottom-16 right-20 w-2 h-2 rounded-full bg-amber-400 blur-[1px] animate-pulse opacity-75" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14 md:mb-16">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase shadow-lg shadow-purple-950/40">
            <Heart className="w-3.5 h-3.5 fill-purple-400 text-purple-400 animate-pulse" />
            <span>TESTIMONIALS</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              Loved
            </span>{' '}
            by Students & Professionals
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Thousands of learners trust PrepPilot AI to prepare smarter and perform better in interviews.
          </p>

          {/* Floating Review Badge */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold shadow-md shadow-amber-950/30">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white font-bold ml-1">4.9/5</span>
              <span className="text-gray-400 font-normal">Average Rating</span>
            </div>
          </div>

          {/* Dual Pill Underline Indicator */}
          <div className="flex items-center gap-1.5 pt-2">
            <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_#a855f7]" />
            <div className="w-2 h-1 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
          </div>

        </div>

        {/* Carousel Slider Container */}
        <div
          className="relative px-2 md:px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Controls */}
          <div className="hidden lg:flex items-center justify-between absolute top-1/2 -translate-y-1/2 -left-6 -right-6 z-20 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto p-3 rounded-full bg-[#0d091a]/90 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-900/60 shadow-lg shadow-purple-950/60 transition-all hover:scale-110"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="pointer-events-auto p-3 rounded-full bg-[#0d091a]/90 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-900/60 shadow-lg shadow-purple-950/60 transition-all hover:scale-110"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Sliding Cards Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {testimonialsData.map((item) => (
                <div
                  key={item.id}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0"
                >
                  <div className="group relative flex flex-col justify-between p-8 rounded-[24px] bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 shadow-[0_15px_35px_rgba(112,26,238,0.12)] hover:shadow-[0_25px_60px_rgba(168,85,247,0.25)] transition-all duration-500 hover:-translate-y-2.5 overflow-hidden h-full min-h-[320px]">
                    
                    {/* Subtle Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[24px]" />

                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 text-purple-500/20 group-hover:text-purple-400/40 transition-colors duration-500">
                      <Quote className="w-10 h-10 transform rotate-180" />
                    </div>

                    <div>
                      {/* 5 Stars Rating */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                          />
                        ))}
                      </div>

                      {/* Testimonial Quote */}
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed font-normal italic mb-8 relative z-10">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-purple-900/30 relative z-10">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/40 shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex flex-col">
                        <h4 className="text-base font-bold text-white font-sans group-hover:text-purple-200 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-400 font-medium">
                          {item.role} <span className="text-purple-400 font-semibold">at {item.company}</span>
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Indicators / Dots */}
          <div className="flex items-center justify-center gap-2 pt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-amber-400 shadow-[0_0_10px_#a855f7]'
                    : 'w-2 bg-purple-900/60 hover:bg-purple-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
