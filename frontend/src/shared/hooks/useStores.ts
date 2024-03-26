// /src/stores/useStoryStore.ts
import create from 'zustand';
import { createStateStore } from '../store/StateStore';
import { createActionStore } from '../store/ActionStore';

export const useStores = create((set) => ({
    ...createStateStore(),
    ...createActionStore(set),
}));
