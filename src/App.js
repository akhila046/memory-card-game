import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import GameStats from './components/GameStats';
import WinModal from './components/WinModal';
import { themes } from './data/themes';
import { shuffleArray, calculateScore } from './utils/gameUtils';
import './App.css';

const DIFFICULTY_LEVELS = {
  easy: { cards: 8, name: 'Easy' },
  medium: { cards: 16, name: 'Medium' },
  hard: { cards: 24, name: 'Hard' }
};

function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [theme, setTheme] = useState('emojis');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [bestScores, setBestScores] = useState({});

  // Load best scores from localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem('memoryGameBestScores');
    if (savedScores) {
      setBestScores(JSON.parse(savedScores));
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  // Initialize game
  const initializeGame = () => {
    const cardCount = DIFFICULTY_LEVELS[difficulty].cards;
    const themeData = themes[theme];
    const selectedIcons = themeData.icons.slice(0, cardCount / 2);
    
    const gameCards = selectedIcons.flatMap((icon, index) => [
      { id: index * 2, icon, matched: false },
      { id: index * 2 + 1, icon, matched: false }
    ]);

    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setGameStarted(false);
    setGameWon(false);
  };

  // Start new game
  const startNewGame = () => {
    initializeGame();
  };

  // Handle card click
  const handleCardClick = (cardId) => {
    if (!gameStarted) setGameStarted(true);
    
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (matchedCards.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCard, secondCard] = newFlippedCards.map(id => 
        cards.find(card => card.id === id)
      );

      if (firstCard.icon === secondCard.icon) {
        // Match found
        const newMatchedCards = [...matchedCards, ...newFlippedCards];
        setMatchedCards(newMatchedCards);
        setFlippedCards([]);
        
        // Check if game is won
        if (newMatchedCards.length === cards.length) {
          setGameWon(true);
          setGameStarted(false);
          
          // Calculate and save score
          const score = calculateScore(moves + 1, time, difficulty);
          const scoreKey = `${difficulty}-${theme}`;
          const currentBest = bestScores[scoreKey] || 0;
          
          if (score > currentBest) {
            const newBestScores = { ...bestScores, [scoreKey]: score };
            setBestScores(newBestScores);
            localStorage.setItem('memoryGameBestScores', JSON.stringify(newBestScores));
          }
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Initialize game on component mount or settings change
  useEffect(() => {
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, theme]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧠 Memory Card Game</h1>
      </header>
      
      <GameControls
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        theme={theme}
        setTheme={setTheme}
        onNewGame={startNewGame}
        difficultyLevels={DIFFICULTY_LEVELS}
        themes={themes}
      />
      
      <GameStats
        moves={moves}
        time={time}
        bestScore={bestScores[`${difficulty}-${theme}`] || 0}
      />
      
      <GameBoard
        cards={cards}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        onCardClick={handleCardClick}
        theme={themes[theme]}
        difficulty={difficulty}
      />
      
      {gameWon && (
        <WinModal
          moves={moves}
          time={time}
          score={calculateScore(moves, time, difficulty)}
          bestScore={bestScores[`${difficulty}-${theme}`] || 0}
          onNewGame={startNewGame}
          isNewRecord={calculateScore(moves, time, difficulty) > (bestScores[`${difficulty}-${theme}`] || 0)}
        />
      )}
    </div>
  );
}

export default App;