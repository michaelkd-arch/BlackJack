let cardEl = document.getElementById('card-el');
let sumEl = document.getElementById('sum-el');
let chipEl = document.getElementById('chip-el')
let btnStart = document.getElementById('btn-start');
let btnNew = document.getElementById('btn-new');
let messageEl = document.getElementById('message-el');
let playerEl = document.getElementById('player-el');

let dealerEl = document.getElementById('dealer-el');
let dealerSumEl = document.getElementById('dealer-sum');


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
  if (sum < 21) {
    //pass
    // messageEl.textContent = 'Do you want a new card? ';
  } else if (sum === 21) {
    messageEl.textContent = 'You win. ';
    gameOn = false;
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
  } else if (sum === 21) {
    messageEl.textContent = 'You lose. ';
    gameOn = false;
    playerObj.chips -= 10;
  } 
}


btnStart.addEventListener('click', startGame);
btnNew.addEventListener('click', getNewCard);
