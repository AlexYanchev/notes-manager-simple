// SearchNotes.tsx

import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

interface SearchNotesProps {
  onSearchNote: (value: string) => void;
}

const SearchNotes: FC<SearchNotesProps> = ({ onSearchNote }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const value = form.get('search');
    if (!value) {
      return;
    }

    onSearchNote(value.toString());
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className='flex'>
      <Stack spacing={2} direction='row'>
        <TextField
          name='search'
          type='search'
          variant='outlined'
          sx={{ backgroundColor: 'white' }}
          placeholder='Поиск...'
        />

        <Button variant='contained' type='submit'>
          Поиск
        </Button>
      </Stack>
    </form>
  );
};

export default SearchNotes;
