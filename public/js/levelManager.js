import CONFIG from './config.js';

class LevelManager {
    constructor(game) {
        this.game = game;
        this.currentLevel = 1;
        this.highScores = this.loadHighScores();
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    isLastLevel() {
        return this.currentLevel === CONFIG.levels.length;
    }

    advanceLevel() {
        if (this.isLastLevel()) {
            return false;
        }
        this.currentLevel++;
        this.game.initLevel(this.currentLevel);
        return true;
    }

    resetLevel() {
        this.game.initLevel(this.currentLevel);
    }

    resetGame() {
        this.currentLevel = 1;
        this.game.initLevel(1);
    }

    saveScore(levelId, moves, time) {
        const levelScores = this.highScores[levelId] || [];
        const newScore = { moves, time, date: new Date().toISOString() };
        
        levelScores.push(newScore);
        levelScores.sort((a, b) => {
            if (a.moves !== b.moves) {
                return a.moves - b.moves;
            }
            return a.time - b.time;
        });

        // Keep only top 5 scores
        this.highScores[levelId] = levelScores.slice(0, 5);
        this.saveHighScores();
    }

    getHighScores(levelId) {
        return this.highScores[levelId] || [];
    }

    loadHighScores() {
        try {
            const scores = localStorage.getItem('matchingGameHighScores');
            return scores ? JSON.parse(scores) : {};
        } catch (error) {
            console.error('Error loading high scores:', error);
            return {};
        }
    }

    saveHighScores() {
        try {
            localStorage.setItem('matchingGameHighScores', JSON.stringify(this.highScores));
        } catch (error) {
            console.error('Error saving high scores:', error);
        }
    }

    getLevelConfig() {
        return CONFIG.levels[this.currentLevel - 1];
    }

    getProgress() {
        return {
            currentLevel: this.currentLevel,
            totalLevels: CONFIG.levels.length,
            percentage: (this.currentLevel / CONFIG.levels.length) * 100
        };
    }

    checkLevelComplete(moves, time) {
        const levelConfig = this.getLevelConfig();
        const isComplete = true; // You can add additional completion criteria here
        
        if (isComplete) {
            this.saveScore(this.currentLevel, moves, time);
            return {
                isComplete: true,
                isLastLevel: this.isLastLevel(),
                nextLevel: this.currentLevel + 1,
                highScores: this.getHighScores(this.currentLevel)
            };
        }
        
        return { isComplete: false };
    }
}

export default LevelManager;