# 🧠 Advanced Memory Card Game

A feature-rich Memory Card Game built with React.js featuring multiple difficulty levels, themes, animations, and score tracking.

## 🎮 Features

- **Multiple Difficulty Levels**: Easy (8 cards), Medium (16 cards), Hard (24 cards)
- **Theme Selection**: Choose from Emojis, Fruits, or Programming icons
- **Game Statistics**: Real-time move counter and timer
- **Score System**: Advanced scoring based on moves, time, and difficulty
- **Best Score Tracking**: Saves your best scores using localStorage
- **Smooth Animations**: CSS-powered card flip animations and winning effects
- **Sound Effects**: Audio feedback for card flips, matches, and wins
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Winning Celebration**: Animated modal with confetti effects

## 🚀 Live Demo
[Play the Game Here](https://memory-card-game-ba9567.netlify.app/)



## 📁 Project Structure

```
memory-card-game/
├── public/
│   ├── index.html              # Main HTML template
│   └── _redirects              # Netlify SPA routing
├── src/
│   ├── components/             # React components
│   │   ├── Card.js            # Individual card component
│   │   ├── Card.css           # Card styling and flip animations
│   │   ├── GameBoard.js       # Game grid layout
│   │   ├── GameBoard.css      # Responsive grid styling
│   │   ├── GameControls.js    # Difficulty and theme selectors
│   │   ├── GameControls.css   # Control panel styling
│   │   ├── GameStats.js       # Move counter, timer, best score
│   │   ├── GameStats.css      # Statistics display styling
│   │   ├── WinModal.js        # Victory celebration modal
│   │   └── WinModal.css       # Win animation and confetti
│   ├── data/
│   │   └── themes.js          # Theme configurations and icons
│   ├── utils/
│   │   └── gameUtils.js       # Game logic utilities
│   ├── App.js                 # Main application component
│   ├── App.css                # Main app styling
│   ├── index.js               # React entry point
│   └── index.css              # Global styles
├── netlify.toml               # Netlify deployment config
├── vercel.json                # Vercel deployment config
├── firebase.json              # Firebase deployment config
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/memory-card-game.git
   cd memory-card-game
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to play the game!

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🌐 Deployment Guide

### 🚀 Netlify (Recommended - Easiest)

#### Method 1: Drag & Drop Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Go to [netlify.com](https://netlify.com)**
3. **Sign up/Login** (free account)
4. **Find the "Deploy" section** on the homepage
5. **Drag your `build` folder** directly onto the deploy area
6. **Get your live URL instantly!**

#### Method 2: Git Integration (Recommended for updates)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect Netlify to GitHub:**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Build settings are automatically detected
   - Deploy!

3. **Auto-deployment:** Every push to main branch will trigger a new deployment

#### Netlify Configuration

The project includes `netlify.toml` with optimized settings:
```toml
[build]
  publish = "build"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 🔥 Other Deployment Options

#### Vercel
```bash
npm i -g vercel
vercel --prod
```

#### Firebase Hosting
```bash
npm i -g firebase-tools
firebase login
firebase init
firebase deploy
```

#### Surge.sh
```bash
npm i -g surge
npm run build
cd build
surge
```

## 🎯 Game Logic

### Core Components

1. **App.js**: Main game state management
   - Handles card shuffling and game initialization
   - Manages flipped cards and match detection
   - Controls timer and move counting
   - Saves/loads best scores from localStorage

2. **Card.js**: Individual card behavior
   - Flip animations using CSS transforms
   - Click handling with sound effects
   - Visual states (normal, flipped, matched)

3. **GameBoard.js**: Grid layout management
   - Responsive grid sizing based on difficulty
   - Card positioning and spacing

4. **GameControls.js**: User interface controls
   - Difficulty level selection
   - Theme switching
   - New game functionality

5. **GameStats.js**: Real-time statistics
   - Move counter
   - Timer display
   - Best score tracking

6. **WinModal.js**: Victory celebration
   - Animated confetti effects
   - Score summary
   - New record detection

### Game Mechanics

- **Card Matching**: Players flip two cards at a time to find matching pairs
- **Move Counting**: Each pair of flips counts as one move
- **Timer**: Starts when the first card is flipped
- **Scoring**: Based on moves, time, and difficulty level
- **Best Scores**: Saved per difficulty-theme combination

### Scoring Algorithm

```javascript
const baseScore = 1000;
const movesPenalty = moves * 10;
const timePenalty = time * 2;
const difficultyBonus = baseScore * difficultyMultiplier[difficulty];

score = Math.max(0, difficultyBonus - movesPenalty - timePenalty);
```

## 🎨 Themes

### Available Themes

1. **Emojis**: Animal emojis (🐶, 🐱, 🐭, etc.)
2. **Fruits**: Fruit emojis (🍎, 🍊, 🍋, etc.)
3. **Programming**: Tech-related emojis (⚛️, 🔧, ⚙️, etc.)

Each theme has 12 unique icons to support all difficulty levels.

## 📱 Responsive Design

The game adapts to different screen sizes:

- **Desktop (1200px+)**: Full-size cards with optimal spacing
- **Tablet (768px-1199px)**: Medium-sized cards with adjusted grid
- **Mobile (320px-767px)**: Compact layout with touch-friendly cards

### Breakpoints

```css
/* Desktop */
@media (min-width: 1200px) { /* Full layout */ }

/* Tablet */
@media (max-width: 768px) { /* Adjusted grid */ }

/* Mobile */
@media (max-width: 480px) { /* Compact layout */ }
```

## 🔊 Sound Effects

The game includes Web Audio API-generated sound effects:

- **Card Flip**: Short beep when flipping cards
- **Match Found**: Higher-pitched success sound
- **Game Won**: Extended celebration tone

Sound effects are optional and gracefully degrade if Web Audio API is not supported.

## 💾 Data Persistence

Best scores are automatically saved to localStorage with keys formatted as:
`{difficulty}-{theme}` (e.g., "easy-emojis", "hard-programming")

Data structure:
```javascript
{
  "easy-emojis": 850,
  "medium-fruits": 1200,
  "hard-programming": 1800
}
```

## 🛠️ Customization

### Adding New Themes

1. Edit `src/data/themes.js`
2. Add a new theme object:
```javascript
newTheme: {
  name: 'New Theme',
  icons: ['🎵', '🎸', '🎹', '🎤', '🎧', '🎺', '🎻', '🥁', '🎷', '🎪', '🎭', '🎨'],
  background: 'linear-gradient(135deg, #color1 0%, #color2 100%)'
}
```
3. Ensure at least 12 unique icons for hard difficulty

### Modifying Difficulty Levels

1. Update `DIFFICULTY_LEVELS` in `src/App.js`:
```javascript
const DIFFICULTY_LEVELS = {
  easy: { cards: 8, name: 'Easy' },
  medium: { cards: 16, name: 'Medium' },
  hard: { cards: 24, name: 'Hard' },
  expert: { cards: 32, name: 'Expert' } // New level
};
```

2. Adjust CSS grid classes in `src/components/GameBoard.css`

### Changing Scoring

Modify the `calculateScore` function in `src/utils/gameUtils.js`:
```javascript
export const calculateScore = (moves, time, difficulty) => {
  // Your custom scoring logic here
};
```

## 🎯 Performance Optimizations

- **Efficient Re-renders**: Uses React's built-in optimization
- **CSS Animations**: Hardware-accelerated transforms
- **Minimal State Updates**: Batched state changes
- **Responsive Images**: Emoji-based icons for fast loading
- **Code Splitting**: Automatic with Create React App
- **Gzipped Bundle**: ~48KB total size

## 🐛 Troubleshooting

### Common Issues

1. **Cards not flipping**: Check browser CSS transform support
2. **No sound**: Ensure Web Audio API is supported
3. **Layout issues**: Verify CSS Grid compatibility
4. **Build errors**: Clear node_modules and reinstall

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Development Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Reset git if needed
git clean -fd
git reset --hard HEAD
```

## 📊 Build Information

- **Bundle Size**: ~48KB (gzipped)
- **Dependencies**: React 18.2.0, React-DOM 18.2.0
- **Build Tool**: Create React App 5.0.1
- **CSS**: Pure CSS with CSS Grid and Flexbox
- **Icons**: Unicode Emojis (no external fonts)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Acknowledgments

- React team for the amazing framework
- Create React App for the build setup
- Netlify for easy deployment
- Unicode Consortium for emoji support

---

**Enjoy playing the Memory Card Game! 🎮**

*Built with ❤️ using React.js*
