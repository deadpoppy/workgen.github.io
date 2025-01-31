// 添加范围限制
self.addEventListener('install', () => {
  self.skipWaiting();
  self.registration.scope = 'https://workgen.app/';
}); 