// CategoriesBar.tsx

import React, { FC, useState, useCallback } from 'react';
import FastInputEdit from '../FastInputEdit/FastInputEdit';
import {
  useNotesManagerAppDispatch,
  useNotesManagerAppSelector,
} from '../../redux/store';
import { selectCategories } from '../../redux/categories/categoriesSelector';
import {
  addCategory,
  setCategories,
} from '../../redux/categories/categoriesSlice';
import update from 'immutability-helper';
import Category from '../Category/Category';

const CategoriesBar: FC = React.memo(() => {
  const dispatch = useNotesManagerAppDispatch();
  const { list } = useNotesManagerAppSelector(selectCategories);

  const [isOpenAddCatForm, setOpenAddCatForm] = useState<boolean>(false);

  const onAddNewCatForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const inputElement = form.get('category');
    if (!inputElement) {
      return;
    }

    e.currentTarget.reset();

    dispatch(addCategory(inputElement.toString()));
    setOpenAddCatForm(false);
  };

  const moveCategory = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(
        setCategories(
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

  return (
    <div>
      <ul className='flex gap-2'>
        {list.map((name, index) => (
          <Category
            key={name}
            name={name}
            index={index}
            moveCategory={moveCategory}
          />
        ))}
        <li>
          {isOpenAddCatForm ? (
            <FastInputEdit onSubmit={onAddNewCatForm}>
              <input
                type='text'
                name='category'
                className='border-2 border-solid'
              />
            </FastInputEdit>
          ) : (
            <button onClick={() => setOpenAddCatForm(true)}>+</button>
          )}
        </li>
      </ul>
    </div>
  );
});

export default CategoriesBar;
