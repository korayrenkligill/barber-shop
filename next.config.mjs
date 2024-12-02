import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Geliştirme sırasında devre dışı
  register: true, // Service Worker otomatik kaydı
  scope: "/", // Service Worker kapsamı
  swDest: "service-worker.js", // Service Worker'ın oluşturulacağı yer
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/apihairdresser\.onrender\.com\/api\/.*$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^\/_next\/static\/.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^\/(register|login|admin)/,
      handler: "CacheFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
  ],
});

export default nextConfig;
