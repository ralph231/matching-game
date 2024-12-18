export default class VictoryPopup {
    constructor() {
        this.popup = document.getElementById('victory-popup');
        this.finalMoves = document.getElementById('final-moves');
        this.finalTime = document.getElementById('final-time');
        this.nextLevelBtn = document.getElementById('next-level-btn');
        
        this.nextLevelBtn.addEventListener('click', () => {
            this.hide();
            // Dispatch event for level completion
            window.dispatchEvent(new CustomEvent('nextLevel'));
        });
    }

    show(stats) {
        this.finalMoves.textContent = stats.moves;
        this.finalTime.textContent = stats.time;
        this.popup.classList.add('show');
        
        // Add floating animation to hearts with random delays
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => {
            heart.style.animationDelay = `${Math.random() * 2}s`;
        });
    }

    hide() {
        this.popup.classList.remove('show');
    }
}
