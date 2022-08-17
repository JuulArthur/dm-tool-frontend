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
    saveOrder: (order: any) => void;
}

const DragAndDropList = ({ items, elementCreator, keyPrefix, saveOrder }: DragAndDropListProps) => {
    const [itemsCopy, setItemsCopy] = useState([...items]);
    useEffect(() => {
        setItemsCopy(itemsCopy.sort((a: any, b: any) => a.order - b.order));
    }, [items]);

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            if (dragIndex !== hoverIndex) {
                const dragItem = itemsCopy[dragIndex];
                const hoverItem = itemsCopy[hoverIndex];
                const updatedSortetList = [...itemsCopy];
                updatedSortetList[hoverIndex] = dragItem;
                updatedSortetList[dragIndex] = hoverItem;
                setItemsCopy(updatedSortetList);
            }
        },
        [itemsCopy]
    );

    const dropHook = () => {
        saveOrder({ orderList: itemsCopy });
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
