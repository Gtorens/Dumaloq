import React from 'react';

interface HeroBackgroundProps {
  imageLoaded: boolean;
  imageError: boolean;
  onImageLoad: () => void;
  onImageError: () => void;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageLoaded,
  imageError,
  onImageLoad,
  onImageError
}) => {
  return (
    <>
      {/* Фоновое изображение с оптимизацией */}
      <div 
        className={`hero-background blur ${imageLoaded ? 'loaded' : imageError ? 'error' : 'loading'}`}
        style={{ 
          backgroundImage: imageError ? 'none' : "url('/images/hero-building.jpg')",
          backgroundColor: imageError ? '#1a1a1a' : 'transparent',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform'
        }}
        role="img"
        aria-label="Здание торгового центра Dumoloq"
      />
      
      {/* Скрытое изображение для предзагрузки */}
      <img 
        src="/images/hero-building.jpg"
        alt="Торгово-развлекательный центр Dumoloq - современное здание с премиум дизайном"
        style={{ display: 'none' }}
        onLoad={onImageLoad}
        onError={onImageError}
        loading="eager"
        decoding="async"
      />
    </>
  );
};

export default HeroBackground;
