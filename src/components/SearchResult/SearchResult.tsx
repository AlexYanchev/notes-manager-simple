// SearchResult.tsx

import React, { FC } from 'react';
import NoteList from '../NoteList/NoteList';
import {
  useNotesManagerAppDispatch,
  useNotesManagerAppSelector,
} from '../../redux/store';
import { setSearchData } from '../../redux/searchData/searchDataSlice';
import { selectFindedNotes } from '../../redux/searchData/searchDataSelector';

const SearchResult: FC = () => {
  const notes = useNotesManagerAppSelector(selectFindedNotes);
  const dispatch = useNotesManagerAppDispatch();

  const closeSearchForm = () => {
    dispatch(setSearchData({ open: false, value: '' }));
  };

  return (
    <div>
      <div className='flex gap-3'>
        <button onClick={closeSearchForm}>Назад</button>
        <p>Результаты</p>
      </div>

      <NoteList list={notes} />
    </div>
  );
};

export default SearchResult;
