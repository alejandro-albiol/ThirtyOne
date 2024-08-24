const CARD_NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const CARD_SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const NUMBER_OF_CARDS_IN_DECK = 52;
const NUMBER_OF_CARDS_IN_HAND = 3;
const INDEX_OF_USER_HAND = 0;
const INDEX_OF_CPU_HAND = 1;
const INDEX_OF_NUMBER_IN_CARD = 0;
const INDEX_OF_SUIT_IN_CARD = 1;
const VALUE_OF_J_Q_K_CARDS = 10;
const VALUE_OF_AS_CARD = 11;

function createCard(cardNumbers, cardSuits){
    let lastNumbersIndex = cardNumbers.length - 1
    let lastSuitsIndex = cardSuits.length - 1

    let randomNumberIndex = Math.floor(Math.random() * (lastNumbersIndex + 1));
    let randomSuitIndex = Math.floor(Math.random() * (lastSuitsIndex + 1));

    let card = [cardNumbers[randomNumberIndex], cardSuits[randomSuitIndex]];
    return card;
}

function createDeck(numberOfCardsInDeck){
    let deck = [];

    while (deck.length < numberOfCardsInDeck) {
        let newCard = createCard(CARD_NUMBERS, CARD_SUITS);
        let isTheCardInTheDeck = false;

        for (let i = 0; i < deck.length; i++) {
            if (deck[i][INDEX_OF_NUMBER_IN_CARD] == newCard[INDEX_OF_NUMBER_IN_CARD] && deck[i][INDEX_OF_SUIT_IN_CARD] == newCard[INDEX_OF_SUIT_IN_CARD]) {
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

function createFirstHand(numberOfCardsInHand, deck){
    let playerHand = [];
    let cpuHand = [];
    let firstHand = [];

    for(let i = 0; i < numberOfCardsInHand; i++){
        let drawPlayerCard = deck.pop()
        playerHand.push(drawPlayerCard);
        let drawCpuCard = deck.pop()
        cpuHand.push(drawCpuCard);
    }
    firstHand.push(playerHand);
    firstHand.push(cpuHand);

    return firstHand;
}

function MostCommonSuitInHand(hand, suits){
    const INDEX_OF_HEARTS_SUIT = 0;
    const INDEX_OF_DIAMONDS_SUIT = 1;
    const INDEX_OF_CLUBS_SUIT = 2;
    const INDEX_OF_SPADES_SUIT = 3;
    let suitsCounter = [0, 0, 0, 0];

    for(let i = 0; i < hand.length; i++){
        let cardSuit = hand[i][INDEX_OF_SUIT_IN_CARD];
        let suitIndex = suits.indexOf(cardSuit);

        if(suitIndex != -1) {
            suitsCounter[suitIndex]++;
        }
    }

    let maxCount = 0;
    let majoritySuitIndex = 0;

    for (let i = 0; i < suitsCounter.length; i++) {
        if (suitsCounter[i] > maxCount) {
            maxCount = suitsCounter[i];
            majoritySuitIndex = i;
        }
    }

    return suits[majoritySuitIndex];
}

function getCardValue(cardValue) {
    if (typeof cardValue == 'number') {
        return cardValue;
    } else if (cardValue == 'J' || cardValue == 'Q' || cardValue == 'K') {
        return VALUE_OF_J_Q_K_CARDS;
    } else {
        return VALUE_OF_AS_CARD;
    }
}

function handScore(hand) {
    let majoritySuit = MostCommonSuitInHand(hand, CARD_SUITS);
    let majoritySuitPoints = 0;
    let maxSingleCardPoints = 0;

    for (let i = 0; i < hand.length; i++) {
        let cardValue = getCardValue(hand[i][INDEX_OF_NUMBER_IN_CARD]);
        let cardSuit = hand[i][INDEX_OF_SUIT_IN_CARD];

        if (cardSuit == majoritySuit) {
            majoritySuitPoints += cardValue;
        }

        if (cardValue > maxSingleCardPoints) {
            maxSingleCardPoints = cardValue;
        }
    }

    return Math.max(majoritySuitPoints, maxSingleCardPoints);
}

let deck = createDeck(NUMBER_OF_CARDS_IN_DECK);

let firstUserAndCpuHand = createFirstHand(NUMBER_OF_CARDS_IN_HAND, deck);

let firstUserHand = firstUserAndCpuHand[INDEX_OF_USER_HAND];
let firstCpuHand = firstUserAndCpuHand[INDEX_OF_CPU_HAND];

let userHandScore = handScore(firstUserHand);
let CpuHandScore = handScore(firstCpuHand);

console.log("User hand:");
console.log(firstUserHand);
console.log("CPU hand:");
console.log(firstCpuHand);
console.log(deck);
console.log(`User score: ${userHandScore}`);
console.log(`CPU score: ${CpuHandScore}`);