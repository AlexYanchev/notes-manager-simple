// SearchNotes.tsx

import React, { FC } from 'react';

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
      <input
        className='border-2 border-solid border-black w-full'
        type='search'
        name='search'
      />
      <button className='border-2 border-solid border-black' type='submit'>
        Поиск
      </button>
    </form>
  );
};

export default SearchNotes;
