import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import PageWrapper from './components/sections/PageWrapper';
import ErrorBoundary from './components/sections/ErrorBoundary';
import { ToastProvider } from './components/ui/Toast';

const App: React.FC = () => {
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