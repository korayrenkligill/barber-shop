import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  swDest: "service-worker.js",
  runtimeCaching: [
    // Statik sayfalar ve HTML içeriklerini önbelleğe al
    {
      urlPattern: /^\/(register|login|admin)/,
      handler: "CacheFirst", // Öncelikli olarak önbelleği kontrol eder
      options: {
        cacheName: "html-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 gün
        },
        cacheableResponse: {
          statuses: [200],
        },
      },
    },
    // Tüm statik kaynakları (CSS, JS, resimler) önbelleğe al
    {
      urlPattern: /^\/_next\/static\/.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 gün
        },
      },
    },
    // API çağrıları için önbellek
    {
      urlPattern: /^https:\/\/apihairdresser\.onrender\.com\/api\/.*$/i,
      handler: "NetworkFirst", // Öncelikli olarak ağı kontrol eder, yoksa önbelleği kullanır
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 dakika
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

export default nextConfig;
