import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Header: React.FC = React.memo(() => {
  const { texts, theme, setTheme, language, setLanguage } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Определяем, прокручена ли страница
    setIsScrolled(currentScrollY > 50);
    
    // Логика скрытия/показа header при прокрутке
    if (currentScrollY < 100) {
      // Всегда показываем header в верхней части страницы
      setIsHeaderVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
      // Скрываем при прокрутке вниз (после 200px)
      setIsHeaderVisible(false);
    } else if (currentScrollY < lastScrollY) {
      // Показываем при прокрутке вверх
      setIsHeaderVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

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
  const headerClasses = useMemo(() => {
    const baseClasses = 'fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-in-out mx-auto';
    const visibilityClasses = isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0';
    const backgroundClasses = isScrolled 
      ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl' 
      : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-xl';
    const shapeClasses = 'rounded-2xl border-2 border-red-500/40 dark:border-red-400/50';
    const glowClasses = isScrolled
      ? 'shadow-[0_0_40px_rgba(220,38,38,0.15)] dark:shadow-[0_0_40px_rgba(220,38,38,0.25)]'
      : 'shadow-[0_0_30px_rgba(220,38,38,0.1)] dark:shadow-[0_0_30px_rgba(220,38,38,0.2)]';
    const sizeClasses = 'max-w-7xl';
    
    return `${baseClasses} ${visibilityClasses} ${backgroundClasses} ${shapeClasses} ${glowClasses} ${sizeClasses}`;
  }, [isScrolled, isHeaderVisible]);

  return (
    <header 
      className={headerClasses}
      role="banner"
    >
      <div className="px-6 lg:px-8">
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
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 min-h-[44px] min-w-[44px] active:scale-95 touch-manipulation"
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
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'ru' | 'en' | 'uz')}
                className="
                  appearance-none pl-10 pr-8 py-3 rounded-lg 
                  bg-gray-100 dark:bg-gray-700 
                  border-0 focus:ring-2 focus:ring-accent-red 
                  transition-all duration-300 
                  text-gray-800 dark:text-gray-200 
                  min-h-[44px] cursor-pointer 
                  hover:bg-gray-200 dark:hover:bg-gray-600
                  active:scale-95 touch-manipulation
                  font-medium
                "
                aria-label="Выберите язык"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
                <option value="uz">O'zbek</option>
              </select>
              
              {/* Иконка глобуса */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              
              {/* Стрелка вниз */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Кнопка мобильного меню */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 min-h-[44px] min-w-[44px] active:scale-95 touch-manipulation"
              aria-label="Открыть меню"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <nav 
            className="lg:hidden py-6 mt-4 border-t border-gray-200/50 dark:border-gray-700/50 animate-fade-in rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" 
            role="navigation" 
            aria-label="Мобильное меню"
          >
            <div className="flex flex-col space-y-1">
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg touch-manipulation active:scale-95"
              >
                {texts.header.navigation.about}
              </a>
              <a 
                href="#tenants" 
                onClick={(e) => { e.preventDefault(); scrollToSection('tenants'); }}
                className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg touch-manipulation active:scale-95"
              >
                {texts.header.navigation.tenants}
              </a>
              <a 
                href="#floors" 
                onClick={(e) => { e.preventDefault(); scrollToSection('floors'); }}
                className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg touch-manipulation active:scale-95"
              >
                {texts.header.navigation.floors}
              </a>
              <a 
                href="#plans" 
                onClick={(e) => { e.preventDefault(); scrollToSection('plans'); }}
                className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg touch-manipulation active:scale-95"
              >
                {texts.header.navigation.plans}
              </a>
              <a 
                href="#faq" 
                onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
                className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg touch-manipulation active:scale-95"
              >
                {texts.header.navigation.faq}
              </a>
              <a 
                href="#contacts" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contacts'); }}
                className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:text-accent-red dark:hover:text-accent-red hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium rounded-lg touch-manipulation active:scale-95"
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