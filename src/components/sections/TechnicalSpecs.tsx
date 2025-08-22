import React, { useMemo } from 'react';
import { ParkingIcon, CeilingHeightIcon, UtilitiesIcon, ElevatorIcon, SecurityIcon, AirConditioningIcon } from './IconComponents';
import { useAppContext } from '../../contexts/AppContext';
import { AnimatedSection } from '../ui';

// Декоративные элементы для секции TechnicalSpecs в стиле киберпанк
const TechSpecsDecorations: React.FC = () => (
  <>
    {/* Левая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute left-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-24 left-14 w-18 h-px bg-gradient-to-r from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-24 left-14 w-px h-18 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Треугольники */}
        <div className="absolute top-48 left-10 w-0 h-0 border-l-[6px] border-l-accent-red/20 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-28 left-18 w-0 h-0 border-r-[8px] border-r-accent-red/15 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Квадраты */}
        <div className="absolute top-36 left-20 w-5 h-5 border border-accent-red/25 rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Технические иконки */}
        <div className="absolute top-1/5 left-12 w-3 h-3 bg-accent-red/60 rounded-sm animate-pulse"></div>
        <div className="absolute bottom-1/4 left-16 w-2 h-2 bg-accent-red/50 rounded-sm animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-32 left-24 w-14 h-px bg-accent-red/50 transform rotate-45 origin-left"></div>
        <div className="absolute bottom-20 left-20 w-16 h-px bg-accent-red/40 transform -rotate-45 origin-left"></div>
        
        {/* Сетка */}
        <div className="absolute top-40 left-4 w-6 h-6 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
      </div>
    </div>

    {/* Правая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute right-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-20 right-12 w-16 h-px bg-gradient-to-l from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-20 right-12 w-px h-16 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Ромбы */}
        <div className="absolute top-52 right-8 w-5 h-5 border border-accent-red/25 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-accent-red/30 transform rotate-45 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-44 right-16 w-4 h-4 bg-accent-red/25 transform rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Технические иконки */}
        <div className="absolute top-1/3 right-14 w-3 h-3 bg-accent-red/60 rounded-sm animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-1/5 right-10 w-2 h-2 bg-accent-red/50 rounded-sm animate-pulse" style={{animationDelay: '2.2s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-28 right-20 w-14 h-px bg-accent-red/50 transform -rotate-45 origin-right"></div>
        <div className="absolute bottom-16 right-24 w-16 h-px bg-accent-red/40 transform rotate-45 origin-right"></div>
        
        {/* Сетка */}
        <div className="absolute top-48 right-4 w-6 h-6 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
      </div>
    </div>
  </>
);

const SpecItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = React.memo(({ icon, title, description }) => (
  <div className="section-card tech-spec-card group relative overflow-hidden shadow-[0_0_0_1px_rgba(220,38,38,0.05)] dark:shadow-[0_0_0_1px_rgba(220,38,38,0.10)] transition-all duration-300">
    <div className="relative z-10 p-6 md:p-4 sm:p-1">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 md:mb-3 sm:mb-2 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl md:text-lg sm:text-2xl font-bold text-light-text dark:text-dark-text group-hover:text-red-500 transition-none mb-2 md:mb-1 sm:mb-1">{title}</h3>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-center group-hover:text-red-400 transition-none text-base md:text-sm sm:text-xl leading-relaxed md:leading-normal sm:leading-tight">{description}</p>
      </div>
    </div>
  </div>
 ));

const TechnicalSpecs: React.FC = React.memo(() => {
    const { texts } = useAppContext();

    const icons: { [key: string]: React.ReactNode } = useMemo(() => ({
        parking: <ParkingIcon className="tech-icon"/>,
        ceiling: <CeilingHeightIcon className="tech-icon"/>,
        utilities: <UtilitiesIcon className="tech-icon"/>,
        transport: <ElevatorIcon className="tech-icon"/>,
        security: <SecurityIcon className="tech-icon"/>,
        airconditioning: <AirConditioningIcon className="tech-icon"/>
    }), []);

  return (
    <section className="py-20 section-variant-1 transition-colors duration-300 modern-section section-spacing relative overflow-hidden">
      <TechSpecsDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fadeInUp" className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4 transition-none">{texts.techSpecs.title}</h2>
        </AnimatedSection>
        <div className="modern-card-grid max-w-6xl mx-auto">
          {texts.techSpecs.specs.map((spec, index) => (
            <AnimatedSection key={index} animation="zoomIn" delay={index * 0.1}>
              <SpecItem icon={icons[spec.icon]} title={spec.title} description={spec.description} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
});

SpecItem.displayName = 'SpecItem';
TechnicalSpecs.displayName = 'TechnicalSpecs';

export default TechnicalSpecs;