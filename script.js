const NUMBER_OF_CARDS_IN_DECK = 52;
const NUMBER_OF_CARDS_IN_HAND = 3;
const CARD_NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const CARD_SUITS = ['corazones', 'diamantes', 'tréboles', 'picas'];


function createCard(cardNumbers, cardSuits){
    let lastNumbersIndex = cardNumbers.length - 1
    let lastSuitsIndex = cardSuits.length - 1

    let randomNumberIndex = Math.floor(Math.random() * (lastNumbersIndex + 1));
    let randomSuitIndex = Math.floor(Math.random() * (lastSuitsIndex + 1));

    let card = [cardNumbers[randomNumberIndex], cardSuits[randomSuitIndex]];
    return card;
}

function createDeck(numberOfCardsInDeck){
    const NUMBER_INDEX = 0
    const SUIT_INDEX = 1
    let deck = [];

    while (deck.length < numberOfCardsInDeck) {
        let newCard = createCard(CARD_NUMBERS, CARD_SUITS);
        let isTheCardInTheDeck = false;

        for (let i = 0; i < deck.length; i++) {
            if (deck[i][NUMBER_INDEX] == newCard[NUMBER_INDEX] && deck[i][SUIT_INDEX] == newCard[SUIT_INDEX]) {
            isTheCardInTheDeck = true;
            break;
            }
        }

        if (!isTheCardInTheDeck) {
        deck.push(newCard);
        }
    }
    return deck;
}

function createFirstHand(NUMBER_OF_CARDS_IN_HAND, deck){
    let playerHand = [];
    let cpuHand = [];

    for(let i = 0; i < NUMBER_OF_CARDS_IN_HAND; i++){
        let drawPlayerCard = deck.pop()
        playerHand.push(drawPlayerCard);
        let drawCpuCard = deck.pop()
        cpuHand.push(drawCpuCard);
    }
    console.log(playerHand);
    console.log(cpuHand);
}

let deck = createDeck(NUMBER_OF_CARDS_IN_DECK);
console.log(deck);

let firstHand = createFirstHand(NUMBER_OF_CARDS_IN_HAND, deck);
console.log(deck)