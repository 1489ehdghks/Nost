export const initialChoice = {
    title: '',
    description: '',
    value: '',
};

export const initialCharacter = {
    id: 0,
    name: '',
    role: null,
    description: null,
    storyId: 0,
};

export const initialStoryInfo = {
    title: '',
    genre: '',
    content: '',
    profileImage: null,
    description: '',
    ownerId: '',
    ownerNickname: '',
    password: '',
    recommendations: 0,
    rating: 0,
    useStoryAI: '',
    useImageAI: '',
    useVoiceAI: '',
    created_at: new Date(),
};

export const initialStoryState = {
    isPublic: false,
    isPremium: false,
    isRecommended: false,
    isPinned: false,
};

export const initialContestState = {
    contestId: '',
    contests: [],
    startDate: new Date(),
    endDate: new Date(),
    votes: {},
};

export const initialStory = {
    id: 0,
    storyInfo: initialStoryInfo,
    storyState: initialStoryState,
    contestState: initialContestState,
    characters: [initialCharacter],
    choices: [initialChoice],
};

export const initialAuthState = {
    isLoggedIn: false,
};

export const initialUserData = {
    id: '',
    email: '',
    nickname: '',
    interests: [],
    recommendedStoryIds: [],
};

export const initialUserState = {
    authState: initialAuthState,
    userData: initialUserData,
    ownedStory: [],
    pinnedCharacters: [],
    recommendedStory: [],
    recentActivity: [],
    savedContents: [],
    feedbacks: [],
    userSettings: [],
    purchaseHistory: [],
};

export const initialAppState = {
    currentStory: null,
    allStories: [],
    isLoading: false,
    error: null,
    theme: 'light',
    toggleTheme: () => { },
};
