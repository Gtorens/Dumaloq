import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean; // Для критических изображений
  webpSrc?: string; // WebP версия изображения
  sizes?: string; // Responsive sizes
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = '/images/placeholder.jpg',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YWFhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  onLoad,
  onError,
  priority = false,
  webpSrc,
  sizes
}) => {
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholder);
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Проверка поддержки WebP
  const supportsWebP = useMemo(() => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }, []);

  // Оптимизированные observer опции
  const observerOptions = useMemo(() => ({
    rootMargin: '100px', // Увеличиваем rootMargin для более ранней загрузки
    threshold: 0.05 // Минимальное перекрытие
  }), []);

  // Оптимизированные коллбеки
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (imageSrc === src && fallbackSrc !== src) {
      // Пытаемся загрузить fallback
      setImageSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
      onError?.();
    }
  }, [imageSrc, src, fallbackSrc, onError]);

  // Мемоизация стилей
  const imageClassName = useMemo(() => {
    const baseClasses = 'lazy-fade-in transition-all duration-500 ease-in-out';
    const loadedClasses = isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
    const errorClasses = hasError ? 'filter grayscale' : '';
    return `${baseClasses} ${loadedClasses} ${errorClasses} ${className}`;
  }, [isLoaded, hasError, className]);

  // Определяем лучший сорс изображения
  const bestImageSrc = useMemo(() => {
    if (hasError || imageSrc === placeholder) return imageSrc;
    if (webpSrc && supportsWebP) return webpSrc;
    return imageSrc;
  }, [imageSrc, webpSrc, supportsWebP, hasError, placeholder]);

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (priority) return; // Пропускаем для приоритетных изображений

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isIntersecting) {
            setIsIntersecting(true);
            setImageSrc(src);
          }
        });
      },
      observerOptions
    );

    const currentImg = imgRef.current;
    if (currentImg) {
      observer.observe(currentImg);
    }

    return () => {
      if (currentImg) {
        observer.unobserve(currentImg);
      }
      observer.disconnect();
    };
  }, [src, isIntersecting, observerOptions, priority]);

  return (
    <img
      ref={imgRef}
      src={bestImageSrc}
      alt={alt}
      className={imageClassName}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      {...(!priority && {
        'data-lazy': 'true'
      })}
    />
  );
};

export default LazyImage;
