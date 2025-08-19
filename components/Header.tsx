import React, { useState, useEffect } from 'react';
import { useAppContext, Language } from '../contexts/AppContext';
import { SunIcon, MoonIcon, GlobeIcon, ChevronDownIcon } from './IconComponents';

const Header: React.FC = () => {
  const { theme, setTheme, language, setLanguage, texts, currentSection } = useAppContext();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  
  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-dropdown') && !target.closest('button[aria-label="Change language"]')) {
        setIsLangDropdownOpen(false);
      }
    };

    if (isLangDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangDropdownOpen]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const languages: { code: Language; name: string }[] = [
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
    { code: 'uz', name: 'O\'zbekcha' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700/50">
      <div className="container mx-auto px-4 py-2 md:py-4 flex justify-between items-center">
        <h1 className="text-light-text dark:text-dark-text text-xl md:text-3xl font-extrabold tracking-wider">
          {texts.header.title}
        </h1>
        
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#about" 
            className={`nav-link ${
              currentSection === 'about' 
                ? 'text-accent-red font-semibold active' 
                : 'text-light-text dark:text-dark-text hover:text-accent-red'
            }`}
          >
            {texts.header.navigation.about}
          </a>
          <a 
            href="#tenants" 
            className={`nav-link ${
              currentSection === 'tenants' 
                ? 'text-accent-red font-semibold active' 
                : 'text-light-text dark:text-dark-text hover:text-accent-red'
            }`}
          >
            {texts.header.navigation.tenants}
          </a>
          <a 
            href="#floors" 
            className={`nav-link ${
              currentSection === 'floors' 
                ? 'text-accent-red font-semibold active' 
                : 'text-light-text dark:text-dark-text hover:text-accent-red'
            }`}
          >
            {texts.header.navigation.floors}
          </a>
          <a 
            href="#plans" 
            className={`nav-link ${
              currentSection === 'plans' 
                ? 'text-accent-red font-semibold active' 
                : 'text-light-text dark:text-dark-text hover:text-accent-red'
            }`}
          >
            {texts.header.navigation.plans}
          </a>
          <a 
            href="#faq" 
            className={`nav-link ${
              currentSection === 'faq' 
                ? 'text-accent-red font-semibold active' 
                : 'text-light-text dark:text-dark-text hover:text-accent-red'
            }`}
          >
            {texts.header.navigation.faq}
          </a>
          <a 
            href="#contacts" 
            className={`nav-link ${
              currentSection === 'contacts' 
                ? 'text-accent-red font-semibold active' 
                : 'text-light-text dark:text-dark-text hover:text-accent-red'
            }`}
          >
            {texts.header.navigation.contacts}
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 text-light-text dark:text-dark-text hover:text-accent-red dark:hover:text-accent-red transition-colors"
              aria-label="Change language"
            >
              <GlobeIcon className="w-6 h-6" />
              <span className="hidden sm:inline">{language.toUpperCase()}</span>
              <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ease-out ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-28 language-dropdown z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="w-full text-left px-3 py-2 text-sm text-light-text dark:text-dark-text language-option"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="text-light-text dark:text-dark-text hover:text-accent-red dark:hover:text-accent-red transition-colors p-2 rounded-full"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;