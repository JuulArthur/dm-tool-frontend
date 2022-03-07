import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './DragAndDropList.css';

interface DragAndDropItemProps {
    index: string;
    moveListItem: any;
    children: JSX.Element;
}

//https://medium.com/nmc-techblog/easy-drag-and-drop-in-react-22778b30ba37
const DragAndDropItem = ({ children, index, moveListItem }: DragAndDropItemProps) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [collectedProps, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            // @ts-ignore
            const dragIndex = item.index;
            const hoverIndex = index;
            // @ts-ignore
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // @ts-ignore
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // @ts-ignore
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            // @ts-ignore
            item.index = hoverIndex;
            return moveListItem(dragIndex, hoverIndex);
        },
    });

    const ref = useRef<HTMLDivElement>(null);
    const dragDropRef = dragRef(dropRef(ref));
    const opacity = isDragging ? 0 : 1;

    return (
        // @ts-ignore
        <div ref={dragDropRef} className="DragAndDropList-element" style={{ opacity }}>
            {children}
        </div>
    );
};

export default DragAndDropItem;
