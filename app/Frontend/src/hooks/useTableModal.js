import { create } from "zustand";

const useTableModal = create((set) => ({
  isOpen: false,

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useTableModal;
