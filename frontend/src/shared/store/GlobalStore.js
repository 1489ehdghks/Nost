import { create } from 'zustand';

const useGlobalStore = create((set) => ({
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => {
        const formattedError = typeof error === 'string' ? error : JSON.stringify(error);
        set({ error: formattedError });
    },
}));

export default useGlobalStore;