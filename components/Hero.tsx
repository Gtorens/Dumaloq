import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

interface HeroProps {
  onCTAClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCTAClick }) => {
  const { texts } = useAppContext();
  const [offsetY, setOffsetY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // без лишних логов/тестов — оставляем только реакцию на состояние
  }, [imageLoaded, imageError]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
                <section 
              className="hero-section flex items-center justify-center text-center text-white section-spacing"
            >
      {/* Фоновое изображение с оптимизацией */}
      <div 
        className={`hero-background blur ${imageLoaded ? 'loaded' : imageError ? 'error' : 'loading'}`}
        style={{ 
          backgroundImage: imageError ? 'none' : "url('/images/hero-building.jpg')",
          backgroundColor: imageError ? '#1a1a1a' : 'transparent',
          // Оптимизация для мобильных - используем меньшее изображение
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform' // Оптимизация для анимаций
        }}
      />
      
      {/* Скрытое изображение для предзагрузки с оптимизацией */}
      <img 
        src="/images/hero-building.jpg"
        alt="Hero building"
        style={{ display: 'none' }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="eager" // Загружаем сразу для hero изображения
        decoding="async" // Асинхронное декодирование
      />
      
      {/* Индикатор загрузки */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {/* Затемнение */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* Fallback градиент если изображение не загрузилось */}
      {imageError && (
        <div 
          className="absolute inset-0 z-1"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)'
          }}
        />
      )}
      
      {/* Контент */}
      <div className="relative z-10 p-4 max-w-4xl mx-auto animate-fade-in">
        <h1 
          className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight opacity-0 animate-fade-in-up" 
          style={{
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)', 
            animationDelay: '0.3s'
          }}
        >
          {texts.hero.title}
        </h1>
        <p 
          className="text-lg md:text-2xl mb-8 font-light max-w-3xl mx-auto opacity-0 animate-fade-in-up" 
          style={{animationDelay: '0.6s'}}
        >
          {texts.hero.subtitle}
        </p>
        <button
          onClick={onCTAClick}
          className="modern-button opacity-0 animate-fade-in-up"
          style={{animationDelay: '0.9s'}}
        >
          {texts.hero.cta}
        </button>
      </div>
    </section>
  );
};

export default Hero;