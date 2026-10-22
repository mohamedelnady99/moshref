import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialSymbol } from 'react-material-symbols';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-[#F4F4EF] to-[#E3E3DE] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-card p-8 sm:p-10 animate-slide-up">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
          <MaterialSymbol icon="search_off" size={36} className="text-brand-accent" />
        </div>

        <h1 className="text-6xl font-black text-brand-primary tracking-tight mb-2">404</h1>
        <p className="text-xl font-bold text-on-surface-variant mb-3">Page not found</p>

        <p className="text-sm text-on-surface-subtle mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:opacity-95 active:scale-[0.98] transition-all"
        >
          <MaterialSymbol icon="home" size={20} />
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}