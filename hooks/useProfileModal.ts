import { create } from "zustand";

export interface ProfileModalInterface {
    userId?: string;
    isOpen: boolean;
    openModal: (userId: string) => void;
    closeModal: () => void;
};

const useProfileModal = create<ProfileModalInterface> ((set) => ({
    userId: undefined,
    isOpen: false,
    openModal: (userId: string) => set({ isOpen: true, userId }),
    closeModal: () => set({ isOpen: false, userId: undefined })
}));

export default useProfileModal;