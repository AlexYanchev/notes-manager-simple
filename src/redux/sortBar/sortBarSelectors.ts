import { RootState } from '../store';

export const selectSort = (state: RootState) => state.sortStore.sort;
