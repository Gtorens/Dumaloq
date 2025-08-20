import React, { useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Footer: React.FC = React.memo(() => {
    const { texts } = useAppContext();
    
    // Мемоизируем год для оптимизации
    const currentYear = useMemo(() => new Date().getFullYear(), []);
    
    return (
    <footer className="bg-light-background dark:bg-dark-background py-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 section-spacing">
      <div className="container mx-auto px-4 text-center text-light-text-secondary dark:text-dark-text-secondary">
        <p>&copy; {currentYear} {texts.footer.copyright}</p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;