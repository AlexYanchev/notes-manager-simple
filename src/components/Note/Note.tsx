// Note.tsx

import React, { FC, useRef } from 'react';
import type { I_Note } from '../../types/I_Note';
import NoteText from '../NoteText/NoteText';
import { useNotesManagerAppDispatch } from '../../redux/store';
import { deleteNote } from '../../redux/notes/notesSlice';
import { useStorageNoteManagerContext } from '../../contexts/StorageProvider';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { dndHover } from '../../utils/dndHover';

interface NoteProps {
  note: I_Note;
  index: number;
  moveNote: (dragIndex: number, hoverIndex: number) => void;
}

type NoteItem = {
  id: string;
  index: number;
};

const Note: FC<NoteProps> = React.memo(
  ({ note: { id, text, title }, moveNote, index }) => {
    const noteRef = useRef<HTMLDivElement>(null);
    const dispatch = useNotesManagerAppDispatch();
    const storage = useStorageNoteManagerContext();

    const [{ handlerId }, drop] = useDrop<
      NoteItem,
      void,
      { handlerId: Identifier | null }
    >({
      accept: 'note',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item: NoteItem, monitor) {
        noteRef.current &&
          dndHover(
            item,
            index,
            monitor,
            moveNote,
            noteRef as React.RefObject<HTMLDivElement>
          );
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: 'note',
      item: () => {
        return { id, index };
      },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const id = e.currentTarget.getAttribute('data-note-id');

      if (!id) {
        return;
      }

      dispatch(deleteNote({ id }));

      if (storage) {
        storage.deleteItem(id);
      }
    };

    const opacity = isDragging ? 'opacity-20' : 'opacity-100';
    drag(drop(noteRef));
    return (
      <div
        ref={noteRef}
        data-handler-id={handlerId}
        className={`${opacity} op grid gap-4 grid-cols-1 grid-rows-[auto_1fr_auto] bg-gradient-to-r from-sky-500 to-indigo-500 w-52 h-64 rounded-xl px-2 py-6`}
      >
        <h3 className='text-center'>{title}</h3>
        <NoteText text={text} id={id} />
        <button
          className='p-2 rounded-3xl bg-red-300'
          type='button'
          data-note-id={id}
          onClick={deleteItem}
        >
          Удалить
        </button>
      </div>
    );
  }
);

export default Note;
