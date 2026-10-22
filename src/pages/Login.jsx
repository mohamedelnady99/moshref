import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { MaterialSymbol } from 'react-material-symbols';
import { useAuth as useAuthContext } from '../context/AuthContext';
import { useI18n } from '../i18n';
import LanguageSwitcher from '../i18n/LanguageSwitcher';
import { usePlatform } from '../context/PlatformContext';
import { storageUrl } from '../utils/api';

import { brandLogoTransparent } from '../assets/brand';
import { brandEmail } from '../config/brand';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Error translation keys with English fallbacks (t() returns the key itself when it's missing)
const ERROR_MESSAGES = {
  'auth.emailRequired': 'Email is required',
  'auth.emailInvalid': 'Enter a valid email address',
  'auth.passwordRequired': 'Password is required',
  'auth.passwordMinLength': 'Password must be at least 8 characters',
  'errors.tooManyAttempts': 'Too many login attempts. Please wait and try again.',
  'errors.accountInactive': 'Your account is inactive. Please contact the administrator.',
  'errors.invalidCredentials': 'Invalid email or password.',
  'errors.serverError': 'Server Error',
  'errors.networkError': 'Network Error',
};

export default function Login() {
  const { t, dir } = useI18n();
  const translateError = (key) => {
    if (!key) return '';
    const value = t(key);
    return value === key ? (ERROR_MESSAGES[key] || key) : value;
  };
  const { platformName, logoUrl, loginBackgroundUrl, copyrightText } = usePlatform();
  const isRtl = dir === 'rtl';
  const emailRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthContext();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    if (rateLimitCountdown <= 0) return;
    const timer = setInterval(() => {
      setRateLimitCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [rateLimitCountdown]);

  const validateField = (name, value) => {
    let msg = '';
    if (name === 'email') {
      if (!value.trim()) {
        msg = 'auth.emailRequired';
      } else if (!EMAIL_REGEX.test(value)) {
        msg = 'auth.emailInvalid';
      }
    }
    if (name === 'password') {
      if (!value) {
        msg = 'auth.passwordRequired';
      } else if (value.length < 8) {
        msg = 'auth.passwordMinLength';
      }
    }
    return msg;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setFieldErrors(prev => ({ ...prev, email: validateField('email', val) }));
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (touched.password) {
      setFieldErrors(prev => ({ ...prev, password: validateField('password', val) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setErrorType('');
    setTouched({ email: true, password: true });

    const emailErr = validateField('email', email);
    const passwordErr = validateField('password', password);
    setFieldErrors({ email: emailErr, password: passwordErr });

    if (emailErr || passwordErr) {
      setLoading(false);
      return;
    }

    const redirect = searchParams.get('redirect');

    try {
      const result = await login(email, password);
      if (result === true) {
        navigate(redirect || '/subscription/select');
      } else {
        const status = result?.status || 0;
        if (status === 429) {
          const retryAfter = result?.retryAfter || 60;
          setRateLimitCountdown(retryAfter);
          setErrorType('rate_limit');
          setError('errors.tooManyAttempts');
        } else if (status === 403) {
          setErrorType('inactive');
          setError('errors.accountInactive');
        } else if (status >= 500) {
          setErrorType('server');
          setError('errors.serverError');
        } else {
          setErrorType('credentials');
          setError('errors.invalidCredentials');
        }
      }
    } catch (err) {
      setErrorType('network');
      setError('errors.networkError');
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-brand-light via-[#F4F4EF] to-[#E3E3DE] ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-surface-dim/30" />
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg,rgb(var(--color-primary-rgb)/0.85),rgb(var(--color-secondary-rgb)/0.7)),url(${loginBackgroundUrl ? storageUrl(loginBackgroundUrl) : 'https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=2070&auto=format&fit=crop'})`
          }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center w-full px-4 sm:px-6 pt-20 pb-6 sm:py-8">
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-xl p-7 sm:p-8 md:p-10 rounded-3xl animate-slide-up shadow-[0_24px_64px_rgb(var(--color-secondary-rgb)/0.15)]">
            <div className="flex flex-col items-center mb-8">
              <img src={logoUrl ? storageUrl(logoUrl) : brandLogoTransparent} alt={platformName} className="h-[4.5rem] max-w-[12rem] mb-5 object-contain" />
              <h1 className="text-3xl sm:text-4xl font-black text-brand-primary font-['Manrope'] tracking-tight mb-2">
                {t('auth.login')}
              </h1>
              <p className="text-on-surface-variant font-medium">{platformName}</p>
            </div>

            {searchParams.get('invitation') && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <MaterialSymbol icon="info" size={20} className="text-amber-600 mt-0.5 shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-1">{t('invitations.invalidOrExpired')}</p>
                  <p className="text-amber-700">{t('common.contactAdmin')}</p>
                </div>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="space-y-3">
                <label className={`block text-sm font-bold text-brand-primary px-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <MaterialSymbol
                    icon="mail"
                    size={20}
                    className={`absolute top-1/2 -translate-y-1/2 text-on-surface-subtle ${isRtl ? 'right-5 left-auto' : 'left-5'}`}
                  />
                  <input
                    ref={emailRef}
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleBlur}
                    placeholder={brandEmail()}
                    required
                    className={`w-full bg-surface-light rounded-xl py-4 text-sm focus:outline-none focus:ring-2 transition-all font-medium text-on-surface placeholder:text-outline ${
                      isRtl ? 'pr-14 pl-5 text-right' : 'pl-14 pr-5 text-left'
                    } ${
                      touched.email && fieldErrors.email
                        ? 'focus:ring-red-400 ring-2 ring-red-300'
                        : 'focus:ring-brand-secondary/20'
                    }`}
                  />
                </div>
                {touched.email && fieldErrors.email && (
                  <p className="text-red-600 text-xs px-1 font-medium">{translateError(fieldErrors.email)}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className={`flex justify-between items-center px-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <label className="text-sm font-bold text-brand-primary">{t('auth.password')}</label>
                  <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-brand-accent hover:underline"
                    >
                      {t('auth.forgotPassword')}
                    </Link>
                </div>
                <div className="relative">
                  <MaterialSymbol
                    icon="lock"
                    size={20}
                    className={`absolute top-1/2 -translate-y-1/2 text-on-surface-subtle ${isRtl ? 'right-5 left-auto' : 'left-5'}`}
                  />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className={`w-full bg-surface-light rounded-xl py-4 text-sm focus:outline-none focus:ring-2 transition-all font-medium text-on-surface placeholder:text-outline ${
                      isRtl ? 'pr-14 pl-5' : 'pl-14 pr-14'
                    } ${
                      touched.password && fieldErrors.password
                        ? 'focus:ring-red-400 ring-2 ring-red-300'
                        : 'focus:ring-brand-secondary/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 text-on-surface-subtle hover:text-brand-primary ${isRtl ? 'left-2 right-auto' : 'right-2'}`}
                  >
                    <MaterialSymbol
                      icon={showPassword ? 'visibility_off' : 'visibility'}
                      size={20}
                    />
                  </button>
                </div>
                {touched.password && fieldErrors.password && (
                  <p className="text-red-600 text-xs px-1 font-medium">{translateError(fieldErrors.password)}</p>
                )}
              </div>

              {error && (
                <div className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 ${
                  errorType === 'rate_limit' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                  errorType === 'inactive' ? 'bg-orange-50 text-orange-800 border border-orange-200' :
                  'bg-danger/10 text-danger'
                }`}>
                  <MaterialSymbol
                    icon={
                      errorType === 'rate_limit' ? 'timer' :
                      errorType === 'inactive' ? 'block' :
                      errorType === 'network' ? 'wifi_off' :
                      'error'
                    }
                    size={18}
                    className={`mt-0.5 shrink-0 ${
                      errorType === 'rate_limit' ? 'text-amber-600' :
                      errorType === 'inactive' ? 'text-orange-600' : ''
                    }`}
                  />
                  <span className="flex-1">{translateError(error)}</span>
                  {rateLimitCountdown > 0 && (
                    <span className="font-bold text-amber-700 shrink-0">{rateLimitCountdown}s</span>
                  )}
                </div>
              )}

              <div className={`flex items-center gap-3 px-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded-lg border-2 border-surface-high text-brand-primary focus:ring-2 focus:ring-brand-secondary/20 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-on-surface-variant font-medium cursor-pointer">
                  {t('auth.rememberMe')}
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-br from-brand-primary to-brand-secondary text-brand-accent font-bold py-5 rounded-2xl shadow-xl shadow-brand-primary/25 transition-all duration-200 hover:opacity-95 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 ${
                  isRtl ? 'flex-row-reverse' : ''
                }`}
              >
                <span className="font-bold">{loading ? t('common.loading') : t('auth.login')}</span>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                ) : (
                  <MaterialSymbol icon="login" size={20} weight="fill" />
                )}
              </button>
            </form>

          </div>
        </div>
      </div>

      <footer className="mt-auto w-full py-4 sm:py-6 px-4 sm:px-12 z-20">
        <div className="flex justify-center sm:justify-start items-center max-w-screen-2xl mx-auto text-center sm:text-start">
            <p className="text-brand-primary font-medium text-xs sm:text-sm">
            © {new Date().getFullYear()} {platformName}. {copyrightText}
          </p>
        </div>
      </footer>
    </div>
  );
}
