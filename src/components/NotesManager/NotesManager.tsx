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
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';

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

  // const test = () => {
  //   const str = 'AAAABBBCCXYZDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBB';
  //   let result = '';
  //   let temp = 1;
  //   for (let i = 0; i < str.length; i++) {
  //     if (str[i] !== str[i + 1]) {
  //       if (temp !== 1) {
  //         result += str[i] + temp;
  //         temp = 1;
  //       } else {
  //         result += str[i];
  //       }
  //     } else {
  //       temp += 1;
  //     }
  //   }

  //   return result;
  // };

  // console.log(test());

  return (
    <section className=''>
      <AppBar position='static' sx={{ marginBottom: 10 }}>
        <Toolbar className='flex justify-between'>
          <Typography variant='h4' component='h1'>
            Менеджер заметок
          </Typography>
          <SearchNotes onSearchNote={onSearchNote} />
        </Toolbar>
      </AppBar>
      <Container maxWidth='xl'>
        <Grid container spacing={2} columns={{ md: 12, xl: 12, sm: 8, xs: 8 }}>
          <Grid size={{ xl: 4, md: 4, sm: 8, xs: 8 }}>
            <AddNoteForm />
          </Grid>
          <Grid size={{ xl: 8, md: 8, sm: 8, xs: 8 }}>
            {searchData.open ? (
              <SearchResult />
            ) : (
              <div className='grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-3'>
                <CategoriesBar />
                <SortBar />
                <NoteList list={activeNotes} />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default NotesManager;
