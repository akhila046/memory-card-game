import React from 'react';
import Card from './Card';
import './GameBoard.css';

const GameBoard = ({ cards, flippedCards, matchedCards, onCardClick, theme, difficulty }) => {
  const getGridClass = () => {
    switch (difficulty) {
      case 'easy': return 'grid-easy';
      case 'medium': return 'grid-medium';
      case 'hard': return 'grid-hard';
      default: return 'grid-easy';
    }
  };

  return (
    <div className={`game-board ${getGridClass()}`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={matchedCards.includes(card.id)}
          onClick={() => onCardClick(card.id)}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default GameBoard;