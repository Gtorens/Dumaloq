import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import AnimatedSection from '../ui/AnimatedSection';

// Декоративные элементы для секции Anchors в стиле киберпанк
const AnchorsDecorations: React.FC = () => (
  <>
    {/* Левая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute left-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-16 left-8 w-32 h-px bg-gradient-to-r from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-16 left-8 w-px h-32 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Треугольники */}
        <div className="absolute top-48 left-16 w-0 h-0 border-l-[12px] border-l-accent-red/40 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent animate-pulse"></div>
        <div className="absolute bottom-20 left-6 w-0 h-0 border-r-[16px] border-r-accent-red/30 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Квадраты */}
        <div className="absolute top-32 left-12 w-8 h-8 border border-accent-red/50 rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-20 w-6 h-6 bg-accent-red/40 transform rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Анимированные точки */}
        <div className="absolute top-1/4 left-14 w-2 h-2 bg-accent-red/80 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-10 w-1.5 h-1.5 bg-accent-red/70 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-20 w-1 h-1 bg-accent-red/90 rounded-full animate-ping" style={{animationDelay: '0.7s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-24 left-24 w-20 h-px bg-accent-red/50 transform rotate-45 origin-left"></div>
        <div className="absolute bottom-16 left-32 w-16 h-px bg-accent-red/40 transform -rotate-45 origin-left"></div>
        
        {/* Сетка */}
        <div className="absolute top-40 left-4 w-12 h-12 border border-accent-red/30 opacity-60">
          <div className="w-full h-px bg-accent-red/30 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/30 ml-1/2"></div>
        </div>
      </div>
    </div>

    {/* Правая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute right-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-20 right-10 w-32 h-px bg-gradient-to-l from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-20 right-10 w-px h-32 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Ромбы */}
        <div className="absolute top-56 right-6 w-8 h-8 border border-accent-red/35 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-16 right-12 w-6 h-6 bg-accent-red/40 transform rotate-45 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        
        {/* Треугольники */}
        <div className="absolute top-40 right-16 w-0 h-0 border-r-[10px] border-r-accent-red/30 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-40 right-8 w-0 h-0 border-l-[8px] border-l-accent-red/45 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Анимированные точки */}
        <div className="absolute top-1/3 right-14 w-2 h-2 bg-accent-red/80 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute bottom-1/4 right-18 w-1.5 h-1.5 bg-accent-red/70 rounded-full animate-ping" style={{animationDelay: '1.3s'}}></div>
        <div className="absolute top-3/4 right-24 w-1 h-1 bg-accent-red/90 rounded-full animate-ping" style={{animationDelay: '0.9s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-28 right-28 w-16 h-px bg-accent-red/50 transform -rotate-45 origin-right"></div>
        <div className="absolute bottom-24 right-36 w-20 h-px bg-accent-red/40 transform rotate-45 origin-right"></div>
        
        {/* Сетка */}
        <div className="absolute top-36 right-4 w-10 h-10 border border-accent-red/30 opacity-60">
          <div className="w-full h-px bg-accent-red/30 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/30 ml-1/2"></div>
        </div>
        
        {/* Горизонтальные линии */}
        <div className="absolute top-64 right-20 w-24 h-px bg-accent-red/40"></div>
        <div className="absolute bottom-48 right-16 w-20 h-px bg-accent-red/30"></div>
      </div>
    </div>
  </>
);

const FloorCard: React.FC<{
  floorNum: string;
  title: string;
  description: string;
  logos: { url: string; name: string }[];
  imageUrl: string;
}> = ({ floorNum, title, description, logos, imageUrl }) => {
  return (
    <div className="floor-block">
      <img src={imageUrl} alt={title} className="floor-image-bg" />
      <div className="floor-overlay">
        <div className="floor-number">{floorNum}</div>
        <div className="floor-text-block">
          <h3 className="floor-title">{title}</h3>
          <p className="floor-description">{description}</p>
          <div className="floor-logos">
            {logos.map(logo => (
              <div key={logo.name} className="floor-logo">
                <img src={logo.url} alt={`${logo.name} logo`} title={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Anchors: React.FC = () => {
  const { texts } = useAppContext();

  return (
    <section className="py-20 section-variant-3 transition-colors duration-300 modern-section section-spacing relative overflow-hidden">
      <AnchorsDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h2 className="floors-overview-title text-light-text dark:text-dark-text mb-4">{texts.floorsOverview.title}</h2>
          <p className="floors-overview-description max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
            {texts.floorsOverview.subtitle}
          </p>
        </AnimatedSection>
        <div className="space-y-8">
          {texts.floorsOverview.floors.map((floor, index) => (
            <AnimatedSection 
              key={floor.floorNum} 
              animation="fadeInLeft"
              delay={index * 0.1}
            >
              <FloorCard {...floor} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Anchors;