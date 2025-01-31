self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('workgen-v1').then((cache) => 
      cache.addAll(['/', '/assets/css/main.css'])
    )
  );
}); 