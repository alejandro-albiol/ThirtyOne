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

function handScore(hand){
    const INDEX_OF_FIRST_CARD_IN_HAND = 0
    let cardPoints = 0;
    let initialSuit = hand[INDEX_OF_FIRST_CARD_IN_HAND][INDEX_OF_SUIT_IN_CARD]

    for(let i = 0; i < hand.length; i++){
        let cardValue = hand[i][INDEX_OF_NUMBER_IN_CARD];
        let cardSuit = hand[i][INDEX_OF_SUIT_IN_CARD];
        if(initialSuit == cardSuit){
            if(typeof cardValue == 'number'){
                cardPoints += parseInt(hand[i]);
            }else if(cardValue == 'J' || cardValue == 'Q' || cardValue == 'K'){
                cardPoints += VALUE_OF_J_Q_K_CARDS;
            }else{
                cardPoints += VALUE_OF_AS_CARD;
            }
    }
    }
    return cardPoints;
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