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
