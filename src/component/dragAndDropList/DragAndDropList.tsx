import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './DragAndDropList.css';
import DragAndDropItem from './DragAndDropListItem';
import { clearConfigCache } from 'prettier';

interface DragAndDropListProps {
    items: any[];
    indexOrder: number[];
    elementCreator: (item: any) => JSX.Element;
    keyPrefix: string;
    saveOrder: (order: any) => void;
}

const DragAndDropList = ({ items, indexOrder, elementCreator, keyPrefix, saveOrder }: DragAndDropListProps) => {
    const [itemsCopy, setItemsCopy] = useState([...items]);
    useEffect(() => {
        //TODO: Fiks slik at order bestemmes av order på elementet og fiks slik at locaitons hentes på samme måte som characters
        if (itemsCopy?.length !== items.length) {
            const unOrderedItemList = [...items];
            const unOrderedIndexList = unOrderedItemList.map((item) => item.id);
            const orderedList = [];
            for (let index of indexOrder) {
                orderedList.push(unOrderedItemList[unOrderedIndexList.indexOf(index)]);
            }
            orderedList.push(...unOrderedItemList.filter((item) => indexOrder.indexOf(item.id) === -1));
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

    const dropHook = () => {
        saveOrder({ orderList: itemsCopy.map((item) => item.id) });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {itemsCopy.map((item, index) => {
                    return (
                        <DragAndDropItem
                            key={keyPrefix + item?.id}
                            // @ts-ignore
                            index={index}
                            moveListItem={moveListItem}
                            dropHook={dropHook}
                        >
                            {elementCreator(item)}
                        </DragAndDropItem>
                    );
                })}
            </div>
        </DndProvider>
    );
};

export default DragAndDropList;
