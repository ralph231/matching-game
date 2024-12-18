export class Timer {
    constructor(onTick, onTimeUp) {
        this.gameTimer = null;
        this.timeRemainingInterval = null;
        this.timeElapsed = 0;
        this.timeLimit = 0;
        this.onTick = onTick;
        this.onTimeUp = onTimeUp;
    }

    start(timeLimit) {
        this.timeLimit = timeLimit;
        this.timeElapsed = 0;

        this.gameTimer = setInterval(() => {
            this.timeElapsed++;
            this.onTick(this.timeElapsed, this.timeLimit);
        }, 1000);

        this.timeRemainingInterval = setInterval(() => {
            const remaining = this.timeLimit - this.timeElapsed;
            if (remaining <= 0) {
                this.stop();
                this.onTimeUp();
            }
        }, 1000);
    }

    stop() {
        if (this.gameTimer) clearInterval(this.gameTimer);
        if (this.timeRemainingInterval) clearInterval(this.timeRemainingInterval);
    }

    getTimeElapsed() {
        return this.timeElapsed;
    }
}