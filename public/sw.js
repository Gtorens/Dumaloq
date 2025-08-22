const CACHE_NAME = 'dumoloq-v1.0.0';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const IMAGE_CACHE = `${CACHE_NAME}-images`;

// Ресурсы для обязательного кеширования
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/styles/globals.css',
  '/manifest.json',
  // Добавляем ключевые компоненты
  '/src/components/sections/Hero.tsx',
  '/src/components/sections/Contact.tsx',
  '/src/contexts/AppContext.tsx',
  // Критические стили
  '/public/css-variables.css',
  '/public/custom-styles.css'
];

// Стратегия кеширования изображений
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.ico'];

// Стратегия кеширования API запросов
const API_CACHE_DURATION = 5 * 60 * 1000; // 5 минут

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    Promise.all([
      // Кеширование статических ресурсов
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Принудительная активация нового SW
      self.skipWaiting()
    ])
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    Promise.all([
      // Очистка старых кешей
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName.startsWith('dumoloq-') && 
              !cacheName.includes(CACHE_NAME)
            )
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Захват управления всеми клиентами
      self.clients.claim()
    ])
  );
});

// Обработка fetch запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Игнорируем запросы к chrome-extension
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Обработка различных типов запросов
  if (request.method === 'GET') {
    // Навигационные запросы
    if (request.mode === 'navigate') {
      event.respondWith(handleNavigationRequest(request));
    }
    // Изображения
    else if (isImageRequest(request)) {
      event.respondWith(handleImageRequest(request));
    }
    // API запросы
    else if (isApiRequest(request)) {
      event.respondWith(handleApiRequest(request));
    }
    // Статические ресурсы
    else {
      event.respondWith(handleStaticRequest(request));
    }
  }
});

// Обработка навигационных запросов (HTML страницы)
async function handleNavigationRequest(request) {
  try {
    // Network First для HTML
    const networkResponse = await fetch(request);
    
    // Кешируем успешные ответы
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback к кешу при отсутствии сети
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Offline fallback страница
    return caches.match('/index.html');
  }
}

// Обработка запросов изображений
async function handleImageRequest(request) {
  try {
    // Cache First для изображений
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Возвращаем placeholder изображение при отсутствии сети
    return new Response(
      '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><rect width=\"200\" height=\"200\" fill=\"#f3f4f6\"/><text x=\"50%\" y=\"50%\" text-anchor=\"middle\" dy=\".3em\" font-family=\"Arial\" font-size=\"14\" fill=\"#6b7280\">Изображение недоступно</text></svg>',
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
}

// Обработка API запросов
async function handleApiRequest(request) {
  try {
    // Network First с коротким таймаутом
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const networkResponse = await fetch(request, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      const responseClone = networkResponse.clone();
      
      // Добавляем метку времени для API кеша
      const cachedResponse = new Response(await responseClone.text(), {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: {
          ...Object.fromEntries(responseClone.headers.entries()),
          'sw-cache-timestamp': Date.now().toString()
        }
      });
      
      cache.put(request, cachedResponse);
    }
    
    return networkResponse;
  } catch (error) {
    // Проверяем кеш на свежесть
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      const cacheTimestamp = cachedResponse.headers.get('sw-cache-timestamp');
      if (cacheTimestamp && (Date.now() - parseInt(cacheTimestamp)) < API_CACHE_DURATION) {
        return cachedResponse;
      }
    }
    
    // Возвращаем offline ответ
    return new Response(JSON.stringify({
      error: 'Нет соединения с интернетом',
      offline: true,
      timestamp: Date.now()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Обработка статических ресурсов
async function handleStaticRequest(request) {
  try {
    // Cache First для статических ресурсов
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback для критических ресурсов
    const fallbackResponse = await caches.match('/index.html');
    return fallbackResponse || new Response('Ресурс недоступен', { status: 404 });
  }
}

// Утилиты для определения типов запросов
function isImageRequest(request) {
  const url = new URL(request.url);
  return IMAGE_EXTENSIONS.some(ext => url.pathname.toLowerCase().includes(ext));
}

function isApiRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || 
         url.hostname !== self.location.hostname ||
         request.headers.get('Content-Type')?.includes('application/json');
}

// Обработка сообщений от клиента
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_CACHE_SIZE':
      getCacheSize().then(size => {
        event.ports[0].postMessage({ type: 'CACHE_SIZE', payload: size });
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      });
      break;
      
    case 'PREFETCH_RESOURCES':
      prefetchResources(payload).then(() => {
        event.ports[0].postMessage({ type: 'PREFETCH_COMPLETE' });
      });
      break;
  }
});

// Получение размера кеша
async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
}

// Очистка всех кешей
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
}

// Предварительная загрузка ресурсов
async function prefetchResources(urls) {
  const cache = await caches.open(STATIC_CACHE);
  return cache.addAll(urls.filter(url => typeof url === 'string'));
}

// Логирование статистики
console.log('[SW] Service Worker loaded');
console.log('[SW] Cache strategy: Network First для HTML, Cache First для статики');
console.log('[SW] Version:', CACHE_NAME);