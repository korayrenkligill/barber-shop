import { User } from "@/types/authServiceTypes";
import { createStore, atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
export const globalStorage = createStore();

export const userAtom = atomWithStorage<User | null>("user", null);
globalStorage.set(userAtom, null);
