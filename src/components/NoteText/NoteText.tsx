// NoteText.tsx

import React, { FC, useState } from 'react';
import FastInputEdit from '../FastInputEdit/FastInputEdit';
import { useNotesManagerAppDispatch } from '../../redux/store';
import { changeNote } from '../../redux/notes/notesSlice';
import { useStorageNoteManagerContext } from '../../contexts/StorageProvider';
import { getDate } from '../../utils/getDate';

interface NoteTextProps {
  id: string;
  text: string;
}

const NoteText: FC<NoteTextProps> = React.memo(({ id, text }) => {
  const dispatch = useNotesManagerAppDispatch();
  const storage = useStorageNoteManagerContext();
  const [openForm, setOpenForm] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const textarea = form.get('text');
    const newText = textarea?.toString() || text;
    const updated = getDate();

    dispatch(changeNote({ id, updated, text: newText }));
    if (storage) {
      storage.changeItem(id, newText, updated);
    }

    setOpenForm(false);
  };

  return (
    <div className='group/noteText hover:bg-slate-400 hover:bg-opacity-40 relative'>
      {openForm ? (
        <FastInputEdit onSubmit={onSubmit}>
          <textarea
            name='text'
            aria-label='Ввведите новый текст'
            placeholder={text}
          />
        </FastInputEdit>
      ) : (
        <p className=''>{text}</p>
      )}
      {!openForm && (
        <button
          onClick={() => setOpenForm(true)}
          className='absolute text-xs right-0 bottom-0 opacity-0 group-hover/noteText:opacity-100 hover:text-zinc-700'
        >
          Редактировать
        </button>
      )}
    </div>
  );
});

export default NoteText;
