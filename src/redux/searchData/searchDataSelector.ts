import type { RootState } from '../store';

export const selectFindedNotes = (state: RootState) => {
  const value = state.searchDataStore.searchData.value;
  const findedNotes = state.notes.notes.filter((note) => {
    if (note.title.includes(value) || note.text.includes(value)) {
      return true;
    }

    return false;
  });

  return findedNotes;
};

export const selectSearchData = (state: RootState) =>
  state.searchDataStore.searchData;
