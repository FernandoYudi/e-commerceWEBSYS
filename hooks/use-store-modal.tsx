import { create } from "zustand";

export interface useStoreModal{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useStoreModal= create<useStoreModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({isOpen: false}),
}));