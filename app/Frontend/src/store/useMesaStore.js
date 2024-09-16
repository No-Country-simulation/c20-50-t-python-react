import { create } from 'zustand';

const useMesaStore = create((set) => ({
  numeroMesa: null,  
  setNumeroMesa: (numero) => set({ numeroMesa: numero }),  
}));

export default useMesaStore;
