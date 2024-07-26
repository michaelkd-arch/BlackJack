const cardEl = document.getElementById('card-el');
const sumEl = document.getElementById('sum-el');
const chipEl = document.getElementById('chip-el')
const btnStart = document.getElementById('btn-start');
const btnNew = document.getElementById('btn-new');
const messageEl = document.getElementById('message-el');
const playerEl = document.getElementById('player-el');

const dealerEl = document.getElementById('dealer-el');
const dealerSumEl = document.getElementById('dealer-sum');


let playerObj = {
  name: 'John',
  chips: 145
};

playerEl.textContent = `${playerObj.name}: ${playerObj.chips}$`;


let cards = [];
let gameOn = false;
let startButton = false;
let sum = 0;

let dealerCards = [];
let dealerSum = 0;


function getRandomCard() {
  let randInt = Math.ceil(Math.random() * 12);
  return randInt;
}


function startGame() {
  gameOn = true;
  clear();
  if (!startButton) {
    cards.push(getRandomCard());
    cards.push(getRandomCard());
    cardEl.textContent += ` ${cards[0]} - ${cards[1]}`;
    sum = cards[0] + cards[1];
    sumEl.textContent += sum;
    startButton = true;
    getDealer();
    check();
  }
}


function check() {
  if (sum === 21) {
    messageEl.textContent = 'You win. ';
    gameOn = false;
    playerObj.chips += 15;
  } else if (sum < 21) {
    //pass
  } else {
    messageEl.textContent = 'You lose. ';
    gameOn = false;
    playerObj.chips -= 10;
  }
}


function getNewCard() {
  if (gameOn && startButton) {
    let newCard = getRandomCard();
    cards.push(newCard);
    cardEl.textContent += ` - ${newCard}`;
    sum += newCard;
    sumEl.textContent = `Sum: ${sum}`;
    check();
    checkDealer();
    getDealerNewCard();
  }
}


function clear() {
  cardEl.textContent = "Player's cards: ";
  cards = [];
  sumEl.textContent = 'Sum: ';
  startButton = false;
  playerEl.textContent = `${playerObj.name}: ${playerObj.chips}$`;
  messageEl.textContent = '';

  dealerEl.textContent = "Dealer's cards: ";
  dealerCards = [];
  dealerSumEl.textContent = 'Sum : ';
}


function getDealer() {
  dealerCards.push(getRandomCard());
  dealerCards.push(getRandomCard());
  dealerEl.textContent += ` ${dealerCards[0]} - ${dealerCards[1]}`;
  dealerSum = dealerCards[0] + dealerCards[1];
  dealerSumEl.textContent += dealerSum;
}


function getDealerNewCard() {
  if(gameOn && dealerSum < sum) {
    let newCard = getRandomCard();
    dealerCards.push(newCard);
    dealerEl.textContent += ` - ${newCard}`;
    dealerSum += newCard;
    dealerSumEl.textContent = `Sum: ${dealerSum}`;
    checkDealer();
  }
}


function checkDealer() {
  if (dealerSum > 21) {
    messageEl.textContent = 'You win. ';
    gameOn=false;
    playerObj.chips += 15;
  } else if (dealerSum === 21) {
    messageEl.textContent = 'You lose. ';
    gameOn = false;
    playerObj.chips -= 10;
  } 
}


btnStart.addEventListener('click', startGame);
btnNew.addEventListener('click', getNewCard);
