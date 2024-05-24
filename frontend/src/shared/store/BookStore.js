import { create } from 'zustand';

const useBookStore = create((set) => ({
    synopsis: null,
    summary: null,
    recommendations: [],
    setSynopsis: (synopsis) => set({ synopsis }),
    setSummary: (summary) => set({ summary }),
    setRecommendations: (recommendations) => set({ recommendations }),
}));

export default useBookStore;


// setNovel(response.data.content)
//setSummary