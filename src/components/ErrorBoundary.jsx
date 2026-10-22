import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-card p-8">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-danger/10 text-danger flex items-center justify-center text-3xl font-black">!</div>
          <h5 className="text-lg font-bold text-brand-primary mb-2">Something went wrong</h5>
          <p className="text-sm text-on-surface-subtle mb-6 break-words">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-3 rounded-xl border-0 bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-bold shadow-lg shadow-brand-primary/20 hover:opacity-95 cursor-pointer transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
    }

    return this.props.children;
  }
}

export class ErrorBoundaryRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Route error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 p-6 text-center">
          <h5 className="text-lg font-bold text-brand-primary">Page failed to load</h5>
          <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-xl border-0 bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-bold shadow-lg shadow-brand-primary/20 hover:opacity-95 cursor-pointer transition-all">
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

