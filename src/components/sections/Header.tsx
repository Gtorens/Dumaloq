import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Header: React.FC = React.memo(() => {
  const { texts, theme, setTheme, language, setLanguage } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  }, [closeMenu]);

  // Мемоизируем классы для оптимизации
  const headerClasses = useMemo(() => 
    `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm'
    }`, [isScrolled]
  );

  return (
    <header 
      className={headerClasses}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Логотип */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-accent-red">
              {texts.header.title}
            </h1>
          </div>

          {/* Навигация для десктопа */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Главное меню">
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
            >
              {texts.header.navigation.about}
            </a>
            <a 
              href="#tenants" 
              onClick={(e) => { e.preventDefault(); scrollToSection('tenants'); }}
              className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
            >
              {texts.header.navigation.tenants}
            </a>
            <a 
              href="#floors" 
              onClick={(e) => { e.preventDefault(); scrollToSection('floors'); }}
              className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
            >
              {texts.header.navigation.floors}
            </a>
            <a 
              href="#plans" 
              onClick={(e) => { e.preventDefault(); scrollToSection('plans'); }}
              className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
            >
              {texts.header.navigation.plans}
            </a>
            <a 
              href="#faq" 
              onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
              className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
            >
              {texts.header.navigation.faq}
            </a>
            <a 
              href="#contacts" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contacts'); }}
              className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
            >
              {texts.header.navigation.contacts}
            </a>
          </nav>

          {/* Контролы темы и языка */}
          <div className="flex items-center space-x-4">
            {/* Переключатель темы */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
              aria-label={theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Переключатель языка */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'ru' | 'en' | 'uz')}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-accent-red transition-all duration-300 text-gray-800 dark:text-gray-200"
              aria-label="Выберите язык"
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
              <option value="uz">UZ</option>
            </select>

            {/* Кнопка мобильного меню */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
              aria-label="Открыть меню"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <nav 
            className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700" 
            role="navigation" 
            aria-label="Мобильное меню"
          >
            <div className="flex flex-col space-y-4">
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
              >
                {texts.header.navigation.about}
              </a>
              <a 
                href="#tenants" 
                onClick={(e) => { e.preventDefault(); scrollToSection('tenants'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
              >
                {texts.header.navigation.tenants}
              </a>
              <a 
                href="#floors" 
                onClick={(e) => { e.preventDefault(); scrollToSection('floors'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
              >
                {texts.header.navigation.floors}
              </a>
              <a 
                href="#plans" 
                onClick={(e) => { e.preventDefault(); scrollToSection('plans'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
              >
                {texts.header.navigation.plans}
              </a>
              <a 
                href="#faq" 
                onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
              >
                {texts.header.navigation.faq}
              </a>
              <a 
                href="#contacts" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contacts'); }}
                className="text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red transition-colors duration-300 font-medium"
              >
                {texts.header.navigation.contacts}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;