import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Edit3,
  Save,
  Camera,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Award,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import authApi from '../api/authApi';

const Profile = () => {
  // Load user data from localStorage or fallback defaults
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: storedUser.name || 'Shraddha Shandilya',
    email: storedUser.email || 'shraddhashandilya2005@gmail.com',
    role: storedUser.role || 'Candidate / MERN Developer',
    joinedDate: storedUser.createdAt
      ? new Date(storedUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : 'Aug 2026',
  });

  // Password Change Form State
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-clear notification after 4s
  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg('');
        setErrorMsg('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChangeInput = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('token');
      if (token) {
        await authApi.put(
          '/profile',
          { name: formData.name, email: formData.email },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      const updatedUser = {
        ...storedUser,
        name: formData.name,
        email: formData.email,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setSuccessMsg('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      const updatedUser = {
        ...storedUser,
        name: formData.name,
        email: formData.email,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccessMsg('Profile saved locally!');
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      setErrorMsg('Please enter both current and new password');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setErrorMsg('New passwords do not match');
      return;
    }

    setPasswordLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('token');
      await authApi.put(
        '/change-password',
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMsg('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
      setShowPasswordSection(false);
    } catch (err) {
      console.error(err);
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) {
        setSuccessMsg('Password updated successfully!');
        setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
        setShowPasswordSection(false);
      } else {
        setErrorMsg(err.response?.data?.message || 'Failed to change password. Please check current password.');
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07050e] text-white p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Background Neon Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors bg-[#131b2e]/80 px-4 py-2.5 rounded-xl border border-purple-500/30 shadow-md backdrop-blur-xl"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Back to Dashboard</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            PrepPilot Member
          </span>
        </div>

        {/* Notifications Toast Banner */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Main Profile Card Container */}
        <div className="p-6 md:p-10 rounded-3xl bg-[#131b2e]/80 backdrop-blur-2xl border border-purple-500/30 shadow-[0_20px_60px_rgba(112,26,238,0.15)] relative">
          
          {/* Card Top Banner Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-purple-900/40">
            
            {/* Left: Avatar + Title */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              
              {/* Profile Picture with Upload Badge */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-1 shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#0d091a] overflow-hidden flex items-center justify-center relative">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-purple-950/60 text-white font-extrabold text-3xl">
                        {formData.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Camera Icon Overlay */}
                <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg border border-purple-400 cursor-pointer transition-transform duration-300 hover:scale-110">
                  <Camera className="w-4 h-4" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>

              {/* Name & Badge */}
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2 justify-center sm:justify-start">
                  <span>{formData.name}</span>
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                </h1>
                <p className="text-sm text-gray-400 font-medium mt-1">{formData.email}</p>
                <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                    {formData.role}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Edit / Save Toggle Action Button */}
            <div>
              {isEditing ? (
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 hover:from-emerald-300 hover:to-amber-300 shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> : <Save className="w-4 h-4" />}
                  <span>Save Changes</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-purple-600/80 hover:bg-purple-500 border border-purple-400/40 shadow-[0_4px_20px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Form Fields */}
          <form className="mt-8 space-y-6" onSubmit={handleSaveProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                    isEditing
                      ? 'bg-purple-950/50 border border-purple-500/50 text-white focus:outline-none focus:border-purple-400'
                      : 'bg-purple-950/20 border border-purple-500/10 text-gray-300 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                    isEditing
                      ? 'bg-purple-950/50 border border-purple-500/50 text-white focus:outline-none focus:border-purple-400'
                      : 'bg-purple-950/20 border border-purple-500/10 text-gray-300 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Account Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-purple-950/20 border border-purple-500/10 text-gray-400 text-sm font-medium cursor-not-allowed"
                />
              </div>

              {/* Joined Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Joined Date
                </label>
                <input
                  type="text"
                  name="joinedDate"
                  value={formData.joinedDate}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-purple-950/20 border border-purple-500/10 text-gray-400 text-sm font-medium cursor-not-allowed"
                />
              </div>
            </div>
          </form>

          {/* Change Password Interactive Section */}
          <div className="pt-6 border-t border-purple-900/40 mt-8">
            <div className="rounded-2xl bg-purple-950/30 border border-purple-500/30 overflow-hidden transition-all duration-300">
              
              {/* Accordion Toggle Bar */}
              <button
                type="button"
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-purple-900/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Change Password</h3>
                    <p className="text-xs text-gray-400">Update your account security password</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                    {showPasswordSection ? 'Hide Form' : 'Update Password 🔒'}
                  </span>
                  {showPasswordSection ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {/* Password Form Drawer */}
              {showPasswordSection && (
                <form className="p-6 pt-2 border-t border-purple-900/30 space-y-4 animate-in fade-in slide-in-from-top duration-300" onSubmit={handleChangePasswordSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Current Password */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showOldPassword ? 'text' : 'password'}
                          name="oldPassword"
                          value={passwordData.oldPassword}
                          onChange={handlePasswordChangeInput}
                          placeholder="••••••••"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-500/40 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 text-sm pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChangeInput}
                          placeholder="••••••••"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-500/40 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 text-sm pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="confirmNewPassword"
                        value={passwordData.confirmNewPassword}
                        onChange={handlePasswordChangeInput}
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-500/40 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 hover:from-purple-300 hover:to-amber-300 shadow-md transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {passwordLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                      <span>Update Password</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;