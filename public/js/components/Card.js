export class Card {
    static create(cardData, index) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.index = index;
        cardElement.dataset.matchId = cardData.matchId;
        
        cardElement.innerHTML = `
            <div class="card-front">
                <img src="${cardData.src}" alt="card">
            </div>
            <div class="card-back"></div>
        `;
        
        return cardElement;
    }

    static isFlipped(card) {
        return card.classList.contains('flipped');
    }

    static isMatched(card) {
        return card.classList.contains('matched');
    }

    static flip(card) {
        card.classList.add('flipped');
    }

    static unflip(card) {
        card.classList.remove('flipped');
    }

    static markAsMatched(card) {
        card.classList.add('matched');
    }
}