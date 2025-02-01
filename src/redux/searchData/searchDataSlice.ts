import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchDataState {
  searchData: { open: boolean; value: string };
}

const initialState: SearchDataState = {
  searchData: { open: false, value: '' },
};

export const searchDataSlice = createSlice({
  name: 'searchDataSlice',
  initialState,
  reducers: {
    setSearchData: (
      state,
      action: PayloadAction<{ open: boolean; value: string }>
    ) => {
      state.searchData = action.payload;
    },
  },
});

export const { setSearchData } = searchDataSlice.actions;

const searchDataReducer = searchDataSlice.reducer;

export default searchDataReducer;
