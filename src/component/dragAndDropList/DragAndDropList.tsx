import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './DragAndDropList.css';
import DragAndDropItem from './DragAndDropListItem';

interface DragAndDropListProps {
    items: any[],
    elementCreator: (item: any) => JSX.Element,
}

const DragAndDropList = ({ items, elementCreator }: DragAndDropListProps) => {
    const [itemsCopy, setItemsCopy] = useState(items);
    useEffect(() => {
        if (itemsCopy?.length != items.length) {
            setItemsCopy(items);
        }
    }, [items]);

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = itemsCopy[dragIndex];
            const hoverItem = itemsCopy[hoverIndex];
            const updatedPetsList = [...itemsCopy];
            updatedPetsList[hoverIndex] = dragItem;
            updatedPetsList[dragIndex] = hoverItem;
            setItemsCopy(updatedPetsList);
        },
        [itemsCopy]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {itemsCopy.map((item, index) => (
                    <DragAndDropItem
                        key={item.id}
                        // @ts-ignore
                        index={index}
                        moveListItem={moveListItem}
                    >
                        {elementCreator(item)}
                    </DragAndDropItem>
                ))}
            </div>
        </DndProvider>
    );

};

export default DragAndDropList;
