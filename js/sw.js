var staticUrls = [
    './',
    './index.html',
    './styles.css',
    './css/leaflet.css',
    './js/leaflet.js'
]

self.addEventListener('install', function(event){
    console.log('[Service Worker] Install');
    event.waitUntil(
        caches.open('pwaTutorialCache')
            .then(function(cache){
                console.log('[Service Worker] Caching Static Files');
                return cache.addAll(staticUrls);
            })
    );
});

self.addEventListener('fetch', function(event){
    console.log('[Service Worker] Fetch');
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                return response || fetch(event.request);
             })
    );
});