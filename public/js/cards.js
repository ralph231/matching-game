import CONFIG from './config.js';

const allCardImages = [
    // Basic Cute Set (Level 1-3)
    { id: 1, src: '/images/basic/heart.svg' },
    { id: 2, src: '/images/basic/flower.svg' },
    { id: 3, src: '/images/basic/butterfly.svg' },
    { id: 4, src: '/images/basic/star.svg' },
    { id: 5, src: '/images/basic/moon.svg' },
    { id: 6, src: '/images/basic/rainbow.svg' },
    { id: 7, src: '/images/basic/unicorn.svg' },
    { id: 8, src: '/images/basic/crown.svg' },
    { id: 9, src: '/images/basic/diamond.svg' },
    { id: 10, src: '/images/basic/cloud.svg' },
    
    // Adorable Animals Set (Level 4-6)
    { id: 11, src: '/images/animals/cat.svg' },
    { id: 12, src: '/images/animals/bird.svg' },
    { id: 13, src: '/images/animals/bunny.svg' },
    { id: 14, src: '/images/animals/puppy.svg' },
    { id: 15, src: '/images/animals/panda.svg' },
    { id: 16, src: '/images/animals/penguin.svg' },
    { id: 17, src: '/images/animals/dolphin.svg' },
    { id: 18, src: '/images/animals/koala.svg' },
    
    // Sweet Treats Set (Level 7-8)
    { id: 19, src: '/images/sweet/candy.svg' }, 
    { id: 20, src: '/images/sweet/rose.svg' }, 
    { id: 21, src: '/images/sweet/bell.svg' },  
    { id: 22, src: '/images/sweet/cherry.svg' },  
    { id: 23, src: '/images/sweet/strawberry.svg' },  
    { id: 24, src: '/images/sweet/cupcake.svg' },  
    { id: 25, src: '/images/sweet/ice-cream.svg' }, 
    { id: 26, src: '/images/sweet/donut.svg' }, 
    { id: 27, src: '/images/sweet/cake.svg' }, 
    { id: 28, src: '/images/sweet/cookie.svg' }, 
    
    // Fashion & Accessories Set (Level 9-10)
    { id: 29, src: '/images/fashion/bow.svg' }, 
    { id: 30, src: '/images/fashion/ribbon.svg' }, 
    { id: 31, src: '/images/fashion/gift.svg' },
    { id: 32, src: '/images/fashion/balloon.svg' }, 
    { id: 33, src: '/images/fashion/perfume.svg' }, 
    { id: 34, src: '/images/fashion/lipstick.svg' },
    { id: 35, src: '/images/fashion/handbag.svg' }, 
    { id: 36, src: '/images/fashion/shoes.svg' }  
];

export function getCardsForLevel(level) {
    const levelConfig = CONFIG.levels[level - 1];
    let selectedCards;
    
    // For higher levels (7-10), mix cards from different categories
    if (level >= 7) {
        // Shuffle all cards and select required number of pairs
        const shuffled = [...allCardImages].sort(() => Math.random() - 0.5);
        selectedCards = shuffled.slice(0, levelConfig.pairs);
    } else {
        // For lower levels, use sequential cards for consistent difficulty
        const startIndex = (level - 1) * 8; // Each level gets 8 new cards
        selectedCards = allCardImages.slice(startIndex, startIndex + levelConfig.pairs);
    }
    
    // Create pairs and shuffle them
    const cardPairs = selectedCards.flatMap(card => [
        { ...card, matchId: card.id },
        { ...card, matchId: card.id }
    ]).sort(() => Math.random() - 0.5);
    
    return cardPairs;
}