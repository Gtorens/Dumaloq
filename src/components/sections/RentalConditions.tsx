import React, { useCallback } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AnimatedSection } from '../ui';

// Декоративные элементы для секции RentalConditions в стиле киберпанк
const RentalDecorations: React.FC = () => (
  <>
    {/* Левая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute left-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-16 left-12 w-20 h-px bg-gradient-to-r from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-16 left-12 w-px h-20 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Треугольники */}
        <div className="absolute bottom-16 left-8 w-0 h-0 border-l-[8px] border-l-accent-red/20 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-32 left-20 w-0 h-0 border-r-[6px] border-r-accent-red/25 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Квадраты */}
        <div className="absolute top-24 left-4 w-6 h-6 border border-accent-red/30 rotate-45 animate-pulse"></div>
        
        {/* Символы валюты */}
        <div className="absolute top-1/4 left-16 text-accent-red/60 text-2xl animate-pulse">$</div>
        <div className="absolute bottom-1/4 left-12 text-accent-red/50 text-xl animate-pulse" style={{animationDelay: '1.5s'}}>%</div>
        
        {/* Диагональные линии */}
        <div className="absolute top-28 left-24 w-16 h-px bg-accent-red/50 transform rotate-45 origin-left"></div>
        <div className="absolute bottom-24 left-20 w-18 h-px bg-accent-red/40 transform -rotate-45 origin-left"></div>
        
        {/* Сетка */}
        <div className="absolute top-40 left-4 w-8 h-8 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
      </div>
    </div>

    {/* Правая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute right-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-20 right-10 w-18 h-px bg-gradient-to-l from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-20 right-10 w-px h-18 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Ромбы */}
        <div className="absolute bottom-20 right-14 w-5 h-5 border border-accent-red/25 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-40 right-16 w-4 h-4 bg-accent-red/30 transform rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Символы валюты */}
        <div className="absolute top-1/3 right-12 text-accent-red/60 text-2xl animate-pulse" style={{animationDelay: '0.8s'}}>₽</div>
        <div className="absolute bottom-1/3 right-16 text-accent-red/50 text-xl animate-pulse" style={{animationDelay: '2.2s'}}>€</div>
        
        {/* Диагональные линии */}
        <div className="absolute top-28 right-20 w-16 h-px bg-accent-red/50 transform -rotate-45 origin-right"></div>
        <div className="absolute bottom-24 right-24 w-18 h-px bg-accent-red/40 transform rotate-45 origin-right"></div>
        
        {/* Сетка */}
        <div className="absolute top-48 right-4 w-6 h-6 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
      </div>
    </div>
  </>
);

interface RentalConditionsProps {
    onCTAClick: () => void;
}

const RentalConditions: React.FC<RentalConditionsProps> = React.memo(({ onCTAClick }) => {
    const { texts } = useAppContext();

    const handleClick = useCallback(() => {
        onCTAClick();
    }, [onCTAClick]);

    return (
        <section className="py-20 section-variant-2 transition-colors duration-300 section-spacing relative overflow-hidden">
            <RentalDecorations />
            <div className="container mx-auto px-4 text-center relative z-10">
                <AnimatedSection animation="fadeInUp">
                    <div className="section-card max-w-4xl mx-auto p-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
                            {texts.rentalConditions.title}
                        </h2>
                        <p className="max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8">
                            {texts.rentalConditions.description}
                        </p>
                        <button
                            onClick={handleClick}
                            className="modern-button text-lg py-4 px-8"
                        >
                            {texts.rentalConditions.cta}
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
});

RentalConditions.displayName = 'RentalConditions';

export default RentalConditions;
