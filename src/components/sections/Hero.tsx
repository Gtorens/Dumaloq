import React, { useState, useCallback, useMemo } from 'react';
// useAppContext используется в HeroContent компоненте
import SEO from '../ui/SEO';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import HeroLoadingIndicator from './hero/HeroLoadingIndicator';
import { useStyles } from '../../hooks/usePerformance';
import { useParallax, useRotatingParallax } from '../../hooks/useParallax';

// Декоративные элементы для Hero секции с параллаксом
const HeroDecorations: React.FC = () => {
  // Параллакс эффекты для разных слоев
  const slowParallax = useParallax({ speed: 0.2, direction: 'up' });
  const mediumParallax = useParallax({ speed: 0.4, direction: 'down' });
  const fastParallax = useParallax({ speed: 0.6, direction: 'up' });
  const rotatingElement = useRotatingParallax(0.3);

  return (
    <>
      {/* Левая сторона - киберпанк геометрия с параллаксом */}
      <div className="hidden xl:block absolute left-0 top-0 w-64 h-full pointer-events-none z-10">
        <div className="relative w-full h-full">
          {/* Градиентный фон с медленным параллаксом */}
          <div 
            ref={slowParallax.ref as any}
            className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"
            style={{ transform: slowParallax.transform }}
          ></div>
          
          {/* Геометрические линии с быстрым параллаксом */}
          <div 
            ref={fastParallax.ref as any}
            style={{ transform: fastParallax.transform }}
            className="absolute top-20 left-10"
          >
            <div className="w-32 h-px bg-gradient-to-r from-red-500/60 via-red-500/40 to-transparent"></div>
            <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-red-500/60 via-red-500/40 to-transparent"></div>
          </div>
          
          {/* Вращающиеся элементы */}
          <div 
            ref={rotatingElement.ref as any}
            style={{ transform: rotatingElement.transform }}
            className="absolute top-32 left-12 w-8 h-8 border border-red-500/50 origin-center animate-pulse"
          ></div>
          
          {/* Треугольники с параллаксом */}
          <div 
            ref={mediumParallax.ref as any}
            style={{ transform: mediumParallax.transform }}
            className="absolute top-40 left-20"
          >
            <div className="w-0 h-0 border-l-[10px] border-l-red-500/30 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent animate-pulse"></div>
            <div className="absolute top-20 -left-12 w-0 h-0 border-r-[12px] border-r-red-500/20 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          {/* Плавающие точки */}
          <div className="absolute top-1/4 left-12 w-2 h-2 bg-red-500/60 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-16 w-1.5 h-1.5 bg-red-500/50 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
          
          {/* Диагональные линии с параллаксом */}
          <div 
            style={{ transform: `${slowParallax.transform} rotate(45deg)` }}
            className="absolute top-28 left-16 w-20 h-px bg-red-500/50 origin-left"
          ></div>
          <div 
            style={{ transform: `${mediumParallax.transform} rotate(-45deg)` }}
            className="absolute top-72 left-24 w-16 h-px bg-red-500/40 origin-left"
          ></div>
          
          {/* Сетка */}
          <div className="absolute top-48 left-4 w-8 h-8 border border-red-500/30 opacity-60 animate-pulse">
            <div className="w-full h-px bg-red-500/30 mt-1/2"></div>
            <div className="w-px h-full bg-red-500/30 ml-1/2"></div>
          </div>
        </div>
      </div>

      {/* Правая сторона - киберпанк геометрия с параллаксом */}
      <div className="hidden xl:block absolute right-0 top-0 w-64 h-full pointer-events-none z-10">
        <div className="relative w-full h-full">
          {/* Градиентный фон с медленным параллаксом */}
          <div 
            style={{ transform: slowParallax.transform }}
            className="absolute inset-0 bg-gradient-to-l from-red-500/10 to-transparent"
          ></div>
          
          {/* Геометрические линии с быстрым параллаксом */}
          <div 
            style={{ transform: fastParallax.transform }}
            className="absolute top-24 right-12"
          >
            <div className="w-32 h-px bg-gradient-to-l from-red-500/60 via-red-500/40 to-transparent"></div>
            <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-red-500/60 via-red-500/40 to-transparent"></div>
          </div>
          
          {/* Ромбы с параллаксом */}
          <div 
            style={{ transform: mediumParallax.transform }}
            className="absolute top-48 right-8"
          >
            <div className="w-6 h-6 border border-red-500/35 rotate-45 opacity-60 animate-pulse"></div>
            <div className="absolute top-24 right-8 w-4 h-4 bg-red-500/45 transform rotate-45 opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          {/* Треугольники */}
          <div className="absolute top-40 right-0 w-0 h-0 border-r-[8px] border-r-red-500/40 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent animate-pulse"></div>
          <div className="absolute top-88 right-0 w-0 h-0 border-l-[6px] border-l-red-500/30 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent animate-pulse" style={{animationDelay: '2.2s'}}></div>
          
          {/* Плавающие точки */}
          <div className="absolute top-1/3 right-10 w-2 h-2 bg-red-500/60 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 right-14 w-1.5 h-1.5 bg-red-500/50 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
          
          {/* Диагональные линии с параллаксом */}
          <div 
            style={{ transform: `${slowParallax.transform} rotate(-45deg)` }}
            className="absolute top-36 right-20 w-18 h-px bg-red-500/50 origin-right"
          ></div>
          <div 
            style={{ transform: `${mediumParallax.transform} rotate(45deg)` }}
            className="absolute top-64 right-28 w-14 h-px bg-red-500/40 origin-right"
          ></div>
          
          {/* Сетка */}
          <div className="absolute top-56 right-4 w-6 h-6 border border-red-500/30 opacity-60 animate-pulse" style={{animationDelay: '3s'}}>
            <div className="w-full h-px bg-red-500/30 mt-1/2"></div>
            <div className="w-px h-full bg-red-500/30 ml-1/2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

interface HeroProps {
  onCTAClick: () => void;
}

const Hero: React.FC<HeroProps> = React.memo(({ onCTAClick }) => {
  // texts используется в HeroContent компоненте
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Мемоизация стилей для оптимизации
  const heroStyles = useStyles({
    background: imageError ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)' : undefined
  }, [imageError]);

  // Мемоизация SEO пропсов
  const seoProps = useMemo(() => ({
    title: "Торгово-развлекательный центр Dumoloq - Лучшие места для бизнеса",
    description: "Аренда коммерческих помещений в ТРЦ Dumoloq. Выгодные условия, премиум локации, высокий трафик. Забронируйте лучшее место для вашего бизнеса!",
    keywords: "ТРЦ Dumoloq, аренда помещений, коммерческая недвижимость, торговый центр, Ташкент, Узбекистан, аренда магазинов, бизнес помещения",
    image: "/images/hero-building.jpg",
    type: "business.business" as const
  }), []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <>
      <SEO {...seoProps} />
      
      <section 
        className="hero-section flex items-center justify-center text-center text-white section-spacing relative overflow-hidden"
        aria-label="Главный экран"
        itemScope
        itemType="https://schema.org/Place"
      >
        {/* Структурированные данные для Hero секции */}
        <meta itemProp="name" content="ТРЦ Dumoloq" />
        <meta itemProp="description" content="Современный торгово-развлекательный центр" />
        
        <HeroBackground 
          imageLoaded={imageLoaded}
          imageError={imageError}
          onImageLoad={handleImageLoad}
          onImageError={handleImageError}
        />
        
        <HeroLoadingIndicator 
          imageLoaded={imageLoaded}
          imageError={imageError}
        />
        
        {/* Затемнение */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        {/* Fallback градиент если изображение не загрузилось */}
        {imageError && (
          <div 
            className="absolute inset-0 z-1"
            style={heroStyles}
          />
        )}
        
        {/* Декоративные элементы */}
        <HeroDecorations />
        
        <HeroContent onCTAClick={onCTAClick} />
      </section>
    </>
  );
});

Hero.displayName = 'Hero';

export default Hero;