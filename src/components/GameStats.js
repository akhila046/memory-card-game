import React from 'react';
import { formatTime } from '../utils/gameUtils';
import './GameStats.css';

const GameStats = ({ moves, time, bestScore }) => {
  return (
    <div className="game-stats">
      <div className="stat-item">
        <div className="stat-icon">🎯</div>
        <div className="stat-content">
          <div className="stat-label">Moves</div>
          <div className="stat-value">{moves}</div>
        </div>
      </div>
      
      <div className="stat-item">
        <div className="stat-icon">⏱️</div>
        <div className="stat-content">
          <div className="stat-label">Time</div>
          <div className="stat-value">{formatTime(time)}</div>
        </div>
      </div>
      
      <div className="stat-item">
        <div className="stat-icon">🏆</div>
        <div className="stat-content">
          <div className="stat-label">Best Score</div>
          <div className="stat-value">{bestScore.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;