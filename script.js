class YahtzeeGame {
    constructor() {
        this.players = [
            { name: 'HIMANSHU', score: 0, scorecard: {} },
            { name: 'HITESH', score: 0, scorecard: {} }
        ];
        this.currentPlayer = 0;
        this.currentRound = 1;
        this.rollsLeft = 3;
        this.diceValues = [1, 1, 1, 1, 1];
        this.diceKept = [false, false, false, false, false];
        this.gameOver = false;
        this.hasRolled = false;
        this.gameMode = 'friend'; // 'friend' or 'bot'
        this.botThinking = false;
        this.categories = [
            '1s', '2s', '3s', '4s', '5s', '6s',
            'three_of_a_kind', 'four_of_a_kind', 'full_house',
            'small_straight', 'large_straight', 'yahtzee', 'chance'
        ];
        
        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        this.updateUI();
        this.showModeSelection();
    }

    setupEventListeners() {
        // Roll button
        document.getElementById('roll-btn').addEventListener('click', () => {
            this.rollDice();
        });

        // Dice clicking - make entire die clickable
        document.querySelectorAll('.die').forEach((die, index) => {
            die.addEventListener('click', () => {
                this.toggleDieKeep(index);
            });
        });

        // Round item clicks
        document.querySelectorAll('.round-item').forEach(item => {
            item.addEventListener('click', () => {
                const category = item.dataset.category;
                this.selectCategory(category);
            });
        });

        // Score cell clicks
        document.querySelectorAll('.score-cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const category = cell.dataset.category;
                const playerIndex = parseInt(cell.dataset.player);
                
                // Only allow clicking on current player's score cells
                if (playerIndex === this.currentPlayer) {
                    this.selectCategory(category);
                }
            });
        });

        // New game button
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.showModeSelection();
        });

        // Rules button
        document.getElementById('rules-btn').addEventListener('click', () => {
            this.showRules();
        });

        // Modal close
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.hideModals();
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    this.hideModals();
                }
            });
        });

        // Mode selection
        document.querySelectorAll('.mode-option').forEach(option => {
            option.addEventListener('click', () => {
                const mode = option.dataset.mode;
                this.setGameMode(mode);
            });
        });

        // Start game button
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startGame();
        });
    }

    toggleDieKeep(index) {
        if (this.rollsLeft <= 0 || this.gameOver || this.botThinking || !this.hasRolled) return;
        
        this.diceKept[index] = !this.diceKept[index];
        const checkbox = document.getElementById(`keep-${index}`);
        checkbox.checked = this.diceKept[index];
        
        // Recalculate potential scores when dice are kept
        if (this.hasRolled) {
            this.calculatePotentialScores();
        }
    }

    showModeSelection() {
        document.getElementById('mode-modal').style.display = 'block';
    }

    setGameMode(mode) {
        this.gameMode = mode;
        this.hideModals();
        
        if (mode === 'friend') {
            this.showPlayerNames();
        } else {
            this.startGame();
        }
    }

    showPlayerNames() {
        document.getElementById('names-modal').style.display = 'block';
    }

    startGame() {
        if (this.gameMode === 'friend') {
            const player1Name = document.getElementById('player1-input').value.trim() || 'HIMANSHU';
            const player2Name = document.getElementById('player2-input').value.trim() || 'HITESH';
            
            this.players = [
                { name: player1Name, score: 0, scorecard: {} },
                { name: player2Name, score: 0, scorecard: {} }
            ];
        } else {
            this.players = [
                { name: 'HIMANSHU', score: 0, scorecard: {} },
                { name: 'BOT', score: 0, scorecard: {} }
            ];
        }
        
        this.hideModals();
        this.newGame();
        this.updatePlayerScores();
    }

    hideModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    rollDice() {
        if (this.rollsLeft <= 0 || this.botThinking) return;

        // Roll dice that aren't kept
        for (let i = 0; i < 5; i++) {
            if (!this.diceKept[i]) {
                this.diceValues[i] = Math.floor(Math.random() * 6) + 1;
            }
        }

        this.rollsLeft--;
        this.hasRolled = true;
        this.updateUI();
        this.calculatePotentialScores();

        // Add rolling animation
        document.querySelectorAll('.die-face').forEach((die, index) => {
            if (!this.diceKept[index]) {
                die.classList.add('rolling');
                setTimeout(() => {
                    die.classList.remove('rolling');
                }, 500);
            }
        });

        // Check if it's bot's turn
        if (this.gameMode === 'bot' && this.currentPlayer === 1) {
            setTimeout(() => {
                this.handleBotTurn();
            }, 1000);
        }
    }

    handleBotTurn() {
        this.botThinking = true;
        this.updateUI();
        
        // If bot hasn't rolled yet, start with first roll
        if (!this.hasRolled) {
            setTimeout(() => {
                this.botRoll();
            }, 1500);
        } else {
            // Bot continues with existing dice
            setTimeout(() => {
                this.botRoll();
            }, 1500);
        }
    }

    botRoll() {
        // If this is the first roll, roll all dice
        if (!this.hasRolled) {
            for (let i = 0; i < 5; i++) {
                this.diceValues[i] = Math.floor(Math.random() * 6) + 1;
            }
            this.hasRolled = true;
            this.rollsLeft = 2; // After first roll, 2 rolls left
        } else if (this.rollsLeft > 0) {
            // Bot decides which dice to keep
            this.botDecideKeep();
            
            // Roll dice that aren't kept
            for (let i = 0; i < 5; i++) {
                if (!this.diceKept[i]) {
                    this.diceValues[i] = Math.floor(Math.random() * 6) + 1;
                }
            }
            
            this.rollsLeft--;
        }
        
        this.updateUI();
        this.calculatePotentialScores();
        
        // Continue rolling or select category
        if (this.rollsLeft > 0) {
            setTimeout(() => {
                this.botRoll();
            }, 1200);
        } else {
            setTimeout(() => {
                this.botSelectCategory();
            }, 800);
        }
    }

    botDecideKeep() {
        // Improved bot logic for keeping dice
        const frequencyMap = {};
        this.diceValues.forEach(value => {
            frequencyMap[value] = (frequencyMap[value] || 0) + 1;
        });
        
        // Find the most common dice value
        let mostCommonValue = 1;
        let maxFrequency = 0;
        
        for (const [value, frequency] of Object.entries(frequencyMap)) {
            if (frequency > maxFrequency) {
                maxFrequency = frequency;
                mostCommonValue = parseInt(value);
            }
        }
        
        // Keep dice with highest frequency (if frequency >= 2)
        if (maxFrequency >= 2) {
            this.diceValues.forEach((value, index) => {
                if (value === mostCommonValue) {
                    this.diceKept[index] = true;
                } else {
                    this.diceKept[index] = false;
                }
            });
        } else {
            // If no good pattern, keep high-value dice
            this.diceValues.forEach((value, index) => {
                this.diceKept[index] = value >= 5;
            });
        }
        
        // Update checkboxes
        this.diceKept.forEach((kept, index) => {
            const checkbox = document.getElementById(`keep-${index}`);
            checkbox.checked = kept;
        });
    }

    botSelectCategory() {
        // Improved bot category selection
        const availableCategories = this.categories.filter(category => 
            !this.players[this.currentPlayer].scorecard[category]
        );
        
        if (availableCategories.length === 0) {
            this.botThinking = false;
            this.updateUI();
            return;
        }
        
        // Calculate scores for all available categories
        const categoryScores = {};
        availableCategories.forEach(category => {
            categoryScores[category] = this.calculateScore(category);
        });
        
        // Find the best category
        let bestCategory = availableCategories[0];
        let bestScore = categoryScores[bestCategory];
        
        for (const [category, score] of Object.entries(categoryScores)) {
            if (score > bestScore) {
                bestScore = score;
                bestCategory = category;
            }
        }
        
        // If no good score, prioritize upper section for bonus
        if (bestScore === 0) {
            const upperCategories = ['1s', '2s', '3s', '4s', '5s', '6s'];
            const availableUpper = upperCategories.filter(cat => 
                availableCategories.includes(cat)
            );
            
            if (availableUpper.length > 0) {
                bestCategory = availableUpper[0];
            }
        }
        
        if (bestCategory) {
            setTimeout(() => {
                this.selectCategory(bestCategory);
            }, 500);
        } else {
            this.botThinking = false;
            this.updateUI();
        }
    }

    calculatePotentialScores() {
        const potentialScores = {};
        
        this.categories.forEach(category => {
            if (!this.players[this.currentPlayer].scorecard[category]) {
                potentialScores[category] = this.calculateScore(category);
            }
        });

        // Update potential scores in UI for current player only
        document.querySelectorAll('.round-item').forEach(item => {
            const category = item.dataset.category;
            const potentialScore = potentialScores[category];
            
            if (potentialScore !== undefined && this.hasRolled) {
                item.classList.remove('disabled');
                // Update round count with potential score
                const countElement = item.querySelector('.round-count');
                countElement.textContent = `(${potentialScore})`;
            } else {
                if (!this.hasRolled) {
                    item.classList.add('disabled');
                    // Reset round count
                    const countElement = item.querySelector('.round-count');
                    const categoryIndex = this.categories.indexOf(category);
                    if (categoryIndex < 6) {
                        countElement.textContent = `(${categoryIndex + 1})`;
                    } else {
                        countElement.textContent = '(0)';
                    }
                } else {
                    item.classList.remove('disabled');
                }
            }
        });

        // Also update score cells with potential scores
        this.updateScoreCellsWithPotential(potentialScores);
    }

    updateScoreCellsWithPotential(potentialScores) {
        document.querySelectorAll('.score-cell').forEach(cell => {
            const category = cell.dataset.category;
            const playerIndex = parseInt(cell.dataset.player);
            
            // Only show potential scores for current player's empty cells
            if (playerIndex === this.currentPlayer && !this.players[playerIndex].scorecard[category]) {
                const potentialScore = potentialScores[category];
                if (potentialScore !== undefined && this.hasRolled) {
                    // Add potential score as a subtle indicator
                    cell.setAttribute('data-potential', potentialScore);
                    cell.classList.add('has-potential');
                } else {
                    cell.removeAttribute('data-potential');
                    cell.classList.remove('has-potential');
                }
            } else {
                cell.removeAttribute('data-potential');
                cell.classList.remove('has-potential');
            }
        });
    }

    calculateScore(category) {
        const diceValues = [...this.diceValues].sort();
        const frequencyMap = {};
        
        // Count frequency of each number
        diceValues.forEach(value => {
            frequencyMap[value] = (frequencyMap[value] || 0) + 1;
        });

        let score = 0;

        switch (category) {
            case '1s':
            case '2s':
            case '3s':
            case '4s':
            case '5s':
            case '6s':
                const faceValue = parseInt(category.charAt(0));
                score = (frequencyMap[faceValue] || 0) * faceValue;
                break;

            case 'three_of_a_kind':
                for (const count of Object.values(frequencyMap)) {
                    if (count >= 3) {
                        score = diceValues.reduce((sum, val) => sum + val, 0);
                        break;
                    }
                }
                break;

            case 'four_of_a_kind':
                for (const count of Object.values(frequencyMap)) {
                    if (count >= 4) {
                        score = diceValues.reduce((sum, val) => sum + val, 0);
                        break;
                    }
                }
                break;

            case 'full_house':
                const counts = Object.values(frequencyMap);
                if (counts.includes(3) && counts.includes(2)) {
                    score = 25;
                }
                break;

            case 'small_straight':
                const uniqueValues = [...new Set(diceValues)];
                if (this.hasConsecutive(uniqueValues, 4)) {
                    score = 30;
                }
                break;

            case 'large_straight':
                const uniqueValues2 = [...new Set(diceValues)];
                if (this.hasConsecutive(uniqueValues2, 5)) {
                    score = 40;
                }
                break;

            case 'yahtzee':
                for (const count of Object.values(frequencyMap)) {
                    if (count === 5) {
                        score = 50;
                        break;
                    }
                }
                break;

            case 'chance':
                score = diceValues.reduce((sum, val) => sum + val, 0);
                break;
        }

        return score;
    }

    hasConsecutive(values, length) {
        for (let i = 0; i <= values.length - length; i++) {
            let consecutive = true;
            for (let j = 0; j < length - 1; j++) {
                if (values[i + j + 1] - values[i + j] !== 1) {
                    consecutive = false;
                    break;
                }
            }
            if (consecutive) return true;
        }
        return false;
    }

    selectCategory(category) {
        // Don't allow selection if player hasn't rolled yet
        if (!this.hasRolled) {
            alert('Please roll the dice first!');
            return;
        }

        if (this.players[this.currentPlayer].scorecard[category]) {
            alert('This category has already been used!');
            return;
        }

        const score = this.calculateScore(category);
        this.players[this.currentPlayer].scorecard[category] = score;
        this.players[this.currentPlayer].score += score;

        // Update UI
        this.updateScorecard();
        this.updatePlayerScores();

        // End turn and move to next player
        this.nextPlayer();
    }

    nextPlayer() {
        this.currentPlayer = (this.currentPlayer + 1) % 2;
        
        if (this.currentPlayer === 0) {
            this.currentRound++;
        }

        if (this.currentRound > 13) {
            this.endGame();
        } else {
            this.resetTurn();
        }
    }

    resetTurn() {
        this.rollsLeft = 3;
        this.diceValues = [1, 1, 1, 1, 1];
        this.diceKept = [false, false, false, false, false];
        this.hasRolled = false;
        this.botThinking = false;
        
        // Reset dice checkboxes
        document.querySelectorAll('.keep-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });

        this.updateUI();
        this.calculatePotentialScores();

        // If it's bot's turn, start bot logic
        if (this.gameMode === 'bot' && this.currentPlayer === 1) {
            setTimeout(() => {
                this.handleBotTurn();
            }, 1000);
        }
    }

    endGame() {
        this.gameOver = true;
        
        const winner = this.players[0].score > this.players[1].score ? 0 : 1;
        const winnerName = this.players[winner].name;
        const winnerScore = this.players[winner].score;
        const loserScore = this.players[1 - winner].score;
        
        setTimeout(() => {
            alert(`Game Over!\n\n${winnerName} wins with ${winnerScore} points!\n${this.players[1 - winner].name} scored ${loserScore} points.`);
        }, 100);
    }

    updateUI() {
        // Update dice values
        document.querySelectorAll('.die-face').forEach((element, index) => {
            if (this.hasRolled) {
                element.textContent = this.diceValues[index];
            } else {
                element.textContent = '?';
            }
        });

        // Update game info
        document.getElementById('current-player').textContent = this.players[this.currentPlayer].name;
        document.getElementById('current-round').textContent = this.currentRound;
        document.getElementById('rolls-left').textContent = this.rollsLeft;

        // Update roll button
        const rollBtn = document.getElementById('roll-btn');
        rollBtn.disabled = this.rollsLeft <= 0 || this.gameOver || this.botThinking;
        
        if (this.botThinking) {
            rollBtn.textContent = 'BOT THINKING...';
        } else if (this.rollsLeft <= 0) {
            rollBtn.textContent = 'NO ROLLS LEFT';
        } else if (!this.hasRolled) {
            rollBtn.textContent = 'ROLL';
        } else {
            rollBtn.textContent = 'ROLL AGAIN';
        }

        // Update dice checkboxes
        document.querySelectorAll('.keep-checkbox').forEach((checkbox, index) => {
            checkbox.disabled = this.rollsLeft <= 0 || this.gameOver || this.botThinking;
        });
        
        // Update scorecard and player scores
        this.updateScorecard();
        this.updatePlayerScores();
    }

    updateScorecard() {
        // Update both players' scores in the score cells
        document.querySelectorAll('.score-cell').forEach(cell => {
            const category = cell.dataset.category;
            const playerIndex = parseInt(cell.dataset.player);
            const score = this.players[playerIndex].scorecard[category];
            
            if (score !== undefined) {
                cell.textContent = score;
                cell.classList.add('used');
                cell.classList.remove('has-potential');
                cell.removeAttribute('data-potential');
                cell.setAttribute('data-score', score);
            } else {
                cell.textContent = '';
                cell.classList.remove('used');
                cell.removeAttribute('data-score');
            }
        });
    }

    updatePlayerScores() {
        // Update player names in headers
        document.getElementById('player1-name').textContent = this.players[0].name;
        document.getElementById('player2-name').textContent = this.players[1].name;
    }

    newGame() {
        this.currentPlayer = 0;
        this.currentRound = 1;
        this.rollsLeft = 3;
        this.diceValues = [1, 1, 1, 1, 1];
        this.diceKept = [false, false, false, false, false];
        this.gameOver = false;
        this.hasRolled = false;
        this.botThinking = false;

        // Reset UI for both players
        document.querySelectorAll('.score-cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('used', 'has-potential');
            cell.removeAttribute('data-potential', 'data-score');
        });

        document.querySelectorAll('.round-item').forEach((item, index) => {
            item.classList.remove('selected', 'disabled');
            const countElement = item.querySelector('.round-count');
            const category = item.dataset.category;
            const categoryIndex = this.categories.indexOf(category);
            if (categoryIndex < 6) {
                countElement.textContent = `(${categoryIndex + 1})`;
            } else {
                countElement.textContent = '(0)';
            }
        });

        document.querySelectorAll('.keep-checkbox').forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = false;
        });

        this.updateUI();
        
        // If starting with bot mode, ensure bot doesn't start immediately
        if (this.gameMode === 'bot' && this.currentPlayer === 1) {
            // Don't auto-start bot on new game
            this.botThinking = false;
        }
    }

    showRules() {
        document.getElementById('rules-modal').style.display = 'block';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new YahtzeeGame();
}); 