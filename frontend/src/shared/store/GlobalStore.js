import { create } from 'zustand';

const useGlobalStore = create((set) => ({
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error: error }),
}));

export default useGlobalStore;