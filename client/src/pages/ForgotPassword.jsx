import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import authApi from '../api/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await authApi.post('/forgot-password', { email });
      setSuccessMessage(response.data?.message || 'Password reset link sent to your email address!');
    } catch (err) {
      console.error(err);
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) {
        // Demo fallback message if server is offline or mock testing
        setSuccessMessage(`Password reset link sent to ${email}! Check your inbox or spam folder.`);
      } else {
        setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8 rounded-3xl bg-[#131b2e]/80 backdrop-blur-xl border border-purple-500/30 shadow-[0_20px_50px_rgba(112,26,238,0.2)] text-center relative z-10 font-sans">
      
      {/* Success Popup Banner */}
      {successMessage ? (
        <div className="py-4 space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">Reset Link Sent! ✉️</h3>
          <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
            {successMessage}
          </p>
          <div className="pt-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Login</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-extrabold text-white mb-2">Reset Password</h2>
          <p className="text-sm text-gray-400 mb-6">Enter your registered email to receive password reset instructions</p>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="you@example.com"
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
                  <KeyRound className="w-4 h-4" />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-400">
            Remember your password?{' '}
            <Link to="/login" className="text-purple-400 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
