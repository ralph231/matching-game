const CONFIG = {
    levels: [
        { id: 1, pairs: 6, gridCols: 3, timeLimit: 180 },     // Level 1: Starter
        { id: 2, pairs: 8, gridCols: 4, timeLimit: 240 },     // Level 2: Warming up
        { id: 3, pairs: 10, gridCols: 4, timeLimit: 300 },    // Level 3: Getting harder
        { id: 4, pairs: 12, gridCols: 4, timeLimit: 360 },    // Level 4: Challenge begins
        { id: 5, pairs: 16, gridCols: 4, timeLimit: 240 },    // Level 5: Expert mode
        { id: 6, pairs: 18, gridCols: 6, timeLimit: 480 },    // Level 6: Memory master
        { id: 7, pairs: 21, gridCols: 6, timeLimit: 540 },    // Level 7: Brain teaser
        { id: 8, pairs: 24, gridCols: 6, timeLimit: 600 },    // Level 8: Super challenge
        { id: 9, pairs: 28, gridCols: 7, timeLimit: 660 },    // Level 9: Ultra hard
        { id: 10, pairs: 32, gridCols: 8, timeLimit: 720 }    // Level 10: Impossible mode
    ],
    colors: {
        primary: '#ffb6c1',
        secondary: '#fff5f6',
        accent: '#ff69b4'
    },
    gameSettings: {
        defaultTimeLimit: 180,           // 3 minutes
        cardFlipDelay: 1000,
        minPairsPerLevel: 6,
        maxPairsPerLevel: 32,           // Increased for harder levels
        highScoresPerLevel: 5
    }
};

export default CONFIG;