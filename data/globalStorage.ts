import { User } from "@/types/authServiceTypes";
import { UserType } from "@/types/globalTypes";
import { createStore, atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
export const globalStorage = createStore();

export const userAtom = atomWithStorage<UserType | null>("user", null);
globalStorage.set(userAtom, null);
