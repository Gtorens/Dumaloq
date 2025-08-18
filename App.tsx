import React from 'react';
import PageWrapper from './components/PageWrapper';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <PageWrapper />
    </ErrorBoundary>
  );
};

export default App;