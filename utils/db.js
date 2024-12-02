import { openDB } from "idb";

export const initDB = async () => {
  const db = await openDB("app-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("queue")) {
        db.createObjectStore("queue", { keyPath: "id", autoIncrement: true });
      }
    },
  });
  return db;
};

export const addToQueue = async (data) => {
  const db = await initDB();
  await db.add("queue", data);
};

export const getQueue = async () => {
  const db = await initDB();
  return await db.getAll("queue");
};

export const clearQueue = async () => {
  const db = await initDB();
  await db.clear("queue");
};
