import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, Loader2, AlertCircle, CheckCircle2, ArrowLeft, ExternalLink, Copy, Check, Sparkles } from 'lucide-react';
import authApi from '../api/authApi';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [directResetUrl, setDirectResetUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');
    setResetToken('');
    setDirectResetUrl('');

    try {
      const response = await authApi.post('/forgot-password', { email });
      const msg = response.data?.message || `Account verified! Reset token generated for ${email}`;
      setSuccessMessage(msg);
      
      const token = response.data?.resetToken || '';
      const link = response.data?.resetLink || (token ? `/reset-password/${token}` : '');
      
      setResetToken(token);
      setDirectResetUrl(link);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'No registered account found with this email. Please sign up first.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    const fullUrl = directResetUrl.startsWith('http')
      ? directResetUrl
      : `${window.location.origin}${directResetUrl}`;
    
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getNavigationPath = () => {
    if (resetToken) return `/reset-password/${resetToken}`;
    if (directResetUrl) {
      try {
        const u = new URL(directResetUrl);
        return u.pathname;
      } catch {
        return directResetUrl;
      }
    }
    return '/login';
  };

  return (
    <div className="w-full p-8 rounded-3xl bg-[#131b2e]/80 backdrop-blur-xl border border-purple-500/30 shadow-[0_20px_50px_rgba(112,26,238,0.2)] text-center relative z-10 font-sans max-w-md mx-auto">
      
      {/* Success State Screen */}
      {successMessage ? (
        <div className="py-4 space-y-5 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white">Account Verified! 🔑</h3>
            <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
              {successMessage}
            </p>
          </div>

          {/* Prominent Reset Action Card */}
          <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-left space-y-3 my-2 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Instant Reset Available:
              </span>
              <span className="text-[10px] text-gray-400 font-medium">Valid for 15 mins</span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(getNavigationPath())}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 hover:from-purple-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <ExternalLink className="w-4 h-4 text-slate-950" />
                <span>Click Here to Reset Password Now 🚀</span>
              </button>

              {directResetUrl && (
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2 px-3 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Reset URL</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 hover:text-white font-bold text-xs transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Login</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-extrabold text-white mb-2">Reset Password</h2>
          <p className="text-sm text-gray-400 mb-6">Enter your registered email to reset your account password</p>

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
