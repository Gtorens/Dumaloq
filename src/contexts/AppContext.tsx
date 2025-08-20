'use client'

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { translations, Translation } from '../lib/translations';

export type Theme = 'light' | 'dark';
export type Language = 'ru' | 'en' | 'uz';

interface AppContextType {
  theme: Theme;
  setTheme: (_theme: Theme) => void;
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
      return savedTheme || 'light'; // Изменено с 'dark' на 'light'
    }
    return 'light'; // Изменено с 'dark' на 'light'
  });
  const [language, setLanguage] = useState<Language>('ru');
  const [currentSection, setCurrentSection] = useState<string>('about');

  useEffect(() => {
    const root = window.document.documentElement;
    // Убираем все классы тем и добавляем текущую
    root.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const texts = useMemo(() => {
    const result = translations[language] || translations.ru;
    return result;
  }, [language]);

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, texts, currentSection, setCurrentSection }}>
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
