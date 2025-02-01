import type { RootState } from '../store';

export const selectNotes = (category: string) => (state: RootState) =>
  state.notes.notes.filter((note) => note.category === category);

export const selectActiveNotes = (state: RootState) => {
  const { list, indexActiveCategory } = state.categories.categories;
  return state.notes.notes.filter(
    (note) => note.category === list[indexActiveCategory]
  );
};
