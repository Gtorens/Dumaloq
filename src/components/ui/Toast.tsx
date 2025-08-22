import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Toast } from '../../types/toast';
import { getToastStyles, getIcon } from '../../utils/toastUtils.tsx';
import { ToastContext } from '../../hooks/useToast';

const ToastItem: React.FC<{ toast: Toast; onHide: (_id: string) => void }> = ({ toast, onHide }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHide(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onHide]);

  return (
    <div className={getToastStyles(toast.type)}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon(toast.type)}
        </div>
        <div className="ml-3 flex-1">
          <h4 className="font-medium">{toast.title}</h4>
          {toast.message && (
            <p className="mt-1 text-sm opacity-90">{toast.message}</p>
          )}
        </div>
        <button
          onClick={() => onHide(toast.id)}
          className="ml-4 flex-shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Закрыть уведомление"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const _id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: Toast = { ...toast, id: _id };
    
    setToasts(prev => [...prev, newToast]);
  }, []);

  const hideToast = useCallback((_id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== _id));
  }, []);

  const toastContainer = (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onHide={hideToast} />
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {typeof window !== 'undefined' && createPortal(toastContainer, document.body)}
    </ToastContext.Provider>
  );
};
