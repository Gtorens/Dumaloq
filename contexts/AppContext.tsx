import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { translations, Translation } from '../lib/translations';

export type Theme = 'light' | 'dark';
export type Language = 'ru' | 'en' | 'uz';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  texts: Translation;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const texts = useMemo(() => {
    const result = translations[language] || translations.ru;
    return result;
  }, [language]);

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, texts }}>
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
