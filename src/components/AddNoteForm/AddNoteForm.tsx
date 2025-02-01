// AddNoteForm.tsx

import React, { FC, useId, useState } from 'react';
import { I_Note } from '../../types/I_Note';
import {
  useNotesManagerAppDispatch,
  useNotesManagerAppSelector,
} from '../../redux/store';
import { addNote } from '../../redux/notes/notesSlice';
import { selectCategories } from '../../redux/categories/categoriesSelector';
import { useStorageNoteManagerContext } from '../../contexts/StorageProvider';
import { getDate } from '../../utils/getDate';

const AddNoteForm: FC = React.memo(() => {
  const dispatch = useNotesManagerAppDispatch();
  const { activeCategory } = useNotesManagerAppSelector(selectCategories);
  const storage = useStorageNoteManagerContext();

  const defaultState = {
    title: '',
    text: '',
  };

  const titleInput = useId();
  const textInput = useId();

  const [values, setValues] = useState<{ title: string; text: string }>(
    defaultState
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = new Date().getTime().toString();
    const created = getDate();

    if (!Boolean(values.text) || !Boolean(values.title)) {
      return;
    }

    const note: I_Note = {
      ...values,
      id,
      category: activeCategory,
      created,
      updated: created,
    };
    dispatch(addNote(note));

    if (storage) {
      storage.setItem(note);
    }

    setValues(defaultState);
  };

  const inputStyle = 'border-solid border-black border-2 rounded-md p-2';

  return (
    <div>
      <p className='text-2xl font-bold'>{activeCategory}</p>
      <form
        onSubmit={onSubmit}
        className='grid grid-cols-1 grid-rows-[minmax(0,1fr)_auto] bg-sky-200 max-w-96 place-items-center box-border p-4 rounded-md'
      >
        <fieldset className='grid grid-cols-1 grid-rows-3 w-full'>
          <legend className='w-full text-center mb-3'>
            Добавление заметки
          </legend>
          <div className='flex flex-col'>
            <label htmlFor={titleInput}>Заголовок:</label>
            <input
              id={titleInput}
              title='Введите заголовок'
              placeholder='Введите заголовок'
              aria-label='Введите заголовок'
              type='text'
              name='title'
              value={values.title}
              onChange={onChange}
              className={inputStyle}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor={textInput}>Текст:</label>
            <textarea
              id={textInput}
              title='Введите текст'
              placeholder='Введите текст'
              aria-label='Введите текст'
              name='text'
              value={values.text}
              onChange={onChange}
              className={inputStyle}
            />
          </div>
        </fieldset>

        <button
          type='submit'
          className='border-solid border-black border-2 max-w-max px-2 py-1 rounded-md'
        >
          Добавить
        </button>
      </form>
    </div>
  );
});

export default AddNoteForm;
