import { getCardsForLevel } from './cards.js';
import LevelManager from './levelManager.js';
import CONFIG from './config.js';
import { formatTime, shuffleArray } from './utils.js';
import { GameUI } from './components/GameUI.js';
import { Card } from './components/Card.js';
import { Timer } from './components/Timer.js';
import AudioManager from './components/AudioManager.js';

class MatchingGame {
    constructor() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
        this.audioManager = new AudioManager();
        this.setupAudioControls();
        this.audioManager.startGame(); // Start background music
    }

    initialize() {
        this.levelManager = new LevelManager(this);
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.gameStarted = false;

        this.timer = new Timer(
            (timeElapsed, timeLimit) => {
                GameUI.updateTime(timeElapsed, formatTime);
                GameUI.updateTimeRemaining(timeLimit - timeElapsed, formatTime);
            },
            () => this.handleTimeUp()
        );

        this.bindEventListeners();
        this.initLevel(1);
    }

    bindEventListeners() {
        const grid = document.getElementById('cards-grid');
        if (grid) {
            grid.addEventListener('click', (e) => {
                const card = e.target.closest('.card');
                if (card && !Card.isFlipped(card)) {
                    this.flipCard(card);
                }
            });
        }
    }

    initLevel(level) {
        this.resetGameState();
        const levelConfig = CONFIG.levels[level - 1];
        
        GameUI.updateLevel(level);
        GameUI.updateTimeLimit(levelConfig.timeLimit, formatTime);
        
        const grid = GameUI.setupGrid(levelConfig.gridCols);
        if (grid) {
            this.cards = shuffleArray(getCardsForLevel(level));
            this.renderCards();
            
            this.timer.start(levelConfig.timeLimit);
        }
    }

    resetGameState() {
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.timeElapsed = 0;
        this.gameStarted = false;
        
        this.timer.stop();
        
        GameUI.updateMoves(0);
        GameUI.updateTime(0, formatTime);
        GameUI.clearGrid();
    }

    renderCards() {
        const grid = document.getElementById('cards-grid');
        if (!grid) return;

        grid.innerHTML = '';
        this.cards.forEach((card, index) => {
            const cardElement = Card.create(card, index);
            grid.appendChild(cardElement);
        });
    }

    flipCard(card) {
        if (this.flippedCards.length >= 2 || Card.isMatched(card)) return;
        
        if (!this.gameStarted) {
            this.gameStarted = true;
        }
        
        Card.flip(card);
        this.audioManager.playFlip(); // Play flip sound
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 2) {
            this.moves++;
            GameUI.updateMoves(this.moves);
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const match = card1.dataset.matchId === card2.dataset.matchId;
        
        if (match) {
            this.handleMatch(card1, card2);
        } else {
            this.handleMismatch(card1, card2);
        }
    }

    handleMatch(card1, card2) {
        Card.markAsMatched(card1);
        Card.markAsMatched(card2);
        this.matchedPairs++;
        this.flippedCards = [];
        this.audioManager.playMatch(); // Play match sound
        
        if (this.isLevelComplete()) {
            this.handleLevelComplete();
        }
    }

    handleMismatch(card1, card2) {
        setTimeout(() => {
            Card.unflip(card1);
            Card.unflip(card2);
            this.flippedCards = [];
            this.audioManager.playWrong(); // Play wrong match sound
        }, CONFIG.gameSettings.cardFlipDelay);
    }

    isLevelComplete() {
        const levelConfig = this.levelManager.getLevelConfig();
        return this.matchedPairs === levelConfig.pairs;
    }

    handleLevelComplete() {
        const result = this.levelManager.checkLevelComplete(this.moves, this.timer.getTimeElapsed());
        
        if (result.isComplete) {
            this.timer.stop();
            this.audioManager.playVictory(); // Play victory sound
            
            setTimeout(() => {
                if (result.isLastLevel) {
                    this.showGameComplete();
                } else {
                    this.showLevelComplete(result);
                }
            }, 500);
        }
    }

    showLevelComplete(result) {
        const content = `
            <h2>Level ${this.levelManager.getCurrentLevel()} Complete!</h2>
            <p>Moves: ${this.moves}</p>
            <p>Time: ${formatTime(this.timer.getTimeElapsed())}</p>
            <button class="btn" id="next-level">Next Level</button>
        `;
        
        const modal = GameUI.createModal(content);
        document.getElementById('next-level').addEventListener('click', () => {
            modal.remove();
            this.levelManager.advanceLevel();
        });
    }

    showGameComplete() {
        const content = `
            <h2>Congratulations!</h2>
            <p>You've completed all levels!</p>
            <p>Total Time: ${formatTime(this.timer.getTimeElapsed())}</p>
            <p>Total Moves: ${this.moves}</p>
            <button class="btn" id="restart-game">Play Again</button>
        `;
        
        const modal = GameUI.createModal(content);
        document.getElementById('restart-game').addEventListener('click', () => {
            modal.remove();
            this.levelManager.resetGame();
        });
    }

    handleTimeUp() {
        const content = `
            <h2>Time's Up!</h2>
            <p>Try again?</p>
            <button class="btn" id="retry-level">Retry Level</button>
        `;
        
        const modal = GameUI.createModal(content);
        document.getElementById('retry-level').addEventListener('click', () => {
            modal.remove();
            this.levelManager.resetLevel();
        });
    }

    setupAudioControls() {
        const musicToggle = document.getElementById('music-toggle');
        const soundToggle = document.getElementById('sound-toggle');
        const volumeSlider = document.getElementById('music-volume');

        if (musicToggle) {
            musicToggle.addEventListener('click', () => {
                if (this.audioManager.isMusicPlaying) {
                    this.audioManager.stopMusic();
                    musicToggle.querySelector('i').classList.replace('fa-music', 'fa-music-slash');
                } else {
                    this.audioManager.startGame();
                    musicToggle.querySelector('i').classList.replace('fa-music-slash', 'fa-music');
                }
            });
        }

        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                this.audioManager.toggleMute();
                const icon = soundToggle.querySelector('i');
                icon.classList.toggle('fa-volume-up');
                icon.classList.toggle('fa-volume-mute');
            });
        }

        if (volumeSlider) {
            // Set initial volume
            volumeSlider.value = this.audioManager.getMusicVolume();
            
            // Update volume when slider changes
            volumeSlider.addEventListener('input', (e) => {
                this.audioManager.setMusicVolume(e.target.value);
            });
        }
    }

    cleanup() {
        this.audioManager.stopAll(); // Stop all sounds
    }
}

export default MatchingGame;