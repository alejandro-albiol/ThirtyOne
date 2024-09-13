const CARD_NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const CARD_SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const SUIT_SYMBOLS = ['♥','♦','♣','♠']
const INDEX_OF_HEARTS_SUIT = 0;
const INDEX_OF_DIAMONDS_SUIT = 1;
const INDEX_OF_CLUBS_SUIT = 2;
const INDEX_OF_SPADES_SUIT = 3;
const NUMBER_OF_CARDS_IN_DECK = 52;
const NUMBER_OF_CARDS_IN_HAND = 3;
const INDEX_OF_USER_HAND = 0;
const INDEX_OF_CPU_HAND = 1;
const INDEX_OF_NUMBER_IN_CARD = 0;
const INDEX_OF_SUIT_IN_CARD = 1;
const VALUE_OF_J_Q_K_CARDS = 10;
const VALUE_OF_AS_CARD = 11;
const POINTS_TO_WIN = 5;

let deck, firstUserAndCpuHand, firstUserHand, firstCpuHand, userHandScore, CpuHandScore, currentCpuScore, currentUserScore, numberElementInCardElementInCard, topSuitElementInCard, botSuitElementInCard;

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

        for (let i = 0; i <= deck.length - 1; i++) {
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

function showFirstHandNumber(){
    let numberElementInCard = document.querySelectorAll(".number-container");
    for( let i = 0; i <= firstUserHand.length - 1; i++){
        numberElementInCard[i].innerHTML = firstUserHand[i][INDEX_OF_NUMBER_IN_CARD]
    }
}

function showFirstHandSuit(){
    let topSuitElementInCard = document.querySelectorAll(".top-suit-container");
    let bottomSuitElementInCard = document.querySelectorAll(".bottom-suit-container");

    for(let i = 0; i <= firstUserHand.length - 1; i++){

        topSuitElementInCard[i].classList.remove('hearts', 'diamonds', 'clubs', 'spades');
        bottomSuitElementInCard[i].classList.remove('hearts', 'diamonds', 'clubs', 'spades');
        
        let suitClass = firstUserHand[i][INDEX_OF_SUIT_IN_CARD];
        topSuitElementInCard[i].classList.add(suitClass);
        bottomSuitElementInCard[i].classList.add(suitClass);

        let suitClassIndex = CARD_SUITS.indexOf(firstUserHand[i][INDEX_OF_SUIT_IN_CARD]);

        topSuitElementInCard[i].innerHTML = SUIT_SYMBOLS[suitClassIndex];
        bottomSuitElementInCard[i].innerHTML = SUIT_SYMBOLS[suitClassIndex];
    }
}

function drawUserHand(){
    showFirstHandNumber();
    showFirstHandSuit();
}

function changeCard(cardElement, index) {

    const EMPTY_DECK = 0;

    let newCard = deck.pop();
    firstUserHand[index] = newCard;

    if(deck.length > EMPTY_DECK){

        let numberElement = cardElement.querySelector(".number-container");
        let topSuitElement = cardElement.querySelector(".top-suit-container");
        let bottomSuitElement = cardElement.querySelector(".bottom-suit-container");

        numberElement.innerHTML = newCard[INDEX_OF_NUMBER_IN_CARD];

        topSuitElement.classList.remove('hearts', 'diamonds', 'clubs', 'spades');
        bottomSuitElement.classList.remove('hearts', 'diamonds', 'clubs', 'spades');

        let suitClass = newCard[INDEX_OF_SUIT_IN_CARD];
        topSuitElement.classList.add(suitClass);
        bottomSuitElement.classList.add(suitClass);

        let suitClassIndex = CARD_SUITS.indexOf(newCard[INDEX_OF_SUIT_IN_CARD]);

        topSuitElement.innerHTML = SUIT_SYMBOLS[suitClassIndex];
        bottomSuitElement.innerHTML = SUIT_SYMBOLS[suitClassIndex];

    }else{

        window.alert("The deck is empty!");

    }  
}

function MostCommonSuitInHand(hand, suits){
    let suitsCounter = [0, 0, 0, 0];

    for(let i = 0; i <= hand.length - 1; i++){
        let cardSuit = hand[i][INDEX_OF_SUIT_IN_CARD];
        let suitIndex = suits.indexOf(cardSuit);

        if(suitIndex != -1) {
            suitsCounter[suitIndex]++;
        }
    }

    let maxCount = 0;
    let majoritySuitIndex = 0;

    for (let i = 0; i <= suitsCounter.length - 1; i++){
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

function updateGlobalScore(){

    userHandScore = handScore(firstUserHand);
    CpuHandScore = handScore(firstCpuHand);

    let roundFeedBack = `User score: ${userHandScore}\nCPU score: ${CpuHandScore}\n`;

    if(userHandScore > CpuHandScore){
        let playerScoreElement = document.querySelector("#player-score");
        let currentUserScore = parseInt(playerScoreElement.innerHTML);
        playerScoreElement.innerHTML = currentUserScore + 1;
        roundFeedBack += "You win this round!";
    }else if(CpuHandScore > userHandScore){
        let cpuScoreElement = document.querySelector("#opponent-score");
        let currentCpuScore = parseInt(cpuScoreElement.innerHTML);
        cpuScoreElement.innerHTML = currentCpuScore + 1;
        roundFeedBack += "CPU win this round!";
    }else{
        roundFeedBack += "It's a draw.";
    }
    window.alert(roundFeedBack);
    initialRoundCreator();
}

function initialRoundCreator(){
    currentUserScore = parseInt(document.querySelector("#player-score").innerHTML);
    currentCpuScore = parseInt(document.querySelector("#opponent-score").innerHTML);

    if(currentCpuScore < POINTS_TO_WIN && currentUserScore < POINTS_TO_WIN){

        deck = createDeck(NUMBER_OF_CARDS_IN_DECK);
        firstUserAndCpuHand = createFirstHand(NUMBER_OF_CARDS_IN_HAND, deck);
        firstUserHand = firstUserAndCpuHand[INDEX_OF_USER_HAND];
        firstCpuHand = firstUserAndCpuHand[INDEX_OF_CPU_HAND];
        userHandScore = handScore(firstUserHand);
        CpuHandScore = handScore(firstCpuHand);
        drawUserHand();

    }else if(currentUserScore == POINTS_TO_WIN){
        window.alert("User Win!");
        document.querySelector("#end-turn").removeEventListener("click", (updateGlobalScore));
    }else{
        window.alert("CPU Win!");
        document.querySelector("#end-turn").removeEventListener("click", (updateGlobalScore));
    }
}

document.querySelector("#draw-cards").addEventListener("click", (event)=>{
    initialRoundCreator();
    document.querySelector("#end-turn").addEventListener("click", (updateGlobalScore));
})

document.querySelector("#reset-game").addEventListener("click", (event)=>{
    location.reload();
})

document.querySelectorAll(".card").forEach((cardElement, index) => {
    cardElement.addEventListener("click", () => {
        changeCard(cardElement, index);
    });
});