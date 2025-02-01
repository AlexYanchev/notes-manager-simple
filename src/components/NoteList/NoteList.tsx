// NoteList.tsx

import React, { FC, useCallback, useMemo } from 'react';
import { I_Note, E_Sort } from '../../types/';
import Note from '../Note/Note';
import {
  useNotesManagerAppDispatch,
  useNotesManagerAppSelector,
} from '../../redux/store';
import { selectSort } from '../../redux/sortBar/sortBarSelectors';
import { setNotes } from '../../redux/notes/notesSlice';
import update from 'immutability-helper';

interface NoteListProps {
  list: I_Note[];
}

const NoteList: FC<NoteListProps> = ({ list }) => {
  const sort = useNotesManagerAppSelector(selectSort);
  const dispatch = useNotesManagerAppDispatch();

  const moveNote = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(
        setNotes(
          update(list, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, list[dragIndex]],
            ],
          })
        )
      );
    },
    [dispatch, list]
  );

  const alphaSortASC = (list: I_Note[]) =>
    list.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

  const alphaSortDESC = (list: I_Note[]) =>
    list.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });

  const dateSortASC = (list: I_Note[]) =>
    list.sort((a, b) => {
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    });

  const dateSortDESC = (list: I_Note[]) =>
    list.sort((a, b) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

  const sortedList = useMemo(() => {
    switch (sort) {
      case E_Sort.ALPHA_ASC: {
        return alphaSortASC(list);
      }
      case E_Sort.ALPHA_DESC: {
        return alphaSortDESC(list);
      }
      case E_Sort.DATE_ASC: {
        return dateSortASC(list);
      }
      case E_Sort.DATE_DESC: {
        return dateSortDESC(list);
      }
      default: {
        return list;
      }
    }
  }, [list, sort]);

  return (
    <ul className='flex gap-3 flex-wrap'>
      {sortedList.map((note, index) => {
        return (
          <li key={note.id}>
            <Note note={note} moveNote={moveNote} index={index} />
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
