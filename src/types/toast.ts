// Типы для Toast системы
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export interface ToastContextType {
  showToast: (_toast: Omit<Toast, 'id'>) => void;
  hideToast: (_id: string) => void;
}