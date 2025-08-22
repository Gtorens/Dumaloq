import { useCallback, useRef, useMemo } from 'react';

/**
 * Хук для debounce функции
 * @param func - функция для debounce
 * @param delay - задержка в миллисекундах
 * @returns debounced функция
 */
export const useDebounce = <T extends (..._args: any[]) => any>(
  func: T,
  delay: number
): T => {
  const timeoutRef = useRef<number>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => func(...args), delay);
    },
    [func, delay]
  ) as T;
};

/**
 * Хук для throttle функции
 * @param func - функция для throttle
 * @param limit - лимит вызовов в миллисекундах
 * @returns throttled функция
 */
export const useThrottle = <T extends (..._args: any[]) => any>(
  func: T,
  limit: number
): T => {
  const inThrottle = useRef(false);

  return useCallback(
    (...args: Parameters<T>) => {
      if (!inThrottle.current) {
        func(...args);
        inThrottle.current = true;
        setTimeout(() => (inThrottle.current = false), limit);
      }
    },
    [func, limit]
  ) as T;
};

/**
 * Хук для мемоизации объекта с глубоким сравнением
 * @param obj - объект для мемоизации
 * @returns мемоизированный объект
 */
export const useDeepMemo = <T>(obj: T): T => {
  const ref = useRef<T>();
  
  if (!ref.current || JSON.stringify(ref.current) !== JSON.stringify(obj)) {
    ref.current = obj;
  }
  
  return ref.current;
};

/**
 * Хук для оптимизации обработчика событий
 * @param handler - обработчик события
 * @param deps - зависимости
 * @returns оптимизированный обработчик
 */
export const useEventHandler = <T extends Event>(
  handler: (_event: T) => void,
  deps: any[] = []
) => {
  return useCallback(handler, deps);
};

/**
 * Хук для оптимизации стилей
 * @param styles - объект стилей
 * @param deps - зависимости
 * @returns мемоизированные стили
 */
export const useStyles = <T extends Record<string, any>>(
  styles: T,
  deps: any[] = []
): T => {
  return useMemo(() => styles, deps);
};
