import { create } from 'zustand';

const useBookStore = create((set) => ({
    bookId: null,
    chapterNum: null,
    title: null,
    genre: null,
    theme: null,
    tone: null,
    setting: null,
    synopsis: null,
    prologue: null,
    summary: null,
    characters: null,
    language: null,
    translatedPrologue: null,
    translatedContent: null,
    recommendations: [],


    setBookId: (bookId) => set({ bookId }),
    setChapterNum: (chapterNum) => set({ chapterNum }),
    setTitle: (title) => set({ title }),
    setGenre: (genre) => set({ genre }),
    setTheme: (theme) => set({ theme }),
    setTone: (tone) => set({ tone }),
    setSetting: (setting) => set({ setting }),
    setSynopsis: (synopsis) => set({ synopsis }),
    setPrologue: (prologue) => set({ prologue }),
    setSummary: (summary) => set({ summary }),
    setCharacters: (characters) => set({ characters }),
    setLanguage: (language) => set({ language }),
    setTranslatedPrologue: (translatedPrologue) => set({ translatedPrologue }),
    setTranslatedContent: (translatedContent) => set({ translatedContent }),
    setRecommendations: (recommendations) => set({ recommendations }),

}));

export default useBookStore;

