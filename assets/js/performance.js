// 实现Service Worker缓存
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    cache: {
      name: 'static-cache',
      maxEntries: 100,
      maxAgeSeconds: 86400 * 30
    }
  });
} 