import create from 'zustand';
import { initialAppState, initialUserState, initialStoryInfo, initialStoryState, initialContestState } from './InitialState';

const useStore = create((set) => ({
    ...initialAppState,
    ...initialUserState,
    ...initialStoryInfo,
    ...initialStoryState,
    ...initialContestState,

    // AppState related functions
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    // Toggle theme function
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
    })),
    // Set current story
    setCurrentStory: (story) => set({ currentStory: story }),
    // Add story
    addStory: (story) =>
        set((state) => ({
            allStories: [...state.allStories, story],
        })),
    // Update story choices
    updateStoryChoices: (choices) =>
        set((state) => {
            if (!state.currentStory) return state;
            return {
                currentStory: { ...state.currentStory, choices },
            };
        }),

    // UserState related functions
    setUser: (user) => set(user ? user : initialUserState),
    clearUser: () => set(initialUserState),
    addOwnedStory: (story) =>
        set((state) => ({
            ownedStory: [...state.ownedStory, story],
        })),
    // Pin character
    pinCharacter: (characterId) =>
        set((state) => {
            const character = state.pinnedCharacters.find((char) => char.id === characterId);
            return character
                ? {
                    pinnedCharacters: [...state.pinnedCharacters, character],
                }
                : state;
        }),
    // Unpin character
    unpinCharacter: (characterId) =>
        set((state) => ({
            pinnedCharacters: state.pinnedCharacters.filter((char) => char.id !== characterId),
        })),
    // Fetch user data
    fetchUserData: () => {
        set({ isLoading: true });
        setTimeout(() => {
            set({
                isLoading: false,
                userData: {
                    id: '1',
                    email: 'example@email.com',
                    nickname: 'ExampleUser',
                    interests: ['fantasy', 'mystery'],
                    recommendedStoryIds: ['1', '2'],
                },
            });
        }, 1000);
    },
}));

export default useStore;
