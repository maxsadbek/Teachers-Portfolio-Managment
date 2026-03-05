import { create } from "zustand";

type ModalStore = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
}));

export const useModalIsOpen = () => useModalStore((s) => s.isOpen);
export const useModalActions = () => useModalStore((s) => ({ open: s.open, close: s.close }));

export default useModalStore;
