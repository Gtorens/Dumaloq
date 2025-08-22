import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';

// Создаем простой тестовый компонент
const TestComponent = () => {
  const [theme, setTheme] = React.useState('dark');
  const [language, setLanguage] = React.useState('ru');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div data-testid="test-app">
      <header data-testid="header">
        <button data-testid="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <select 
          data-testid="language-selector" 
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="ru">RU</option>
          <option value="en">EN</option>
          <option value="uz">UZ</option>
        </select>
      </header>
      
      <main data-testid="hero-section">
        <h1>Главный экран</h1>
        <button data-testid="hero-cta" onClick={() => {/* CTA clicked */}}>
          Посмотреть площади
        </button>
      </main>
    </div>
  );
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('Theme and Language Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the app with initial state', () => {
    renderWithProviders(<TestComponent />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('should have theme toggle button', () => {
    renderWithProviders(<TestComponent />);
    
    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toBeInTheDocument();
    expect(themeToggle).toHaveTextContent('🌙');
  });

  it('should have language selector', () => {
    renderWithProviders(<TestComponent />);
    
    const languageSelector = screen.getByTestId('language-selector');
    expect(languageSelector).toBeInTheDocument();
    
    const options = languageSelector.querySelectorAll('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveValue('ru');
    expect(options[1]).toHaveValue('en');
    expect(options[2]).toHaveValue('uz');
  });

  it('should have hero CTA button', () => {
    renderWithProviders(<TestComponent />);
    
    const heroCTA = screen.getByTestId('hero-cta');
    expect(heroCTA).toBeInTheDocument();
    expect(heroCTA).toHaveTextContent('Посмотреть площади');
  });

  it('should handle hero CTA click', () => {
    const mockCallback = vi.fn();
    const TestComponentWithCallback = () => {
      const [theme, setTheme] = React.useState('dark');
      const [language, setLanguage] = React.useState('ru');

      const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      };

      const changeLanguage = (lang: string) => {
        setLanguage(lang);
      };

      return (
        <div data-testid="test-app">
          <header data-testid="header">
            <button data-testid="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <select 
              data-testid="language-selector" 
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
              <option value="uz">UZ</option>
            </select>
          </header>
          
          <main data-testid="hero-section">
            <h1>Главный экран</h1>
            <button data-testid="hero-cta" onClick={mockCallback}>
              Посмотреть площади
            </button>
          </main>
        </div>
      );
    };

    renderWithProviders(<TestComponentWithCallback />);
    
    const heroCTA = screen.getByTestId('hero-cta');
    fireEvent.click(heroCTA);
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should handle rapid language switches without errors', () => {
    renderWithProviders(<TestComponent />);
    
    const languageSelector = screen.getByTestId('language-selector');
    
    // Быстро переключаем языки
    fireEvent.change(languageSelector, { target: { value: 'en' } });
    fireEvent.change(languageSelector, { target: { value: 'uz' } });
    fireEvent.change(languageSelector, { target: { value: 'ru' } });
    
    // Проверяем, что приложение не упало
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should handle theme toggle without errors', () => {
    renderWithProviders(<TestComponent />);
    
    const themeToggle = screen.getByTestId('theme-toggle');
    
    // Кликаем на переключатель темы
    fireEvent.click(themeToggle);
    
    // Проверяем, что тема изменилась
    expect(themeToggle).toHaveTextContent('☀️');
    
    // Кликаем еще раз
    fireEvent.click(themeToggle);
    expect(themeToggle).toHaveTextContent('🌙');
  });
});
