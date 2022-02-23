import React, { useCallback, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './DragAndDropList.css';

//https://medium.com/nmc-techblog/easy-drag-and-drop-in-react-22778b30ba37
const DragAndDropItem = ({ text, index, moveListItem }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { text, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [collectedProps, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = index;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            item.index = hoverIndex;
            return moveListItem(dragIndex, hoverIndex);
        },
    });

    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));
    const opacity = isDragging ? 0 : 1;

    const element = (
        <div ref={dragDropRef} className="DragAndDropList-element" style={{ opacity }}>
            {text}
        </div>
    );
    return element;
};

const elements = [
    { id: 1, title: 'cake' },
    { id: 2, title: 'bake' },
    { id: 3, title: 'snake' },
];

const DragAndDropList = ({}) => {
    const [pets, setPets] = useState(elements);

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = pets[dragIndex];
            const hoverItem = pets[hoverIndex];
            const updatedPetsList = [...pets];
            updatedPetsList[hoverIndex] = dragItem;
            updatedPetsList[dragIndex] = hoverItem;
            setPets(updatedPetsList);
        },
        [pets]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {pets.map((pet, index) => (
                    <DragAndDropItem
                        key={pet.id}
                        index={index}
                        text={pet.id + ': ' + pet.title}
                        moveListItem={moveListItem}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default DragAndDropList;
