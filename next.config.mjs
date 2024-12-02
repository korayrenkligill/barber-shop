import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Geliştirmede PWA'yı devre dışı bırak
  register: true, // Service Worker otomatik kaydedilir
  scope: "/", // Tüm siteyi kapsar
  manifest: "/manifest.json", // Manifest dosyasının yolu
  runtimeCaching: [
    // API çağrıları için önbellekleme
    {
      urlPattern: /^https:\/\/apihairdresser\.onrender\.com\/api\/.*$/i,
      handler: "NetworkFirst", // Önce ağı kontrol eder, yoksa önbellekten alır
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10, // Ağ yanıtı için maksimum bekleme süresi
        expiration: {
          maxEntries: 50, // Maksimum 50 önbellek girişi
          maxAgeSeconds: 5 * 60, // 5 dakika boyunca saklanır
        },
        cacheableResponse: {
          statuses: [0, 200], // Yalnızca başarılı yanıtlar önbelleğe alınır
        },
      },
    },
    // Statik varlıklar için önbellekleme (CSS, JS, resimler vb.)
    {
      urlPattern: /^\/_next\/static\/.*/i,
      handler: "StaleWhileRevalidate", // Statik kaynakları güncellerken eski veriyi kullanır
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 gün boyunca saklanır
        },
      },
    },
    // Sayfalar için önbellekleme (register, login, admin)
    {
      urlPattern: /^\/(register|login|admin)/,
      handler: "CacheFirst", // Öncelikle önbelleği kontrol eder
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 gün boyunca saklanır
        },
      },
    },
  ],
});

export default nextConfig;
