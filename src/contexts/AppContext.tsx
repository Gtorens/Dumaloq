import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { translations, Translation } from '../lib/translations';
import { useDebounce } from '../hooks/usePerformance';

export type Theme = 'light' | 'dark';
export type Language = 'ru' | 'en' | 'uz';

interface AppContextType {
  theme: Theme;
  setTheme: (_theme: Theme) => void;
  resetToSystemTheme: () => void;
  language: Language;
  setLanguage: (_language: Language) => void;
  texts: Translation;
  currentSection: string;
  setCurrentSection: (_section: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Загружаем тему из localStorage при инициализации
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        return savedTheme;
      }
      
      // Если нет сохраненной темы, определяем по системным настройкам
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  });
  const [language, setLanguage] = useState<Language>('ru');
  const [currentSection, setCurrentSection] = useState<string>('about');

  // Создаем debounced функцию на верхнем уровне
  const debouncedScrollHandler = useDebounce(() => {
    const sections = ['about', 'tenants', 'floors', 'plans', 'faq', 'contacts'];
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          setCurrentSection(section);
          break;
        }
      }
    }
  }, 100);

  useEffect(() => {
    const root = window.document.documentElement;
    // Убираем все классы тем и добавляем текущую
    root.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Слушатель изменений системной темы
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Обновляем только если пользователь не сохранял предпочтение
      if (!localStorage.getItem('theme')) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', debouncedScrollHandler);
  }, [debouncedScrollHandler]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);
  
  const resetToSystemTheme = useCallback(() => {
    // Удаляем сохраненное предпочтение и возвращаемся к системной теме
    localStorage.removeItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setThemeState(prefersDark ? 'dark' : 'light');
  }, []);
  
  const texts = useMemo(() => {
    const result = translations[language] || translations.ru;
    return result;
  }, [language]);

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    resetToSystemTheme,
    language,
    setLanguage,
    texts,
    currentSection,
    setCurrentSection
  }), [theme, setTheme, resetToSystemTheme, language, setLanguage, texts, currentSection, setCurrentSection]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    console.error('useAppContext must be used within an AppProvider');
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
