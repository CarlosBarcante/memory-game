let game = {
    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    cards: null,
    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return (this.firstCard.icon === this.secondCard.icon);
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    createCards: function () {
        this.cards = [];
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairCards(tech));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairCards: function (tech) {
        return [{
            id: this.createTechID(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createTechID(tech),
            icon: tech,
            flipped: false
        }];
    },

    createTechID: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function () {
        let randomIndex = 0;

        for (var i = this.cards.length - 1; i >= 0; i--) {
            randomIndex = Math.floor(Math.random() * i);
            [this.cards[randomIndex], this.cards[i]] = [this.cards[i], this.cards[randomIndex]];
        }
    },

    gameOverVerification: function () {
        return this.cards.filter(card => !card.flipped).length === 0;
    },

    flipCard: function (cardID, gameOverCallback, noMatchCallback) {
        if (this.setCard(cardID)) {
            if (this.secondCard) {
                if (this.checkMatch()) {
                    this.clearCards();
                    if (this.gameOverVerification()) {
                        gameOverCallback();
                    };
                } else {
                    setTimeout(() => {
                        this.unflipCards();
                        noMatchCallback();
                    }, 1000);
                };
            }
        }
    }
}

export default game;