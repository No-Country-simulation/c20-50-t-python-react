import { create } from "zustand";

const useOrderModal = create((set) => ({
  // Initialize the 'isOpen' property to false
  isOpen: false,
  // Define the 'onOpen' function, which sets the 'isOpen' property to true
  onOpen: () => set({ isOpen: true }),
  // Define the 'onClose' function, which sets the 'isOpen' property to false
  onClose: () => set({ isOpen: false }),
}));

export default useOrderModal;
