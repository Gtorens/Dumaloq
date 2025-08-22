import React, { useState, useCallback } from 'react';
import { CarIcon, MountainIcon, MapPinIcon } from './IconComponents';
import { useAppContext } from '../../contexts/AppContext';
import AnimatedSection from '../ui/AnimatedSection';

// Декоративные элементы для боковых сторон в стиле киберпанк
const DecorativeElements: React.FC = () => (
  <>
    {/* Левая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute left-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-20 left-10 w-16 h-px bg-gradient-to-r from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-20 left-10 w-px h-16 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Треугольники */}
        <div className="absolute top-40 left-20 w-0 h-0 border-l-[6px] border-l-accent-red/35 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-60 left-8 w-0 h-0 border-r-[8px] border-r-accent-red/30 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Квадраты */}
        <div className="absolute top-80 left-16 w-5 h-5 border border-accent-red/30 rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-32 left-24 w-14 h-px bg-accent-red/50 transform rotate-45 origin-left"></div>
        <div className="absolute top-64 left-20 w-16 h-px bg-accent-red/40 transform -rotate-45 origin-left"></div>
        
        {/* Сетка */}
        <div className="absolute top-48 left-4 w-6 h-6 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
        
        {/* Иконки */}
        <div className="absolute bottom-20 left-8 text-accent-red/50">
          <MountainIcon className="w-12 h-12" />
        </div>
      </div>
    </div>

    {/* Правая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute right-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-24 right-12 w-12 h-px bg-gradient-to-l from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-24 right-12 w-px h-12 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Ромбы */}
        <div className="absolute top-48 right-8 w-4 h-4 border border-accent-red/25 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-72 right-16 w-3 h-3 bg-accent-red/40 transform rotate-45 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-88 right-10 w-4 h-4 bg-accent-red/35 transform rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-32 right-20 w-14 h-px bg-accent-red/50 transform -rotate-45 origin-right"></div>
        <div className="absolute top-64 right-24 w-16 h-px bg-accent-red/40 transform rotate-45 origin-right"></div>
        
        {/* Сетка */}
        <div className="absolute top-56 right-4 w-5 h-5 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
        
        {/* Иконки */}
        <div className="absolute bottom-24 right-8 text-accent-red/50">
          <CarIcon className="w-12 h-12" />
        </div>
      </div>
    </div>
  </>
);

// Простая и чистая статическая SVG карта
const StaticMap: React.FC<{ theme: string }> = React.memo(({ theme }) => (
  <svg width="100%" height="100%" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Простой фон без лишних элементов */}
    <rect width="600" height="400" fill={theme === 'dark' ? '#374151' : '#f8fafc'}/>
    
    {/* Основная область карты */}
    <rect x="50" y="50" width="500" height="300" rx="12" 
          fill={theme === 'dark' ? '#4b5563' : '#ffffff'} 
          stroke={theme === 'dark' ? '#6b7280' : '#e2e8f0'} 
          strokeWidth="1"/>
    
    {/* Простые дороги */}
    <path d="M 80 200 L 520 200" stroke={theme === 'dark' ? '#9ca3af' : '#cbd5e1'} strokeWidth="3" strokeLinecap="round"/>
    <path d="M 300 80 L 300 320" stroke={theme === 'dark' ? '#9ca3af' : '#cbd5e1'} strokeWidth="3" strokeLinecap="round"/>
    
    {/* Только одна метка геолокации - простая и четкая */}
    <circle cx="300" cy="200" r="20" fill="#ef4444" stroke="#ffffff" strokeWidth="3"/>
    
    {/* Название Dumoloq */}
    <text x="300" y="150" fontFamily="Inter, Arial, sans-serif" fontSize="18" 
          fill={theme === 'dark' ? '#ffffff' : '#1e293b'} textAnchor="middle" fontWeight="600">
      Dumoloq
    </text>
    
    {/* Подзаголовок */}
    <text x="300" y="170" fontFamily="Inter, Arial, sans-serif" fontSize="12" 
          fill={theme === 'dark' ? '#9ca3af' : '#64748b'} textAnchor="middle" fontWeight="500">
      Shopping Center
    </text>
  </svg>
));

// Индикатор загрузки
const LoadingSpinner: React.FC = React.memo(() => (
  <div className="flex items-center justify-center h-full">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-accent-red border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-accent-red rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    </div>
    <div className="ml-4 text-accent-red font-medium">
      {document.documentElement.lang === 'ru' ? 'Загрузка карты...' : 'Loading map...'}
    </div>
  </div>
));

const Location: React.FC = React.memo(() => {
  const { texts, theme } = useAppContext();
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMapClick = useCallback(() => {
    setIsLoading(true);
    // Небольшая задержка для показа анимации загрузки
    setTimeout(() => {
      setIsMapLoaded(true);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleResetMap = useCallback(() => {
    setIsMapLoaded(false);
  }, []);

  return (
    <section className="py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-300 modern-section section-spacing">
      <DecorativeElements />
      <div className="container mx-auto px-4">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{texts.location.title}</h2>
          <p className="max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {texts.location.subtitle}
          </p>
        </AnimatedSection>
        <div className="flex flex-col xl:flex-row gap-12 items-start">
          <AnimatedSection direction="left" delay={100} className="w-full xl:w-2/5 h-96 rounded-lg overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 relative">
            {isLoading ? (
              <div className="w-full h-full bg-light-background dark:bg-dark-background flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : !isMapLoaded ? (
              <div 
                className="w-full h-full cursor-pointer relative group transition-all duration-300 hover:scale-[1.02]"
                onClick={handleMapClick}
              >
                {/* Статическое изображение карты */}
                <StaticMap theme={theme} />
                
                {/* Простой overlay без лишних элементов */}
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 flex flex-col items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-20 h-20 mx-auto mb-4 bg-accent-red bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <svg className="w-10 h-10 text-accent-red" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 11.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-lg">
                      {texts.location.map.title}
                    </h3>
                    <p className="text-sm text-white drop-shadow-lg opacity-90">
                      {theme === 'dark' ? 'Нажмите для загрузки карты' : 'Click to load map'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full animate-fade-in relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.916175953041!2d69.7559563154084!3d41.55231067924844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDMzJzA4LjMiTiA2OcKwNDUnMzAuNyJF!5e0!3m2!1sen!2sus!4v1620912000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  className="dark:filter dark:grayscale-[1] dark:contrast-[1.2] dark:opacity-[0.8]"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Dumoloq Location"
                />
                
                {/* Кнопка сброса карты */}
                <button
                  onClick={handleResetMap}
                  className="absolute top-4 right-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                  title={theme === 'dark' ? 'Вернуться к схеме' : 'Back to schematic'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            )}
          </AnimatedSection>
          
          <AnimatedSection direction="right" delay={200} className="w-full xl:w-3/5">
            <div className="space-y-6 max-w-none">
            <div className={`location-card wide-card ${theme === 'light' ? 'light-card-specific' : ''}`}>
              <div className="flex items-center text-xl font-semibold mb-3">
                <MapPinIcon className="w-6 h-6 mr-3 text-accent-red" />
                {texts.location.map.title}
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=41.552305,69.758531" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent-red hover:underline text-lg font-medium"
              >
                {texts.location.map.link}
              </a>
            </div>
            <div className={`location-card wide-card ${theme === 'light' ? 'light-card-specific' : ''}`}>
              <div className="flex items-center text-xl font-semibold mb-3">
                 <CarIcon className="w-6 h-6 mr-3 text-accent-red" />
                 {texts.location.traffic.title}
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
                <strong className="text-light-text dark:text-dark-text text-3xl font-bold dark:drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">{texts.location.traffic.value}</strong> {texts.location.traffic.description}
              </p>
            </div>
            <div className={`location-card wide-card ${theme === 'light' ? 'light-card-specific' : ''}`}>
              <div className="flex items-center text-xl font-semibold mb-3">
                <MountainIcon className="w-6 h-6 mr-3 text-accent-red" />
                {texts.location.radius.title}
              </div>
              <ul className="list-disc list-inside text-light-text-secondary dark:text-dark-text-secondary space-y-2 text-lg">
                {texts.location.radius.items.map((item, index) => (
                   <li key={index}><strong className="text-light-text dark:text-dark-text">{item.label}</strong> {item.value}</li>
                ))}
              </ul>
            </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
});

StaticMap.displayName = 'StaticMap';
LoadingSpinner.displayName = 'LoadingSpinner';
Location.displayName = 'Location';

export default Location;