import React from 'react';
import './Card.css';

const Card = ({ title, subtitle, content, imageUrl, onClick, children }) => (
    <div className="card" onClick={onClick}>
        <div className="card-content">
            <h2 className="card-title">{title}</h2>
            <h3 className="card-subtitle">{subtitle}</h3>
            <p className="card-text">{content}</p>
            {children}
        </div>
        <div className="card-image">
            <img src={imageUrl} alt={title} />
        </div>
    </div>
);

export default Card;