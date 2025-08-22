import { useState, useEffect, useCallback } from 'react';
import { Theme } from '../types/app';

const THEME_STORAGE_KEY = 'dumaloq-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузка темы из localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      // Автоопределение темы по системным настройкам
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    setIsLoaded(true);
  }, []);

  // Применение темы к документу
  useEffect(() => {
    if (!isLoaded) return;

    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Сохранение в localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, isLoaded]);

  // Переключение темы
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Установка конкретной темы
  const setThemeExplicit = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  return {
    theme,
    isLoaded,
    toggleTheme,
    setTheme: setThemeExplicit,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };
}
