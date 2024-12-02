self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-static-cache").then((cache) => {
      return cache.addAll(["/admin", "/login", "/register"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
