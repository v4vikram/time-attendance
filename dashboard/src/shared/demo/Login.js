import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  inputFocus: {
    borderColor: '#5C65F6',
    boxShadow: '0 0 0 3px rgba(165, 180, 252, 0.3)',
    outline: 'none',
  },
};

const LogoIcon = ({ className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const FocusInput = ({ type, id, placeholder, className, required, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={className}
      required={required}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={focused ? customStyles.inputFocus : {}}
    />
  );
};

const PasswordInput = ({ id, placeholder, className, required, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        placeholder={placeholder}
        className={className}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={focused ? customStyles.inputFocus : {}}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500 transition-colors"
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
};

const SidePanel = () => (
  <div className="hidden md:flex md:w-[45%] bg-gradient-to-br from-[#5C65F6] to-[#434bcf] p-10 flex-col justify-between relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div className="relative z-10 flex items-center gap-2.5 font-bold text-xl text-white">
      <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-[#5C65F6]">
        <LogoIcon color="#5C65F6" />
      </div>
      Workforce
    </div>

    <div className="relative z-10 mt-12 mb-auto">
      <h2 className="text-3xl font-bold text-white mb-4 tracking-tight leading-tight">
        Manage your team<br />with intelligence.
      </h2>
      <p className="text-white/80 text-[14px] leading-relaxed max-w-[280px]">
        Join thousands of organizations using Workforce to streamline operations, track attendance, and process payroll seamlessly.
      </p>
    </div>

    <div className="relative z-10 mt-auto w-full h-56 bg-white/10 rounded-t-xl border-t border-x border-white/20 p-5 overflow-hidden backdrop-blur-md shadow-2xl translate-y-2 transition-transform duration-500">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
      </div>
      <div className="flex gap-4 h-full">
        <div className="w-1/3 flex flex-col gap-2.5">
          <div className="h-3 bg-white/20 rounded-md w-3/4"></div>
          <div className="h-3 bg-white/10 rounded-md w-full"></div>
          <div className="h-3 bg-white/10 rounded-md w-5/6"></div>
          <div className="h-3 bg-white/10 rounded-md w-full mt-2"></div>
          <div className="h-3 bg-white/10 rounded-md w-4/5"></div>
        </div>
        <div className="w-2/3 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="h-12 flex-1 bg-white/20 rounded-lg"></div>
            <div className="h-12 flex-1 bg-white/10 rounded-lg"></div>
          </div>
          <div className="h-24 w-full bg-white/10 rounded-lg relative overflow-hidden flex items-end px-3 gap-2 pb-0">
            <div className="w-1/5 bg-white/20 rounded-t-sm" style={{ height: '30%' }}></div>
            <div className="w-1/5 rounded-t-sm" style={{ height: '50%', backgroundColor: 'rgba(92,101,246,0.6)' }}></div>
            <div className="w-1/5 bg-white/30 rounded-t-sm" style={{ height: '70%' }}></div>
            <div className="w-1/5 bg-white/40 rounded-t-sm" style={{ height: '40%' }}></div>
            <div className="w-1/5 bg-white/50 rounded-t-sm" style={{ height: '85%' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MobileLogo = () => (
  <div className="md:hidden flex items-center justify-center gap-2 font-bold text-xl text-gray-900 mb-8">
    <div className="w-8 h-8 bg-[#5C65F6] rounded-md flex items-center justify-center text-white">
      <LogoIcon color="white" />
    </div>
    Workforce
  </div>
);

const LoginView = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Signed in successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="w-full max-w-[380px] flex flex-col my-auto" style={{ animation: 'fadeIn 0.3s ease-out forwards' }}>
      <MobileLogo />

      <div className="text-center md:text-left mb-8">
        <h1 className="text-2xl font-semibold mb-1.5 text-gray-900 tracking-tight">Welcome back</h1>
        <p className="text-[14px] text-gray-500">Please enter your details to sign in.</p>
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-[13px]">
          {successMessage}
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[13px] font-medium text-gray-900 shadow-sm">
          <GoogleIcon />
          Google
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[13px] font-medium text-gray-900 shadow-sm">
          <GitHubIcon />
          GitHub
        </button>
      </div>

      <div className="relative flex items-center py-2 mb-6">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink-0 mx-4 text-gray-400 text-[12px]">Or continue with email</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-900" htmlFor="login-email">Email Address</label>
          <FocusInput
            type="email"
            id="login-email"
            placeholder="name@company.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-[13px] placeholder-gray-400 bg-white text-gray-900 shadow-sm transition-all duration-200"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-900" htmlFor="login-password">Password</label>
          <PasswordInput
            id="login-password"
            placeholder="••••••••"
            className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-gray-200 text-[13px] placeholder-gray-400 bg-white text-gray-900 shadow-sm transition-all duration-200"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mt-0.5 mb-1.5">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="rounded border-gray-200 w-4 h-4 cursor-pointer"
              style={{ accentColor: '#5C65F6' }}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-[13px] text-gray-500">Remember me</span>
          </label>
          <a href="#" className="text-[13px] font-medium text-[#5C65F6] hover:text-[#4E56E5] transition-colors">Forgot password?</a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#5C65F6] hover:bg-[#4E56E5] text-white font-medium py-2.5 rounded-lg transition-colors text-[13px] shadow-sm mt-1 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? 'Signing in...' : (
            <>
              Sign In
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-[13px] text-gray-500">
        Don't have an account?
        <button
          onClick={onSwitchToRegister}
          className="font-medium text-[#5C65F6] hover:text-[#4E56E5] transition-colors ml-1"
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

const RegisterView = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const getPasswordStrength = (password) => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 8) return 2;
    return 3;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Account created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const strengthColors = ['bg-gray-200', 'bg-red-400', 'bg-yellow-400', 'bg-[#5C65F6]'];

  return (
    <div className="w-full max-w-[380px] flex flex-col my-auto py-6" style={{ animation: 'fadeIn 0.3s ease-out forwards' }}>
      <div className="md:hidden flex items-center justify-center gap-2 font-bold text-xl text-gray-900 mb-6">
        <div className="w-8 h-8 bg-[#5C65F6] rounded-md flex items-center justify-center text-white">
          <LogoIcon color="white" />
        </div>
        Workforce
      </div>

      <div className="text-center md:text-left mb-6">
        <h1 className="text-2xl font-semibold mb-1.5 text-gray-900 tracking-tight">Create an account</h1>
        <p className="text-[14px] text-gray-500">Start your 30-day free trial today.</p>
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-[13px]">
          {successMessage}
        </div>
      )}

      <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-900" htmlFor="reg-name">Full Name</label>
          <FocusInput
            type="text"
            id="reg-name"
            placeholder="Eleanor Pena"
            className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-[13px] placeholder-gray-400 bg-white text-gray-900 shadow-sm transition-all duration-200"
            required
            value={formData.fullName}
            onChange={handleChange('fullName')}
          />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium text-gray-900" htmlFor="reg-email">Work Email</label>
            <FocusInput
              type="email"
              id="reg-email"
              placeholder="name@company.com"
              className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-[13px] placeholder-gray-400 bg-white text-gray-900 shadow-sm transition-all duration-200"
              required
              value={formData.email}
              onChange={handleChange('email')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-900" htmlFor="reg-company">Organization Name</label>
          <FocusInput
            type="text"
            id="reg-company"
            placeholder="Acme Corp"
            className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-[13px] placeholder-gray-400 bg-white text-gray-900 shadow-sm transition-all duration-200"
            required
            value={formData.company}
            onChange={handleChange('company')}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-gray-900" htmlFor="reg-password">Password</label>
          <PasswordInput
            id="reg-password"
            placeholder="••••••••"
            className="w-full pl-3.5 pr-10 py-2 rounded-lg border border-gray-200 text-[13px] placeholder-gray-400 bg-white text-gray-900 shadow-sm transition-all duration-200"
            required
            value={formData.password}
            onChange={handleChange('password')}
          />
          <div className="flex gap-1 mt-1 px-0.5">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${passwordStrength >= level ? strengthColors[passwordStrength] : 'bg-gray-200'}`}
              ></div>
            ))}
          </div>
          <span className="text-[11px] text-gray-500 ml-0.5 mt-0.5">Must be at least 8 characters.</span>
        </div>

        <div className="flex items-start gap-2 mt-2 mb-1">
          <label className="flex items-start gap-2 cursor-pointer group mt-0.5">
            <input
              type="checkbox"
              className="rounded border-gray-200 w-4 h-4 cursor-pointer mt-0.5"
              style={{ accentColor: '#5C65F6' }}
              required
              checked={formData.agreeTerms}
              onChange={handleChange('agreeTerms')}
            />
            <span className="text-[12px] text-gray-500 leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-[#5C65F6] hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-[#5C65F6] hover:underline">Privacy Policy</a>.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#5C65F6] hover:bg-[#4E56E5] text-white font-medium py-2.5 rounded-lg transition-colors text-[13px] shadow-sm mt-1 disabled:opacity-70"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="relative flex items-center py-4 my-2">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink-0 mx-4 text-gray-400 text-[12px]">Or</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[13px] font-medium text-gray-900 shadow-sm">
        <GoogleIcon />
        Sign up with Google
      </button>

      <div className="mt-6 text-center text-[13px] text-gray-500 pb-4 md:pb-0">
        Already have an account?
        <button
          onClick={onSwitchToLogin}
          className="font-medium text-[#5C65F6] hover:text-[#4E56E5] transition-colors ml-1"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

const AuthPage = () => {
  const [currentView, setCurrentView] = useState('login');

  return (
    <div className="w-full max-w-[1024px] bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_0_3px_rgba(0,0,0,0.05)] flex flex-col md:flex-row overflow-hidden min-h-[640px]">
      <SidePanel />
      <div className="w-full md:w-[55%] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14 relative bg-white">
        {currentView === 'login' ? (
          <LoginView onSwitchToRegister={() => setCurrentView('register')} />
        ) : (
          <RegisterView onSwitchToLogin={() => setCurrentView('login')} />
        )}
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      body { background-color: #F4F5F8; font-family: 'Inter', sans-serif; }
      input[type="checkbox"] { accent-color: #5C65F6; }
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(5px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8" style={{ backgroundColor: '#F4F5F8', fontFamily: "'Inter', sans-serif" }}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;