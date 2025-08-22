import React, { useEffect, useRef, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  rootMargin?: string;
  threshold?: number;
}

interface ParallaxResult {
  ref: React.RefObject<HTMLElement>;
  transform: string;
  isVisible: boolean;
}

export const useParallax = ({
  speed = 0.5,
  direction = 'up',
  rootMargin = '0px',
  threshold = 0.1
}: ParallaxOptions = {}): ParallaxResult => {
  const [transform, setTransform] = useState('translateY(0px)');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    const handleScroll = () => {
      if (!element || !isVisible) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Вычисляем прогресс элемента в видимой области
      const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
      
      // Ограничиваем прогресс от 0 до 1
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Вычисляем смещение
      const offset = clampedProgress * speed * 100;
      const multiplier = direction === 'up' ? -1 : 1;
      
      setTransform(`translateY(${offset * multiplier}px)`);
    };

    observer.observe(element);

    // Добавляем обработчик скролла с throttling
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll(); // Вызываем сразу для начального состояния

    return () => {
      observer.unobserve(element);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [speed, direction, rootMargin, threshold, isVisible]);

  return { ref, transform, isVisible };
};

// Хук для множественных параллакс слоев
export const useMultiLayerParallax = (layers: ParallaxOptions[]) => {
  return layers.map(options => useParallax(options));
};

// Хук для вращающегося параллакса
export const useRotatingParallax = (speed: number = 0.1) => {
  const [rotation, setRotation] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setRotation(prev => (prev + speed) % 360);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed]);

  return {
    ref,
    transform: `rotate(${rotation}deg)`,
    rotation
  };
};