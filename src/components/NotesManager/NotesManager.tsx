// NotesManager.tsx

import React, { useCallback, useEffect } from 'react';
import AddNoteForm from '../AddNoteForm/AddNoteForm';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import SearchNotes from '../SearchNotes/SearchNotes';
import NoteList from '../NoteList/NoteList';
import {
  useNotesManagerAppDispatch,
  useNotesManagerAppSelector,
} from '../../redux/store';
import { selectSearchData } from '../../redux/searchData/searchDataSelector';
import { setSearchData } from '../../redux/searchData/searchDataSlice';
import { selectActiveNotes } from '../../redux/notes/notesSelector';
import { setCategories } from '../../redux/categories/categoriesSlice';
import { setNotes } from '../../redux/notes/notesSlice';
import SearchResult from '../SearchResult/SearchResult';
import { useStorageNoteManagerContext } from '../../contexts/StorageProvider';
import SortBar from '../SortBar/SortBar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const NotesManager = () => {
  const searchData = useNotesManagerAppSelector(selectSearchData);
  const activeNotes = useNotesManagerAppSelector(selectActiveNotes);
  const dispatch = useNotesManagerAppDispatch();
  const storage = useStorageNoteManagerContext();

  useEffect(() => {
    dispatch(setNotes(storage?.getItems() || []));
    dispatch(setCategories(['Общая', 'Работа', 'Личное', 'Учёба']));
  }, [dispatch, storage]);

  const onSearchNote = useCallback(
    (value: string) => {
      dispatch(setSearchData({ open: true, value }));
    },
    [dispatch]
  );

  return (
    <section className='grid gap-4 grid-cols-1 grid-rows-[1fr_5fr] h-screen	'>
      <AppBar position='static' sx={{ marginBottom: 10 }}>
        <Toolbar>
          <Typography variant='h4' component='h1'>
            Менеджер заметок
          </Typography>
          <SearchNotes onSearchNote={onSearchNote} />
        </Toolbar>
      </AppBar>
      <div className='grid grid-cols-1 grid-rows-[auto_1fr] gap-14'>
        <AddNoteForm />
      </div>
      {searchData.open ? (
        <SearchResult />
      ) : (
        <div className='grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-3'>
          <CategoriesBar />
          <SortBar />
          <NoteList list={activeNotes} />
        </div>
      )}
    </section>
  );
};

export default NotesManager;
