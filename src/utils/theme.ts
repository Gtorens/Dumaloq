import { Theme } from '../types/app';

// CSS переменные для светлой темы
export const lightThemeVars = {
  '--bg-primary': '#ffffff',
  '--bg-secondary': '#f9fafb',
  '--text-primary': '#1f2937',
  '--text-secondary': '#6b7280',
  '--border-color': '#e5e7eb',
  '--accent-color': '#3b82f6',
  '--accent-red': '#dc2626',
  '--shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
};

// CSS переменные для темной темы
export const darkThemeVars = {
  '--bg-primary': '#111827',
  '--bg-secondary': '#1f2937',
  '--text-primary': '#f9fafb',
  '--text-secondary': '#d1d5db',
  '--border-color': '#374151',
  '--accent-color': '#60a5fa',
  '--accent-red': '#f87171',
  '--shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
};

// Применение CSS переменных темы
export const applyThemeVars = (theme: Theme): void => {
  const root = document.documentElement;
  const vars = theme === 'light' ? lightThemeVars : darkThemeVars;
  
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

// Получение системной темы
export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Подписка на изменения системной темы
export const subscribeToSystemTheme = (callback: (_theme: Theme) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (_e: MediaQueryListEvent) => {
    callback(_e.matches ? 'dark' : 'light');
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
};

// Проверка поддержки темной темы
export const supportsDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches !== undefined;
};
