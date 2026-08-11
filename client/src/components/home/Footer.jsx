import React from 'react';
import logoImg from '../../assets/logo/image.png';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] text-gray-400 border-t border-purple-500/30 pt-16 pb-12 px-4 md:px-8 relative overflow-hidden">
      {/* Top Glowing Divider Line Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent shadow-[0_0_15px_#a855f7]" />

      {/* Background Subtle Ambient Lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-purple-900/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Floating particles */}
      <div className="absolute top-12 left-10 w-1.5 h-1.5 rounded-full bg-purple-400 blur-[1px] animate-ping opacity-60" />
      <div className="absolute bottom-12 right-12 w-1.5 h-1.5 rounded-full bg-amber-400 blur-[1px] animate-pulse opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 5 Clean Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-purple-900/40">
          
          {/* Column 1 – Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <a href="#" className="flex items-center group py-0.5">
              <img
                src={logoImg}
                alt="PrepPilot AI Logo"
                className="h-12 w-auto object-contain filter brightness-110 drop-shadow-[0_0_12px_rgba(168,85,247,0.35)] transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
              Practice. Prepare. Perform.
            </p>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-normal">
              Empowering students and professionals with AI-powered interview preparation, resume analysis, and career growth.
            </p>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-sans border-l-2 border-purple-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm font-medium">
              <li><a href="#home" className="hover:text-purple-300 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-purple-300 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-purple-300 transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-purple-300 transition-colors">Testimonials</a></li>
              <li><a href="#pricing" className="hover:text-purple-300 transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-purple-300 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3 – Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-sans border-l-2 border-purple-500 pl-2">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm font-medium">
              <li><a href="#" className="hover:text-purple-300 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Career Tips</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Resume Builder</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Column 4 – Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-sans border-l-2 border-purple-500 pl-2">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm font-medium">
              <li><a href="#" className="hover:text-purple-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 5 – Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-sans border-l-2 border-amber-400 pl-2">
              Connect
            </h4>

            <div className="space-y-2.5 text-xs md:text-sm text-gray-300">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="mailto:support@preppilot.ai" className="hover:text-white transition-colors">
                  support@preppilot.ai
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                <span>India</span>
              </div>
            </div>

            {/* Premium Glowing Social Icons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {/* GitHub */}
              <a
                href="#"
                className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-gray-300 hover:text-white hover:bg-purple-900/60 hover:border-purple-400 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-gray-300 hover:text-white hover:bg-purple-900/60 hover:border-purple-400 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
                </svg>
              </a>

              {/* Twitter (X) */}
              <a
                href="#"
                className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-gray-300 hover:text-white hover:bg-purple-900/60 hover:border-purple-400 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-gray-300 hover:text-white hover:bg-purple-900/60 hover:border-purple-400 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-gray-300 hover:text-white hover:bg-purple-900/60 hover:border-purple-400 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 PrepPilot AI. All Rights Reserved.</p>
          
          <div className="flex flex-col items-center gap-0.5">
            <p className="flex items-center gap-1 font-medium">
              Made with <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" /> for Future Developers.
            </p>
            <span className="text-xs font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              by Shraddha Shandilya
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-400 font-medium">
            <a href="#" className="hover:text-purple-300 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-300 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-300 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
