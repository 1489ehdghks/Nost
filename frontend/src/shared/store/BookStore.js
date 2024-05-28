import { create } from 'zustand';

const useBookStore = create((set) => ({
    synopsis: '',
    setSynopsis: (synopsis) => set({ synopsis }),
}));

export default useBookStore;
