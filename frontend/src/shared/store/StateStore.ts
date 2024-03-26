// /src/shared/hooks/StateStore.ts
import { initialStoryState } from '../InitialState';

export const createStateStore = () => ({
    ...initialStoryState,
});
