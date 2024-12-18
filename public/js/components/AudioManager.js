class AudioManager {
    constructor() {
        this.sounds = {
            flip: new Audio('/audio/flip.mp3'),
            match: new Audio('/audio/match.mp3'),
            wrong: new Audio('/audio/wrong.mp3'),
            victory: new Audio('/audio/victory.mp3'),
            bgMusic: new Audio('/audio/background-music.mp3')
        };

        // Configure background music
        this.sounds.bgMusic.loop = true;
        this.sounds.bgMusic.volume = 0.3;

        // Configure sound effects
        this.sounds.flip.volume = 0.6;
        this.sounds.match.volume = 0.6;
        this.sounds.wrong.volume = 0.5;
        this.sounds.victory.volume = 0.7;

        this.isMuted = false;
        this.isMusicPlaying = false;
    }

    playFlip() {
        if (!this.isMuted) {
            this.sounds.flip.currentTime = 0;
            this.sounds.flip.play();
        }
    }

    playMatch() {
        if (!this.isMuted) {
            this.sounds.match.currentTime = 0;
            this.sounds.match.play();
        }
    }

    playWrong() {
        if (!this.isMuted) {
            this.sounds.wrong.currentTime = 0;
            this.sounds.wrong.play();
        }
    }

    playVictory() {
        if (!this.isMuted) {
            this.sounds.victory.currentTime = 0;
            this.sounds.victory.play();
        }
    }

    toggleBackgroundMusic() {
        if (this.isMusicPlaying) {
            this.sounds.bgMusic.pause();
            this.isMusicPlaying = false;
        } else {
            this.sounds.bgMusic.play();
            this.isMusicPlaying = true;
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.sounds.bgMusic.pause();
            this.isMusicPlaying = false;
        }
        return this.isMuted;
    }

    setMusicVolume(volume) {
        const normalizedVolume = volume / 100;
        this.sounds.bgMusic.volume = normalizedVolume;
    }

    getMusicVolume() {
        return this.sounds.bgMusic.volume * 100;
    }

    // Call this when starting a new game
    startGame() {
        if (!this.isMuted && !this.isMusicPlaying) {
            this.sounds.bgMusic.play();
            this.isMusicPlaying = true;
        }
    }

    // Call this when game is paused or ended
    stopAll() {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
        this.isMusicPlaying = false;
    }
}

export default AudioManager;
