import React from 'react';
import { playSound } from '../utils/gameUtils';
import './Card.css';

const Card = ({ card, isFlipped, isMatched, onClick, theme }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      playSound('flip');
      onClick();
    }
  };

  return (
    <div 
      className={`card ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-pattern">?</div>
        </div>
        <div className="card-back">
          <div className="card-icon">{card.icon}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;