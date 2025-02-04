import type { RootState } from '../store';

export const selectCategories = (state: RootState) => {
  const index = state.categories.categories.indexActiveCategory;
  const category = state.categories.categories.list[index];

  return { activeCategory: category, list: state.categories.categories.list };
};
