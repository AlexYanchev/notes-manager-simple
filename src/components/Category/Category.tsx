// Category.tsx

import React, { FC, useRef } from 'react';
import { selectCategories } from '../../redux/categories/categoriesSelector';
import { setActiveCategory } from '../../redux/categories/categoriesSlice';
import {
  useNotesManagerAppDispatch,
  useNotesManagerAppSelector,
} from '../../redux/store';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { dndHover } from '../../utils/dndHover';

interface CategoryProps {
  name: string;
  index: number;
  moveCategory: (dragIndex: number, hoverIndex: number) => void;
}

const Category: FC<CategoryProps> = ({ name, index, moveCategory }) => {
  const dispatch = useNotesManagerAppDispatch();
  const categoryRef = useRef<HTMLLIElement>(null);
  const { activeCategory } = useNotesManagerAppSelector(selectCategories);

  const [{ handlerId }, drop] = useDrop<
    { name: string; index: number },
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'category',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { name: string; index: number }, monitor) {
      categoryRef.current &&
        dndHover(
          item,
          index,
          monitor,
          moveCategory,
          categoryRef as React.RefObject<HTMLLIElement>
        );
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'category',
    item: () => {
      return { name, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 'opacity-20' : 'opacity-100';
  drag(drop(categoryRef));

  return (
    <li
      ref={categoryRef}
      key={index}
      className={`${opacity} ${
        activeCategory === name ? 'underline underline-offset-2' : ''
      } cursor-pointer`}
      onClick={() => dispatch(setActiveCategory(index))}
      data-handler-id={handlerId}
    >
      {name}
    </li>
  );
};

export default Category;
