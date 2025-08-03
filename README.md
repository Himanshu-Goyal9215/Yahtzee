# Yahtzee Game

A complete Yahtzee game implementation with both terminal and web frontend versions.

## 🎲 Game Overview

Yahtzee is a dice game where players roll 5 dice and try to achieve specific combinations to score points. The game consists of 13 rounds, and each player must fill all categories on their scorecard.

### Scoring Categories

**Upper Section:**
- Ones through Sixes: Sum of dice showing that number

**Lower Section:**
- Three of a Kind: Sum of all dice (if 3+ same)
- Four of a Kind: Sum of all dice (if 4+ same)
- Full House: 25 points (3 of one, 2 of another)
- Small Straight: 30 points (4 consecutive numbers)
- Large Straight: 40 points (5 consecutive numbers)
- Yahtzee: 50 points (5 of a kind)
- Chance: Sum of all dice

## 🚀 How to Play

### Terminal Version (Java)

1. **Compile the Java files:**
   ```bash
   javac *.java
   ```

2. **Run the game:**
   ```bash
   java YahtzeeGame
   ```

3. **Game Flow:**
   - Each player gets 3 rolls per turn
   - Choose which dice to keep between rolls
   - Select a category to score
   - Game ends after 13 rounds

### Web Frontend

1. **Open the web version:**
   - Simply open `index.html` in any modern web browser
   - No server required - it's a pure client-side implementation

2. **Features:**
   - Beautiful, responsive UI
   - Click dice to keep them
   - Click categories to score
   - Real-time potential score display
   - Rules modal
   - New game functionality

## 🛠️ Files Structure

```
Yahtzee/
├── Java Files (Terminal Version)
│   ├── YahtzeeGame.java    # Main game logic
│   ├── Player.java         # Player class
│   ├── Scorecard.java      # Score tracking
│   ├── Dice.java          # Dice operations
│   └── Main.java          # Entry point
├── Web Files (Frontend)
│   ├── index.html         # Main HTML file
│   ├── styles.css         # Modern CSS styling
│   └── script.js          # Complete game logic
└── README.md             # This file
```

## 🔧 Bug Fixes Applied

### Critical Issues Fixed:

1. **Score Calculation Bug**: The `calculateScore` method was using `dice.getValues()` instead of the current `diceValues` array, causing incorrect scoring.

2. **Game Loop Issue**: The main method was calling `playGame()` 13 times instead of once, causing 169 rounds instead of 13.

3. **Case Sensitivity**: Added `.toLowerCase()` to category matching for better user experience.

4. **Dice State Management**: Fixed inconsistent dice usage between the Dice class and manual rolling.

## 🎨 Web Frontend Features

### Modern UI Design:
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Beautiful Gradients**: Modern color scheme with glassmorphism effects
- **Smooth Animations**: Dice rolling animations and hover effects
- **Intuitive Controls**: Click-based interactions

### Game Features:
- **Real-time Scoring**: Potential scores shown for all categories
- **Dice Management**: Checkboxes to keep specific dice
- **Turn Management**: Automatic player switching
- **Score Tracking**: Live updates of player scores
- **Game State**: Clear indication of current player, round, and rolls left

### User Experience:
- **Rules Modal**: Complete game rules accessible anytime
- **New Game**: Reset functionality to start fresh
- **Visual Feedback**: Hover effects and animations
- **Accessibility**: Clear visual hierarchy and readable fonts

## 🎯 Game Rules

1. **Rolling**: Each turn, roll up to 3 times
2. **Keeping Dice**: Choose which dice to keep between rolls
3. **Scoring**: Select one category per turn
4. **Categories**: Each category can only be used once
5. **Game End**: After 13 rounds, highest score wins

## 🚀 Quick Start

### For Terminal Version:
```bash
cd Yahtzee
javac *.java
java YahtzeeGame
```

### For Web Version:
```bash
cd Yahtzee
# Open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🎮 Game Controls

### Terminal Version:
- Enter dice numbers to re-roll (e.g., "1 3 5")
- Enter category name to score (e.g., "chance")

### Web Version:
- Click "Roll Dice" button
- Check/uncheck dice to keep them
- Click on scorecard categories to score
- Use "New Game" to restart
- Click "Rules" for game instructions

## 🔍 Technical Details

### Java Implementation:
- Object-oriented design
- Proper separation of concerns
- Error handling for invalid inputs
- Clean code structure

### JavaScript Implementation:
- ES6+ features
- Class-based architecture
- Event-driven programming
- Responsive design patterns

## 🎯 Future Enhancements

Potential improvements:
- Multiplayer over network
- AI opponents
- Tournament mode
- Statistics tracking
- Sound effects
- More animations

## 📝 License

This project is open source and available for educational and personal use.

---

**Enjoy playing Yahtzee! 🎲**
