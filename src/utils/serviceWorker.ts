// Утилита для регистрации и управления Service Worker

export interface ServiceWorkerConfig {
  onSuccess?: (_registration: ServiceWorkerRegistration) => void;
  onUpdate?: (_registration: ServiceWorkerRegistration) => void;
  onOfflineReady?: () => void;
  onError?: (_error: Error) => void;
}

// Проверка поддержки Service Worker
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

// Регистрация Service Worker
export const registerServiceWorker = async (config: ServiceWorkerConfig = {}): Promise<void> => {
  if (!isServiceWorkerSupported()) {
    // eslint-disable-next-line no-console
    console.warn('[SW] Service Workers не поддерживаются в этом браузере');
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[SW] Service Worker отключен в режиме разработки');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    // eslint-disable-next-line no-console
    console.log('[SW] Service Worker успешно зарегистрирован:', registration);

    // Обработка обновлений
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // Есть новая версия
            // eslint-disable-next-line no-console
            console.log('[SW] Доступно обновление приложения');
            config.onUpdate?.(registration);
          } else {
            // Первая установка
            // eslint-disable-next-line no-console
            console.log('[SW] Приложение готово к работе офлайн');
            config.onOfflineReady?.();
          }
        }
      });
    });

    config.onSuccess?.(registration);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[SW] Ошибка регистрации Service Worker:', error);
    config.onError?.(error as Error);
  }
};

// Отмена регистрации Service Worker
export const unregisterServiceWorker = async (): Promise<void> => {
  if (!isServiceWorkerSupported()) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
    // eslint-disable-next-line no-console
    console.log('[SW] Service Worker отменен');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[SW] Ошибка отмены регистрации:', error);
  }
};

// Обновление Service Worker
export const updateServiceWorker = async (): Promise<void> => {
  if (!isServiceWorkerSupported()) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    // eslint-disable-next-line no-console
    console.log('[SW] Service Worker обновлен');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[SW] Ошибка обновления Service Worker:', error);
  }
};

// Пропуск ожидания и активация нового SW
export const skipWaitingAndActivate = (): void => {
  if (!navigator.serviceWorker.controller) return;

  const messageChannel = new MessageChannel();
  messageChannel.port1.onmessage = (event) => {
    if (event.data.type === 'SW_ACTIVATED') {
      window.location.reload();
    }
  };

  navigator.serviceWorker.controller.postMessage(
    { type: 'SKIP_WAITING' },
    [messageChannel.port2]
  );
};

// Получение размера кеша
export const getCacheSize = (): Promise<number> => {
  return new Promise((resolve) => {
    if (!navigator.serviceWorker.controller) {
      resolve(0);
      return;
    }

    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      if (event.data.type === 'CACHE_SIZE') {
        resolve(event.data.payload);
      }
    };

    navigator.serviceWorker.controller.postMessage(
      { type: 'GET_CACHE_SIZE' },
      [messageChannel.port2]
    );
  });
};

// Очистка кеша
export const clearCache = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!navigator.serviceWorker.controller) {
      resolve();
      return;
    }

    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      if (event.data.type === 'CACHE_CLEARED') {
        resolve();
      }
    };

    navigator.serviceWorker.controller.postMessage(
      { type: 'CLEAR_CACHE' },
      [messageChannel.port2]
    );
  });
};

// Предварительная загрузка ресурсов
export const prefetchResources = (urls: string[]): Promise<void> => {
  return new Promise((resolve) => {
    if (!navigator.serviceWorker.controller) {
      resolve();
      return;
    }

    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      if (event.data.type === 'PREFETCH_COMPLETE') {
        resolve();
      }
    };

    navigator.serviceWorker.controller.postMessage(
      { type: 'PREFETCH_RESOURCES', payload: urls },
      [messageChannel.port2]
    );
  });
};

// Проверка статуса онлайн/офлайн
export const getNetworkStatus = (): 'online' | 'offline' => {
  return navigator.onLine ? 'online' : 'offline';
};

// Хук для мониторинга статуса сети
export const createNetworkStatusListener = (
  onOnline: () => void,
  onOffline: () => void
): (() => void) => {
  const handleOnline = () => onOnline();
  const handleOffline = () => onOffline();

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Возвращаем функцию очистки
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Показ уведомления об обновлении
export const showUpdateNotification = (): void => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Обновление приложения', {
      body: 'Доступна новая версия приложения. Перезагрузите страницу для обновления.',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-96x96.png'
    });
  } else {
    // Fallback для браузеров без поддержки уведомлений
    if (confirm('Доступна новая версия приложения. Обновить сейчас?')) {
      skipWaitingAndActivate();
    }
  }
};

// Запрос разрешения на уведомления
export const requestNotificationPermission = async (): Promise<'default' | 'denied' | 'granted'> => {
  if (!('Notification' in window)) {
    // eslint-disable-next-line no-console
    console.warn('[SW] Уведомления не поддерживаются');
    return 'default';
  }

  if (Notification.permission !== 'default') {
    return Notification.permission;
  }

  try {
    const permission = await Notification.requestPermission();
    // eslint-disable-next-line no-console
    console.log('[SW] Разрешение на уведомления:', permission);
    return permission;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[SW] Ошибка запроса разрешения на уведомления:', error);
    return 'default';
  }
};