import React, { useContext } from 'react';
import type { ToastContextType } from '../types/toast';

// Toast context created in separate file for proper imports
export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};