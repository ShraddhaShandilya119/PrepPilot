import React, { useState } from 'react';
import { Check, Sparkles, Gem, ArrowRight } from 'lucide-react';

const pricingPlans = [
  {
    id: 'free',
    name: 'Starter',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Perfect for exploring AI mock interviews and basic ATS resume checks.',
    popular: false,
    badge: null,
    features: [
      '1 AI Mock Interview per month',
      'Basic ATS Resume Analyzer',
      'Standard Feedback & Scoring',
      'Access to Core Question Bank',
      'Community Support',
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline',
  },
  {
    id: 'pro',
    name: 'Pro Pilot',
    monthlyPrice: 29,
    annualPrice: 24,
    description: 'Best for active job seekers needing unlimited practice & deep AI insights.',
    popular: true,
    badge: '🔥 MOST POPULAR',
    features: [
      'Unlimited AI Mock Interviews',
      'Advanced ATS Resume & Keyword Optimizer',
      'Real-time Speech & Confidence Feedback',
      'Personalized Career Learning Roadmap',
      'Priority 24/7 AI Support',
      'Detailed Performance Analytics',
    ],
    buttonText: 'Get Started Pro',
    buttonVariant: 'gradient',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'Tailored for universities, bootcamps, and high-volume recruiting teams.',
    popular: false,
    badge: null,
    features: [
      'Everything in Pro Plan',
      'Team & Cohort Analytics Dashboard',
      'Custom Interview Question Banks',
      'Dedicated Account Manager & Training',
      'Custom API & LMS Integrations',
      '99.9% Uptime SLA Guarantee',
    ],
    buttonText: 'Contact Enterprise',
    buttonVariant: 'outline',
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-20 md:py-32 bg-[#0B1120] overflow-hidden border-t border-purple-900/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating neon particles */}
      <div className="absolute top-12 left-16 w-2 h-2 rounded-full bg-purple-400 blur-[1px] animate-ping opacity-75" />
      <div className="absolute bottom-16 right-20 w-2 h-2 rounded-full bg-amber-400 blur-[1px] animate-pulse opacity-75" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-20">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase shadow-lg shadow-purple-950/40">
            <Gem className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>PRICING</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-base sm:text-lg max-w-xl font-normal">
            Flexible pricing for every learner.
          </p>

          {/* Billing Toggle Switch */}
          <div className="pt-4 flex items-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 rounded-full bg-[#1e1338] border border-purple-500/40 p-1 transition-colors focus:outline-none"
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-amber-400 shadow-md transform transition-transform duration-300 ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
              <span className="px-2 py-0.5 text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 rounded-full uppercase">
                Save 20%
              </span>
            </span>
          </div>

          {/* Dual Pill Underline Indicator */}
          <div className="flex items-center gap-1.5 pt-2">
            <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_#a855f7]" />
            <div className="w-2 h-1 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
          </div>

        </div>

        {/* 3 Glassmorphism Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-500 ${
                  plan.popular
                    ? 'bg-[#17112e]/90 border-2 border-purple-500 shadow-[0_20px_60px_rgba(168,85,247,0.3)] md:scale-105 z-20'
                    : 'bg-[#131b2e]/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 shadow-[0_15px_35px_rgba(112,26,238,0.12)] hover:shadow-[0_25px_50px_rgba(168,85,247,0.2)] z-10'
                }`}
              >
                {/* Popular Ribbon Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 text-slate-950 text-xs font-extrabold tracking-wider shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2 font-sans">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-purple-900/30">
                    <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
                      ${price}
                    </span>
                    <span className="text-gray-400 text-sm font-medium">
                      / month
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-500/15 border border-purple-500/30 text-amber-400 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div>
                  {plan.buttonVariant === 'gradient' ? (
                    <button className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 hover:from-amber-300 hover:to-purple-300 shadow-[0_6px_25px_rgba(236,72,153,0.35)] transition-all duration-300 hover:scale-[1.02]">
                      <span>{plan.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="w-full py-3.5 px-6 rounded-xl text-sm font-medium text-purple-200 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                      {plan.buttonText}
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
