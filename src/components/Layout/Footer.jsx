import React from 'react';
import { Link } from 'react-router-dom';
import { usePlatform } from '../../context/PlatformContext';

export default function Footer() {
  const { platformName, copyrightText } = usePlatform();

  return (
    <footer className="border-t border-brand-primary/5 bg-white/60 py-5 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-on-surface-subtle text-center sm:text-start">
        <p>
          &copy; {new Date().getFullYear()} {platformName}. {copyrightText}
        </p>
        <div className="flex items-center gap-5">
          <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-brand-primary transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
