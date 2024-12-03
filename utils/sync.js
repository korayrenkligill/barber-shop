import { getQueue, clearQueue } from "./db";

export const syncQueue = async () => {
  if (navigator.onLine) {
    const queue = await getQueue();
    for (const item of queue) {
      try {
        // API'ye işlem gönder
        await fetch("/api/endpoint", {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Sync failed for:", item, error);
        continue;
      }
    }
    await clearQueue();
  }
};

window.addEventListener("online", syncQueue);
