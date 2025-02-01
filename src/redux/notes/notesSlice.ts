import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { I_Note } from '../../types';

export interface NotesState {
  notes: I_Note[];
}

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: 'notesSlice',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<I_Note>) => {
      state.notes.push(action.payload);
    },

    setNotes: (state, action: PayloadAction<I_Note[]>) => {
      state.notes = action.payload;
    },

    deleteNote: (state, action: PayloadAction<{ id: string }>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
    },

    changeNote: (
      state,
      action: PayloadAction<Pick<I_Note, 'id' | 'text' | 'updated'>>
    ) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? { ...note, ...action.payload } : note
      );
    },
  },
});

export const { addNote, setNotes, deleteNote, changeNote } = notesSlice.actions;

const notesReducer = notesSlice.reducer;

export default notesReducer;
