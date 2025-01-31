// SortBar.tsx

import React, { useId } from 'react';
import {
  useNotesManagerAppDispatch,
  useNotesManagerAppSelector,
  addSort,
  resetSort,
  selectSort,
} from './redux';
import { I_Note, E_Sort } from '../../types';

const SortBar = React.memo(() => {
  const dispatch = useNotesManagerAppDispatch();
  const alphaSort = useId();
  const dateSort = useId();
  const sortState = useNotesManagerAppSelector(selectSort);

  const addAlphaSort = () => {
    const defaultSort = () => dispatch(addSort(E_Sort.ALPHA_ASC));

    if (!sortState) {
      defaultSort();
    } else {
      switch (sortState) {
        case E_Sort.ALPHA_ASC: {
          dispatch(addSort(E_Sort.ALPHA_DESC));
          break;
        }
        case E_Sort.ALPHA_DESC: {
          defaultSort();
          break;
        }
        default: {
          defaultSort();
        }
      }
    }
  };

  const addDateSort = () => {
    const defaultSort = () => dispatch(addSort(E_Sort.DATE_ASC));

    if (!sortState) {
      defaultSort();
    } else {
      switch (sortState) {
        case E_Sort.DATE_DESC: {
          defaultSort();
          break;
        }
        case E_Sort.DATE_ASC: {
          dispatch(addSort(E_Sort.DATE_DESC));
          break;
        }
        default: {
          defaultSort();
        }
      }
    }
  };

  return (
    <ul className='flex gap-3'>
      <li>
        <button type='button' name={alphaSort} onClick={addAlphaSort}>
          По алфавиту
        </button>
      </li>
      <li>
        <button type='button' name={dateSort} onClick={addDateSort}>
          По дате
        </button>
      </li>
      <li>
        <button
          type='button'
          name='resetSort'
          onClick={() => dispatch(resetSort())}
        >
          Сбросить
        </button>
      </li>
    </ul>
  );
});

export default SortBar;
