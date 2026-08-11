import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  ArrowRight,
  Code2,
  Server,
  Layers,
  Atom,
  Coffee,
  FileCode,
  BarChart3,
  Brain,
  Cloud,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import authApi from '../api/authApi';

const JOB_ROLES = [
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    description: 'Build responsive web apps with HTML, CSS, React, & Next.js',
    icon: Code2,
    badge: 'Popular',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'backend-developer',
    name: 'Backend Developer',
    description: 'Design robust APIs, server logic, & database systems',
    icon: Server,
    badge: 'High Demand',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'fullstack-developer',
    name: 'Full Stack Developer',
    description: 'Master MERN/MEAN stack, System Design, & end-to-end web apps',
    icon: Layers,
    badge: 'Featured',
    color: 'from-amber-400 to-pink-500',
  },
  {
    id: 'react-developer',
    name: 'React Developer',
    description: 'Specialize in React.js, Redux Toolkit, Next.js & modern UI',
    icon: Atom,
    badge: 'Hot Role',
    color: 'from-cyan-400 to-blue-600',
  },
  {
    id: 'java-developer',
    name: 'Java Developer',
    description: 'Enterprise applications with Core Java, Spring Boot & Microservices',
    icon: Coffee,
    badge: 'Enterprise',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'python-developer',
    name: 'Python Developer',
    description: 'Backend & scripting with Django, FastAPI, & Automation',
    icon: FileCode,
    badge: 'Versatile',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Extract insights using SQL, Python, Excel, & PowerBI',
    icon: BarChart3,
    badge: 'Analytics',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'machine-learning-engineer',
    name: 'Machine Learning Engineer',
    description: 'Train AI models, NLP, Computer Vision, & PyTorch/TensorFlow',
    icon: Brain,
    badge: 'AI Spec',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    description: 'Cloud infrastructure with Docker, Kubernetes, AWS & CI/CD',
    icon: Cloud,
    badge: 'Cloud',
    color: 'from-sky-400 to-indigo-600',
  },
  {
    id: 'software-tester',
    name: 'Software Tester',
    description: 'QA Testing, Automation scripts with Selenium, Jest & Postman',
    icon: ShieldCheck,
    badge: 'QA',
    color: 'from-teal-400 to-emerald-600',
  },
];

const SelectJobRole = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filter job roles based on search input
  const filteredRoles = JOB_ROLES.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectRole = (role) => {
    setErrorMsg('');
    setSelectedRole(role.id === selectedRole?.id ? null : role);
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      setErrorMsg('Please select a job role.');
      return;
    }

    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('token');
      const response = await authApi.patch(
        '/target-role',
        { targetRole: selectedRole.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        setSuccessMsg('Target role updated successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 600);
      }
    } catch (err) {
      console.error('Update target role error:', err);
      setErrorMsg(
        err.response?.data?.message || 'Failed to update target role. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07050e] text-white p-4 md:p-8 font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Ambient Glassmorphism Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full space-y-8 relative z-10">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors bg-[#131b2e]/80 px-4 py-2.5 rounded-xl border border-purple-500/30 shadow-md backdrop-blur-xl"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Back to Dashboard</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Step 1 of 3: Role Selection
          </span>
        </div>

        {/* Notifications Toast Banner */}
        {successMsg && (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-semibold flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Centered Heading & Subtitle */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">Target Job Role</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 font-medium">
            Select the role you are preparing for to customize your AI mock interviews and ATS resume benchmarks.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-purple-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search job role..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#131b2e]/80 border border-purple-500/30 text-white placeholder-gray-400 text-sm font-medium focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 shadow-xl backdrop-blur-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/40 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Job Role Cards Grid */}
        {filteredRoles.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#131b2e]/50 border border-purple-500/20 max-w-md mx-auto space-y-3">
            <Search className="w-12 h-12 text-purple-400/40 mx-auto" />
            <h3 className="text-base font-bold text-white">No Job Roles Found</h3>
            <p className="text-xs text-gray-400">No matching role found for "{searchQuery}". Try searching for Frontend, React, or Python.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 text-xs font-bold text-purple-300 bg-purple-950/60 rounded-xl border border-purple-500/30 hover:bg-purple-900/60 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {filteredRoles.map((role) => {
              const IconComponent = role.icon;
              const isSelected = selectedRole?.id === role.id;

              return (
                <div
                  key={role.id}
                  onClick={() => handleSelectRole(role)}
                  className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 select-none ${
                    isSelected
                      ? 'bg-purple-900/40 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.35)] scale-[1.03] ring-2 ring-purple-400/50'
                      : 'bg-[#131b2e]/70 border-purple-500/20 hover:border-purple-400/60 hover:bg-purple-950/30 hover:scale-[1.01]'
                  }`}
                >
                  {/* Top Card Icon & Badge / Checkmark */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-110'
                          : 'bg-purple-950/60 border border-purple-500/30 text-purple-300 group-hover:text-white group-hover:bg-purple-600/30'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {isSelected ? (
                      <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center animate-in zoom-in duration-200 shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                        <CheckCircle2 className="w-4 h-4 fill-emerald-400 text-slate-950" />
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300/60 bg-purple-950/40 px-2 py-0.5 rounded-md border border-purple-500/10">
                        {role.badge}
                      </span>
                    )}
                  </div>

                  {/* Card Title & Description */}
                  <div className="space-y-1.5 flex-1">
                    <h3
                      className={`text-base font-bold transition-colors ${
                        isSelected ? 'text-white' : 'text-gray-200 group-hover:text-purple-300'
                      }`}
                    >
                      {role.name}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 font-normal">
                      {role.description}
                    </p>
                  </div>

                  {/* Active Selection Indicator Bar */}
                  <div
                    className={`h-1 w-full rounded-full transition-all duration-300 ${
                      isSelected ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400' : 'bg-purple-950/40 group-hover:bg-purple-500/20'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Bottom Sticky Action Footer */}
      <div className="mt-10 pt-6 border-t border-purple-900/30 backdrop-blur-xl relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-gray-400 text-center sm:text-left">
          {selectedRole ? (
            <span>
              Selected Role: <strong className="text-purple-300 font-bold">{selectedRole.name}</strong>
            </span>
          ) : (
            <span>Please select a job role above to continue</span>
          )}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRole || saving}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            selectedRole && !saving
              ? 'text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 hover:from-purple-300 hover:via-pink-300 hover:to-amber-300 shadow-[0_4px_25px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95'
              : 'text-gray-500 bg-purple-950/30 border border-purple-500/20 cursor-not-allowed opacity-50'
          }`}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SelectJobRole;
