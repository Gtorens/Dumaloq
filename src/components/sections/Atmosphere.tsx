import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

// Декоративные элементы для секции Atmosphere в стиле киберпанк
const AtmosphereDecorations: React.FC = () => (
  <>
    {/* Левая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute left-0 top-0 w-64 h-full pointer-events-none z-10">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        
        {/* Геометрические линии */}
        <div className="absolute top-20 left-12 w-24 h-px bg-gradient-to-r from-white/60 via-white/40 to-transparent"></div>
        <div className="absolute top-20 left-12 w-px h-24 bg-gradient-to-b from-white/60 via-white/40 to-transparent"></div>
        
        {/* Треугольники */}
        <div className="absolute top-48 left-8 w-0 h-0 border-l-[8px] border-l-white/30 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-24 left-16 w-0 h-0 border-r-[10px] border-r-white/20 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Квадраты */}
        <div className="absolute top-32 left-0 w-6 h-6 border border-white/50 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 left-0 w-4 h-4 bg-white/40 transform rotate-45 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Анимированные точки */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-white/80 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-20 w-1.5 h-1.5 bg-white/70 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-28 left-20 w-16 h-px bg-white/50 transform rotate-45 origin-left"></div>
        <div className="absolute bottom-32 left-24 w-20 h-px bg-white/40 transform -rotate-45 origin-left"></div>
        
        {/* Сетка */}
        <div className="absolute top-36 left-4 w-8 h-8 border border-white/30 opacity-60">
          <div className="w-full h-px bg-white/30 mt-1/2"></div>
          <div className="w-px h-full bg-white/30 ml-1/2"></div>
        </div>
      </div>
    </div>

    {/* Правая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute right-0 top-0 w-64 h-full pointer-events-none z-10">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent"></div>
        
        {/* Геометрические линии */}
        <div className="absolute top-16 right-10 w-24 h-px bg-gradient-to-l from-white/60 via-white/40 to-transparent"></div>
        <div className="absolute top-16 right-10 w-px h-24 bg-gradient-to-b from-white/60 via-white/40 to-transparent"></div>
        
        {/* Ромбы */}
        <div className="absolute top-52 right-14 w-6 h-6 border border-white/35 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-20 right-8 w-4 h-4 bg-white/45 transform rotate-45 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        
        {/* Треугольники */}
        <div className="absolute top-36 right-0 w-0 h-0 border-r-[6px] border-r-white/40 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent animate-pulse"></div>
        <div className="absolute bottom-32 right-0 w-0 h-0 border-l-[8px] border-l-white/30 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent animate-pulse" style={{animationDelay: '2.5s'}}></div>
        
        {/* Анимированные точки */}
        <div className="absolute top-1/3 right-12 w-2 h-2 bg-white/80 rounded-full animate-ping" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-1/4 right-18 w-1.5 h-1.5 bg-white/70 rounded-full animate-ping" style={{animationDelay: '2.2s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-24 right-20 w-18 h-px bg-white/50 transform -rotate-45 origin-right"></div>
        <div className="absolute bottom-28 right-24 w-16 h-px bg-white/40 transform rotate-45 origin-right"></div>
        
        {/* Сетка */}
        <div className="absolute top-44 right-4 w-6 h-6 border border-white/30 opacity-60">
          <div className="w-full h-px bg-white/30 mt-1/2"></div>
          <div className="w-px h-full bg-white/30 ml-1/2"></div>
        </div>
      </div>
    </div>
  </>
);

const Atmosphere: React.FC = React.memo(() => {
    const { texts } = useAppContext();
    const [imageLoaded, setImageLoaded] = useState(false);
    
    useEffect(() => {
        // Предзагрузка изображения
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = '/images/atmosphere/gateway-mountains.jpg';
    }, []);

    return (
        <section 
            id="atmosphere-section"
            className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center text-center text-white overflow-hidden atmosphere-background section-spacing"
            style={{ 
                backgroundImage: imageLoaded ? "url('/images/atmosphere/gateway-mountains.jpg')" : "none",
                backgroundColor: !imageLoaded ? '#1a1a1a' : 'transparent',
                transition: 'background-image 0.5s ease'
            }}
        >
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Декоративные элементы */}
            <AtmosphereDecorations />
            
            <div className="relative z-20 p-4 max-w-4xl mx-auto animate-fade-in">
                <h2 className="atmosphere-title mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    {texts.atmosphere.title}
                </h2>
                <h3 className="atmosphere-subtitle text-gray-200 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    {texts.atmosphere.subtitle}
                </h3>
                <p className="atmosphere-description max-w-3xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                    {texts.atmosphere.description}
                </p>
            </div>
        </section>
    );
});

Atmosphere.displayName = 'Atmosphere';

export default Atmosphere;
