import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { E_Sort } from '../../types/E_Sort';

export interface SortState {
  sort: E_Sort | null;
}

const initialState: SortState = {
  sort: null,
};

export const sortSlice = createSlice({
  name: 'sortSlice',
  initialState,
  reducers: {
    addSort: (state, action: PayloadAction<E_Sort>) => {
      state.sort = action.payload;
    },

    resetSort: (state) => {
      state.sort = null;
    },
  },
});

export const { addSort, resetSort } = sortSlice.actions;

const sortSliceReducer = sortSlice.reducer;

export default sortSliceReducer;
