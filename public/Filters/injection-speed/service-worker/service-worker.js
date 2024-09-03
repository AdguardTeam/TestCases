/* eslint-disable no-restricted-globals */

// Install event - Skip waiting and activate the new service worker immediately
self.addEventListener('install', () => {
    self.skipWaiting();
});

// Fetch event - Forward all requests to the network without caching
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request),
    );
});

// Activate event - Clean up old caches and enable navigation preload
self.addEventListener('activate', () => {
    // Immediately claim any clients without waiting
    self.clients.claim();
});
