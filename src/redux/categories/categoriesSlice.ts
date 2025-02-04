import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoriesState {
  categories: { indexActiveCategory: number; list: string[] };
}

const initialState: CategoriesState = {
  categories: { indexActiveCategory: 0, list: [] },
};

export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.list.push(action.payload);
    },

    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.categories.indexActiveCategory = action.payload;
    },

    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories.list = action.payload;
    },
  },
});

export const { addCategory, setActiveCategory, setCategories } =
  categoriesSlice.actions;

const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;
