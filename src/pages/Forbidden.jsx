import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MaterialSymbol } from 'react-material-symbols';
import { useAuth } from '../context/AuthContext';

export default function Forbidden() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleGoBack = () => {
    if (user?.role === 'Admin') {
      navigate('/dashboard');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-[#F4F4EF] to-[#E3E3DE] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-card p-8 sm:p-10 animate-slide-up">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-danger/10 flex items-center justify-center">
          <MaterialSymbol icon="lock" size={36} className="text-danger" />
        </div>

        <h1 className="text-6xl font-black text-danger tracking-tight mb-2">403</h1>
        <p className="text-xl font-bold text-on-surface-variant mb-3">Access Forbidden</p>

        <p className="text-sm text-on-surface-subtle mb-2">
          You don't have permission to access this page.
        </p>
        <p className="text-sm text-on-surface-subtle mb-8">
          Current role: <span className="font-semibold text-brand-primary">{user?.role || 'Guest'}</span>
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:opacity-95 active:scale-[0.98] transition-all"
          >
            <MaterialSymbol icon="arrow_back" size={20} />
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-light text-brand-primary rounded-xl font-bold hover:bg-surface-high transition-all"
          >
            <MaterialSymbol icon="logout" size={20} />
            Login as Different User
          </button>
        </div>
      </div>
    </div>
  );
}