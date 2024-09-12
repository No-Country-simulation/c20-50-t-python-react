import { create } from "zustand";

const useCategory = create((set) => ({
  category: "",

  setCategory: (category) => set({ category }),
}));

export default useCategory;
