import type { XYCoord } from 'dnd-core';
import { DropTargetMonitor } from 'react-dnd';

export const dndHover = <Item extends { index: number }>(
  item: Item,
  index: number,
  monitor: DropTargetMonitor<Item, void>,
  moveItem: (dragIndex: number, hoverIndex: number) => void,
  ref: React.RefObject<HTMLDivElement | HTMLLIElement>
) => {
  if (!ref.current) {
    return;
  }
  const dragIndex = item.index;
  const hoverIndex = index;

  if (dragIndex === hoverIndex) {
    return;
  }

  const hoverBoundingRect = ref.current?.getBoundingClientRect();
  const hoverMiddleX = (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
  const clientOffset = monitor.getClientOffset();
  const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.right;

  if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
    return;
  }
  if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
    return;
  }

  moveItem(dragIndex, hoverIndex);

  item.index = hoverIndex;
};
