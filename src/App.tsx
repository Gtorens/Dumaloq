import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import PageWrapper from './components/sections/PageWrapper';
import ErrorBoundary from './components/sections/ErrorBoundary';
import { ToastProvider } from './components/ui/Toast';
import { initPerformanceMonitoring, getBundleSize, getMemoryUsage } from './utils/performance';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize performance monitoring
    const performanceMonitor = initPerformanceMonitoring();
    
    // Log bundle size and memory usage
    getBundleSize();
    getMemoryUsage();
    
    // Cleanup on unmount
    return () => {
      performanceMonitor.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <ToastProvider>
        <ErrorBoundary>
          <PageWrapper />
        </ErrorBoundary>
      </ToastProvider>
    </HelmetProvider>
  );
};

export default App;