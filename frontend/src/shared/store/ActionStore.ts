import { SetState } from 'zustand';
import { StoryState } from './StoreTypes';

export const createActionStore = (set: SetState<StoryState>) => ({
    setContent: (content: string) => set((state: StoryState) => ({ ...state, content })),
});