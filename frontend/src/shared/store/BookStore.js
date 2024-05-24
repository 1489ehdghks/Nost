import { create } from 'zustand';

const useBookStore = create((set) => ({
    synopsis: null,
    summary: null,
    Recommendations: [],
    setSynopsis: (synopsis) => set({ synopsis }),
    setRecommendations: (synopsis) => set({ synopsis }),
    setSummary: (summary) => set({ summary }),
}));

export default useBookStore;


// setNovel(response.data.content)
//setSummary