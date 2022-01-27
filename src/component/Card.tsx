import React from 'react';
import './Card.css';

interface CardProps {
    children: JSX.Element | JSX.Element[];
}

const Card = ({children}: CardProps) => {
    return (
        <div className="Card-container">
            {children}
            </div>
    );
};

export default Card;