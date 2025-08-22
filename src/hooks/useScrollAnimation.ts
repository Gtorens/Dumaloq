import React, { useEffect, useRef, useState } from 'react';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  direction?: AnimationDirection;
}

interface ScrollAnimationResult {
  ref: React.RefObject<any>;
  isVisible: boolean;
  animationClass: string;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  delay = 0,
  direction = 'up'
}: UseScrollAnimationOptions = {}): ScrollAnimationResult => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) {
                setHasAnimated(true);
              }
            }, delay);
          } else {
            setIsVisible(true);
            if (triggerOnce) {
              setHasAnimated(true);
            }
          }
        } else if (!triggerOnce && !hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  // Генерация CSS классов для анимации
  const getAnimationClass = (): string => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (isVisible) {
      return `${baseClasses} animate-in`;
    }

    switch (direction) {
      case 'up':
        return `${baseClasses} opacity-0 translate-y-8`;
      case 'down':
        return `${baseClasses} opacity-0 -translate-y-8`;
      case 'left':
        return `${baseClasses} opacity-0 translate-x-8`;
      case 'right':
        return `${baseClasses} opacity-0 -translate-x-8`;
      case 'scale':
        return `${baseClasses} opacity-0 scale-95`;
      case 'fade':
      default:
        return `${baseClasses} opacity-0`;
    }
  };

  return {
    ref,
    isVisible,
    animationClass: getAnimationClass()
  };
};

// Хук для последовательной анимации элементов списка
export const useStaggeredAnimation = (
  itemCount: number,
  baseDelay: number = 100
) => {
  return Array.from({ length: itemCount }, (_, index) => 
    useScrollAnimation({
      delay: index * baseDelay,
      direction: 'up'
    })
  );
};