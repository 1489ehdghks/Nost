import { create } from 'zustand';

const useBookStore = create((set) => ({
    bookId: null,
    title: null,
    genre: null,
    theme: null,
    tone: null,
    setting: null,
    synopsis: null,
    summary: null,
    characters: null,
    language: null,
    recommendations: [],


    setBookId: (bookId) => set({ bookId }),
    setTitle: (title) => set({ title }),
    setGenre: (genre) => set({ genre }),
    setTheme: (theme) => set({ theme }),
    setTone: (tone) => set({ tone }),
    setSetting: (setting) => set({ setting }),
    setSynopsis: (synopsis) => set({ synopsis }),
    setSummary: (summary) => set({ summary }),
    setCharacters: (characters) => set({ characters }),
    setLanguage: (language) => set({ language }),
    setRecommendations: (recommendations) => set({ recommendations }),

}));

export default useBookStore;

