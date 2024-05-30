import { create } from 'zustand';

const useBookStore = create((set) => ({
    bookId: null,
    synopsis: null,
    summary: null,
    recommendations: [],
    setBookId: (bookId) => set({ bookId }),
    setSynopsis: (synopsis) => set({ synopsis }),
    setSummary: (summary) => set({ summary }),
    setRecommendations: (recommendations) => set({ recommendations }),
}));

export default useBookStore;

