export class GameUI {
    static updateLevel(level) {
        document.getElementById('current-level').textContent = level;
    }

    static updateTimeLimit(timeLimit, formatTime) {
        document.getElementById('time-limit').textContent = formatTime(timeLimit);
        document.getElementById('time-remaining').textContent = formatTime(timeLimit);
    }

    static updateMoves(moves) {
        document.getElementById('moves').textContent = moves.toString();
    }

    static updateTime(time, formatTime) {
        document.getElementById('time').textContent = formatTime(time);
    }

    static updateTimeRemaining(remaining, formatTime) {
        document.getElementById('time-remaining').textContent = formatTime(Math.max(0, remaining));
    }

    static setupGrid(cols) {
        const grid = document.getElementById('cards-grid');
        if (grid) {
            grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            return grid;
        }
        return null;
    }

    static clearGrid() {
        const grid = document.getElementById('cards-grid');
        if (grid) {
            grid.innerHTML = '';
        }
    }

    static createModal(content) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `<div class="modal-content">${content}</div>`;
        document.body.appendChild(modal);
        return modal;
    }
}