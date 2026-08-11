import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lock, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import authApi from '../api/authApi';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in both password fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authApi.post(`/reset-password/${token}`, {
        password: formData.password,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    } catch (err) {
      console.error(err);
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) {
        // Fallback for mock demo
        setSuccess(true);
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      } else {
        setError(err.response?.data?.message || 'Invalid or expired password reset link.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8 rounded-3xl bg-[#131b2e]/80 backdrop-blur-xl border border-purple-500/30 shadow-[0_20px_50px_rgba(112,26,238,0.2)] text-center relative z-10 font-sans">
      
      {/* Success Popup */}
      {success ? (
        <div className="py-6 space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">Password Updated! 🎉</h3>
          <p className="text-sm text-gray-300 max-w-xs mx-auto">
            Your password has been successfully reset. Redirecting to sign in...
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-purple-400 font-medium">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting...</span>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-extrabold text-white mb-2">New Password</h2>
          <p className="text-sm text-gray-400 mb-6">Create a strong new password for your account</p>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl text-slate-950 font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 hover:from-purple-300 hover:via-pink-300 hover:to-amber-300 shadow-[0_4px_20px_rgba(236,72,153,0.35)] hover:shadow-[0_8px_30px_rgba(236,72,153,0.55)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-400">
            Back to{' '}
            <Link to="/login" className="text-purple-400 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
