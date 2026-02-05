import React from 'react';
import './GameControls.css';

const GameControls = ({ 
  difficulty, 
  setDifficulty, 
  theme, 
  setTheme, 
  onNewGame, 
  difficultyLevels, 
  themes 
}) => {
  return (
    <div className="game-controls">
      <div className="control-group">
        <label htmlFor="difficulty">Difficulty:</label>
        <select 
          id="difficulty"
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          className="control-select"
        >
          {Object.entries(difficultyLevels).map(([key, level]) => (
            <option key={key} value={key}>
              {level.name} ({level.cards} cards)
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="theme">Theme:</label>
        <select 
          id="theme"
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
          className="control-select"
        >
          {Object.entries(themes).map(([key, themeData]) => (
            <option key={key} value={key}>
              {themeData.name}
            </option>
          ))}
        </select>
      </div>

      <button 
        onClick={onNewGame}
        className="new-game-btn"
      >
        🎮 New Game
      </button>
    </div>
  );
};

export default GameControls;