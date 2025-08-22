import React, { useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { MapPinIcon, UsersIcon, ShieldCheckIcon, CogIcon } from './IconComponents';
import AnimatedSection from '../ui/AnimatedSection';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';

// Декоративные элементы для фона в стиле киберпанк
const BackgroundDecorations: React.FC = () => (
  <>
    {/* Боковые декоративные элементы */}
    <div className="hidden xl:block absolute left-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-20 left-10 w-28 h-px bg-gradient-to-r from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-20 left-10 w-px h-28 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Треугольники */}
        <div className="absolute top-48 left-16 w-0 h-0 border-l-[10px] border-l-accent-red/35 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-6 w-0 h-0 border-r-[12px] border-r-accent-red/25 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Квадраты */}
        <div className="absolute top-32 left-12 w-8 h-8 border border-accent-red/30 rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Анимированные точки */}
        <div className="absolute top-1/4 left-12 w-2 h-2 bg-accent-red/80 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-20 w-1.5 h-1.5 bg-accent-red/90 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-28 left-24 w-20 h-px bg-accent-red/50 transform rotate-45 origin-left"></div>
        <div className="absolute bottom-16 left-28 w-16 h-px bg-accent-red/40 transform -rotate-45 origin-left"></div>
        
        {/* Сетка */}
        <div className="absolute top-40 left-4 w-10 h-10 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
      </div>
    </div>
    
    <div className="hidden xl:block absolute right-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-24 right-12 w-28 h-px bg-gradient-to-l from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-24 right-12 w-px h-28 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Ромбы */}
        <div className="absolute top-56 right-8 w-6 h-6 border border-accent-red/40 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-16 right-16 w-8 h-8 bg-accent-red/30 transform rotate-45 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-40 right-16 w-5 h-5 bg-accent-red/35 transform rotate-45 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        
        {/* Анимированные точки */}
        <div className="absolute top-1/3 right-14 w-2 h-2 bg-accent-red/80 rounded-full animate-ping" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-1/4 right-10 w-1.5 h-1.5 bg-accent-red/90 rounded-full animate-ping" style={{animationDelay: '2.2s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-32 right-20 w-18 h-px bg-accent-red/50 transform -rotate-45 origin-right"></div>
        <div className="absolute bottom-24 right-24 w-20 h-px bg-accent-red/40 transform rotate-45 origin-right"></div>
        
        {/* Сетка */}
        <div className="absolute top-48 right-4 w-8 h-8 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
      </div>
    </div>
  </>
);

const iconMap: { [key: string]: React.ReactNode } = {
    mapPin: <MapPinIcon className="feature-icon" />,
    users: <UsersIcon className="feature-icon" />,
    shieldCheck: <ShieldCheckIcon className="feature-icon" />,
    cog: <CogIcon className="feature-icon" />
};

const Opportunities: React.FC = React.memo(() => {
    const { texts } = useAppContext();
    
    // Мемоизируем iconMap для оптимизации
    const memoizedIconMap = useMemo(() => iconMap, []);
    
    // Используем staggered анимацию для карточек
    const cardAnimations = useStaggeredAnimation(texts.opportunities.items.length, 150);
    
    return (
        <section className="py-20 section-variant-2 transition-colors duration-300 modern-section section-spacing relative overflow-hidden">
            <BackgroundDecorations />
            <div className="container mx-auto px-4 relative z-10">
                <AnimatedSection direction="up" className="text-center mb-16">
                    <h2 className="opportunities-title mb-4 text-light-text dark:text-dark-text">{texts.opportunities.title}</h2>
                </AnimatedSection>
                <div className="modern-card-grid max-w-7xl mx-auto">
                    {texts.opportunities.items.map((item, index) => {
                        const animation = cardAnimations[index];
                        return (
                            <div 
                                key={item.title}
                                ref={animation.ref as React.RefObject<HTMLDivElement>}
                                className={`section-card card-spacing opportunity-card-specific relative group hover:scale-105 transition-all duration-300 ${animation.animationClass}`}
                            >
                                {/* Декоративный фон карточки */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-center items-center mb-4 text-accent-red group-hover:scale-110 transition-transform duration-300">
                                        {memoizedIconMap[item.icon]}
                                    </div>
                                    <h3 className="opportunity-card-title mb-2 text-light-text dark:text-dark-text group-hover:text-accent-red transition-colors duration-300">{item.title}</h3>
                                    <p className="opportunity-card-description text-light-text-secondary dark:text-dark-text-secondary">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});

Opportunities.displayName = 'Opportunities';

export default Opportunities;
