import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import sortSliceReducer from './sortBar/sortBarSlice';
import searchDataReducer from './searchData/searchDataSlice';
import notesReducer from './notes/notesSlice';
import categoriesReducer from './categories/categoriesSlice';

export const storeNotesManager = configureStore({
  reducer: {
    sortStore: sortSliceReducer,
    searchDataStore: searchDataReducer,
    notes: notesReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof storeNotesManager.getState>;
export type AppDispatch = typeof storeNotesManager.dispatch;
export type AppStore = typeof storeNotesManager;

export const useNotesManagerAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useNotesManagerAppSelector = useSelector.withTypes<RootState>();
