import React, { useEffect } from 'react';
import { formatTime, playSound } from '../utils/gameUtils';
import './WinModal.css';

const WinModal = ({ moves, time, score, bestScore, onNewGame, isNewRecord }) => {
  useEffect(() => {
    playSound('win');
  }, []);

  return (
    <div className="modal-overlay">
      <div className="win-modal">
        <div className="win-animation">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>
        
        <div className="win-content">
          <h2 className="win-title">🎉 Congratulations! 🎉</h2>
          
          {isNewRecord && (
            <div className="new-record">
              <span className="record-badge">🏆 NEW RECORD! 🏆</span>
            </div>
          )}
          
          <div className="win-stats">
            <div className="win-stat">
              <span className="win-stat-label">Moves:</span>
              <span className="win-stat-value">{moves}</span>
            </div>
            <div className="win-stat">
              <span className="win-stat-label">Time:</span>
              <span className="win-stat-value">{formatTime(time)}</span>
            </div>
            <div className="win-stat">
              <span className="win-stat-label">Score:</span>
              <span className="win-stat-value">{score.toLocaleString()}</span>
            </div>
            <div className="win-stat">
              <span className="win-stat-label">Best Score:</span>
              <span className="win-stat-value">{bestScore.toLocaleString()}</span>
            </div>
          </div>
          
          <button 
            onClick={onNewGame}
            className="play-again-btn"
          >
            🎮 Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;