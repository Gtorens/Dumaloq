import React, { useCallback, useState, useEffect } from 'react';

interface SmoothScrollOptions {
  behavior?: 'smooth' | 'instant' | 'auto';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
  offset?: number;
}

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((
    target: string | Element,
    options: SmoothScrollOptions = {}
  ) => {
    const {
      behavior = 'smooth',
      block = 'start',
      inline = 'nearest',
      offset = 0
    } = options;

    let element: Element | null = null;
    
    if (typeof target === 'string') {
      // Если передан селектор или ID
      element = target.startsWith('#') 
        ? document.getElementById(target.slice(1))
        : document.querySelector(target);
    } else {
      element = target;
    }

    if (!element) {
      console.warn(`Element not found: ${target}`);
      return;
    }

    // Получаем позицию элемента
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const scrollToPosition = absoluteElementTop - offset;

    // Используем современный API если доступен
    if ('scrollTo' in window) {
      window.scrollTo({
        top: scrollToPosition,
        behavior
      });
    } else {
      // Fallback для старых браузеров
      element.scrollIntoView({
        behavior,
        block,
        inline
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const scrollToSection = useCallback((sectionId: string, offset: number = 80) => {
    scrollToElement(`#${sectionId}`, { offset });
  }, [scrollToElement]);

  return {
    scrollToElement,
    scrollToTop,
    scrollToSection
  };
};

// Хук для отслеживания текущей секции
export const useActiveSection = (sectionIds: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${offset}px 0px -${100 - offset}% 0px`,
        threshold: 0.1
      }
    );

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offset]);

  return activeSection;
};

// Утилита для создания магнитных эффектов навигации
export const useMagneticEffect = () => {
  const handleMouseMove = useCallback((
    event: React.MouseEvent<HTMLElement>,
    intensity: number = 0.3
  ) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate(${x * intensity}px, ${y * intensity}px) scale(1.05)`;
  }, []);

  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    element.style.transform = 'translate(0px, 0px) scale(1)';
  }, []);

  return {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  };
};