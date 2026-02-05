// Shuffle array using Fisher-Yates algorithm
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Calculate score based on moves, time, and difficulty
export const calculateScore = (moves, time, difficulty) => {
  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2
  };
  
  const baseScore = 1000;
  const movesPenalty = moves * 10;
  const timePenalty = time * 2;
  const difficultyBonus = baseScore * difficultyMultiplier[difficulty];
  
  const score = Math.max(0, Math.round(difficultyBonus - movesPenalty - timePenalty));
  return score;
};

// Format time in MM:SS format
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Play sound effect (using Web Audio API)
export const playSound = (type) => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const sounds = {
      flip: { frequency: 800, duration: 0.1 },
      match: { frequency: 1200, duration: 0.2 },
      win: { frequency: 1600, duration: 0.5 }
    };
    
    const sound = sounds[type];
    if (!sound) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);
  } catch (error) {
    // Silently fail if Web Audio API is not supported
    console.log('Audio not supported');
  }
};