import React from 'react';
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import Pricing from '../components/home/Pricing';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#07050e] text-white selection:bg-purple-500 selection:text-white font-sans relative overflow-hidden">
      {/* Ambient Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-purple-900/25 via-indigo-900/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-pink-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Navbar Component */}
      <Navbar />

      {/* Main Landing Page Content */}
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;