import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './DragAndDropList.css';
import DragAndDropItem from './DragAndDropListItem';

interface DragAndDropListProps {
    items: any[];
    indexOrder: number[];
    elementCreator: (item: any) => JSX.Element;
    keyPrefix: string;
}

const DragAndDropList = ({ items, indexOrder, elementCreator, keyPrefix }: DragAndDropListProps) => {
    const [itemsCopy, setItemsCopy] = useState(items);
    useEffect(() => {
        //Fiks problem hvor ikke alltid karakterer vises riktig
        if (itemsCopy?.length != items.length) {
            const unOrderedItemList = [...items];
            const unOrderedIndexList = unOrderedItemList.map((item) => item.id);
            const orderedList = [];
            for (let index of indexOrder) {
                orderedList.push(unOrderedItemList.splice(unOrderedIndexList.indexOf(index), 1)[0]);
            }
            orderedList.push(...unOrderedItemList);
            setItemsCopy(orderedList);
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
                        key={keyPrefix + item.id}
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
