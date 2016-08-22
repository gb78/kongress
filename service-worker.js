var files = [
  "index.html",
  "manifest.json",
  "img/enegep.png",
  "img/enegep2.png",
  "img/icon.png",
  "js/install.js",
  "js/main.js",
  "js/jquery-3.1.0.min.js",
  "fonts/Prompt/Prompt-Medium.ttf",
  "fonts/Prompt/Prompt-MediumItalic.ttf",
  "fonts/font-awesome-4.6.2/css/font-awesome.css",
  "fonts/font-awesome-4.6.2/fonts/FontAwesome.otf"
];
// dev only
if (typeof files == 'undefined') {
  var files = [];
} else {
  files.push('./');
}

var CACHE_NAME = 'kongres-v01';

self.addEventListener('activate', function(event) {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME.indexOf(cacheName) == -1) {
            console.log('[SW] Delete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', function(event){
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(
      	files.map(function(file){
      		return cache.add(file);
      	})
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('[SW] fetch ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);
  clients.openWindow('/');
});
