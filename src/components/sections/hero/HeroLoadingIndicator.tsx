import React from 'react';

interface HeroLoadingIndicatorProps {
  imageLoaded: boolean;
  imageError: boolean;
}

const HeroLoadingIndicator: React.FC<HeroLoadingIndicatorProps> = ({
  imageLoaded,
  imageError
}) => {
  if (imageLoaded || imageError) {
    return null;
  }

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center z-20" 
      role="status" 
      aria-label="Загрузка изображения"
      aria-live="polite"
      aria-describedby="loading-description"
    >
      <div className="loading-spinner" aria-hidden="true"></div>
      <span id="loading-description" className="sr-only">
        Загружается изображение торгового центра
      </span>
    </div>
  );
};

export default HeroLoadingIndicator;
