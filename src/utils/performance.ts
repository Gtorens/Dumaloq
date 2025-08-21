/**
 * Утилиты для оптимизации производительности
 */

/**
 * Debounce функция
 * @param func - функция для debounce
 * @param wait - время ожидания в миллисекундах
 * @returns debounced функция
 */
export function debounce<T extends (..._args: any[]) => any>(
  func: T,
  wait: number
): (..._args: Parameters<T>) => void {
  let timeout: number;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}

/**
 * Throttle функция
 * @param func - функция для throttle
 * @param limit - лимит вызовов в миллисекундах
 * @returns throttled функция
 */
export function throttle<T extends (..._args: any[]) => any>(
  func: T,
  limit: number
): (..._args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Проверка видимости элемента в viewport
 * @param element - DOM элемент
 * @param threshold - порог видимости (0-1)
 * @returns true если элемент видим
 */
export function isElementInViewport(
  element: Element,
  threshold: number = 0.1
): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return (
    rect.top <= windowHeight * (1 - threshold) &&
    rect.bottom >= windowHeight * threshold
  );
}

/**
 * Ленивая загрузка изображений
 * @param images - массив изображений для ленивой загрузки
 * @param threshold - порог видимости
 */
export function lazyLoadImages(
  images: HTMLImageElement[],
  threshold: number = 0.1
): void {
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    },
    { threshold }
  );

  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Оптимизация обработчика скролла
 * @param handler - обработчик скролла
 * @param delay - задержка в миллисекундах
 * @returns оптимизированный обработчик
 */
export function optimizeScrollHandler(
  handler: () => void
): () => void {
  let ticking = false;
  
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handler();
        ticking = false;
      });
      ticking = true;
    }
  };
}

/**
 * Мемоизация функции
 * @param fn - функция для мемоизации
 * @returns мемоизированная функция
 */
export function memoize<T extends (..._args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Очистка кэша мемоизации
 * @param fn - мемоизированная функция
 */
export function clearMemoizationCache(fn: any): void {
  if (fn.cache) {
    fn.cache.clear();
  }
}

// Performance monitoring utilities

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initObservers();
  }

  private initObservers(): void {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            this.metrics.fcp = fcpEntry.startTime;
            this.logMetric('FCP', this.metrics.fcp);
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
      } catch (e) {
        console.warn('FCP observer failed:', e);
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            this.metrics.lcp = lastEntry.startTime;
            this.logMetric('LCP', this.metrics.lcp);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer failed:', e);
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.entryType === 'first-input') {
              const firstInputEntry = entry as PerformanceEventTiming;
              this.metrics.fid = firstInputEntry.processingStart - firstInputEntry.startTime;
              this.logMetric('FID', this.metrics.fid);
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer failed:', e);
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.cls = clsValue;
          this.logMetric('CLS', this.metrics.cls);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer failed:', e);
      }
    }

    // Time to First Byte
    this.measureTTFB();
  }

  private measureTTFB(): void {
    if ('performance' in window) {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        this.logMetric('TTFB', this.metrics.ttfb);
      }
    }
  }

  private logMetric(name: string, value: number): void {
    console.log(`🚀 ${name}: ${value.toFixed(2)}ms`);
    
    // Send to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        page_location: window.location.href
      });
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public getScore(): number {
    let score = 100;
    
    // FCP scoring (0-100)
    if (this.metrics.fcp) {
      if (this.metrics.fcp < 1800) score -= 0;
      else if (this.metrics.fcp < 3000) score -= 10;
      else score -= 30;
    }

    // LCP scoring (0-100)
    if (this.metrics.lcp) {
      if (this.metrics.lcp < 2500) score -= 0;
      else if (this.metrics.lcp < 4000) score -= 10;
      else score -= 30;
    }

    // FID scoring (0-100)
    if (this.metrics.fid) {
      if (this.metrics.fid < 100) score -= 0;
      else if (this.metrics.fid < 300) score -= 10;
      else score -= 30;
    }

    // CLS scoring (0-100)
    if (this.metrics.cls) {
      if (this.metrics.cls < 0.1) score -= 0;
      else if (this.metrics.cls < 0.25) score -= 10;
      else score -= 30;
    }

    return Math.max(0, score);
  }

  public destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Bundle size monitoring
export const getBundleSize = (): void => {
  if ('performance' in window) {
    const resources = performance.getEntriesByType('resource');
    const jsResources = resources.filter(resource => 
      resource.name.includes('.js') || resource.name.includes('.mjs')
    );
    
    const totalJS = jsResources.reduce((total, resource) => total + resource.transferSize, 0);
    console.log(`📦 Total JS bundle size: ${(totalJS / 1024).toFixed(2)}KB`);
  }
};

// Memory usage monitoring
export const getMemoryUsage = (): void => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log(`💾 Memory usage: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB / ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`);
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = (): PerformanceMonitor => {
  return new PerformanceMonitor();
};
