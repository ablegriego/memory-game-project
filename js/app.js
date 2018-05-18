//A list that holds all of the cards
let card = document.getElementsByClassName('card');
let cards = [...card];

// Variables needed for functions
var shownCardsArray = [];
let matchedCard = document.getElementsByClassName('match');
const deck = document.querySelector('.deck');
let moves = 0;
let totalSeconds = 0;
let moveCount = document.querySelector('.moves');
let timer = document.querySelector('.timer');
let restartButton = document.getElementById('restart');
let minutesLabel = document.getElementById('minutes');
let secondsLabel = document.getElementById('seconds');
let interval = setInterval(startTimer, 1000);
let stars = document.querySelectorAll('.fa-star');
let closeButton = document.getElementById('closeModal');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Start Game function to create new HTML
// Also removes all exisiting classes from cards

//CHANGE TO EVENT LISTENER as per tips
// deck.addEventListener('click', ... )
document.body.onload = startGame();

//
function startGame() {
    let shuffledCards = shuffle(cards);
    for (let i = 0; i < shuffledCards.length; i++) {
         deck.appendChild(shuffledCards[i]);
         cards[i].classList.remove('open', 'show', 'match', 'disabled');
     }
}

// Loop to add event Listener to each card
 for (var i = 0; i < cards.length; i++) {
   card = cards[i];
   card.addEventListener('click', showCard);
   card.addEventListener('click', matchCheck);
   card.addEventListener('click', congratsModal);
 }

//Other event listeners (keep out of functions)
  restartButton.addEventListener('click', restartGame);
  closeButton.addEventListener('click', closeModal);

//Displays card's symbol
function showCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
 }

 //Adds shown cards to array and checks if cards match
 function matchCheck() {
   shownCardsArray.push(this);
   let cardLength = shownCardsArray.length;
   if(cardLength === 2){
       moveCounter();
     if(shownCardsArray[0].innerHTML === shownCardsArray[1].innerHTML) {
       isMatch();
     } else {
       unMatch();
     }
   }
 }

 //When cards match, card classes change, empties shownCardsArray
 function isMatch() {
     shownCardsArray[0].classList.add('match', 'disabled');
     shownCardsArray[1].classList.add('match', 'disabled');
     shownCardsArray[0].classList.remove('show', 'open');
     shownCardsArray[1].classList.remove('show', 'open');
     shownCardsArray = [];
 }

 //If cards unMatched, call disableCards function
 function unMatch() {
     shownCardsArray[0].classList.add('unmatched');
     shownCardsArray[1].classList.add('unmatched');
     disableCards();
     setTimeout(function(){
         shownCardsArray[0].classList.remove('show', 'open', 'unmatched');
         shownCardsArray[1].classList.remove('show', 'open', 'unmatched');
         enableCards();
         shownCardsArray = [];
     },900);
 }

//
function disableCards() {
  for(var i = 0; i < cards.length; i++){
    card.classList.add('disabled');
  }
}

function enableCards() {
  for(var i = 0; i < cards.length; i++){
    card.classList.remove('disabled');
  }

  for(var i = 0; i < matchedCard.length; i++){
    matchedCard[i].classList.add('disabled');
  }
}

//Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function startTimer() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
  //card.removeEventListener('click', startTimer);
}

//Move counter function
function moveCounter() {
    moves++;
    moveCount.innerHTML = moves;
    }

//Restart the game and call reset values function
function restartGame() {
      startGame();
    }

//Reset all values
function reset() {
  moveCount.innerHTML = 0;
  moves = 0;
  totalSeconds = 0;
  startTimer();
  //reset stars
  }

//Stars rating functions...



//Congratulations modal
var modal = document.getElementById('myModal');

//If 16 matched cards, display modal
function congratsModal() {
  if(matchedCard.length === 16){
    clearInterval(interval);
    modal.style.display = 'block';
    let finalTime = timer.innerHTML;
    let finalStars = document.querySelector('.stars').innerHTML;
    let finalMoves = document.querySelector('.moves').innerHTML;
    let starRating = document.querySelector('.stars').innerHTML;
    //Values to display on modal
    document.getElementById('finalMoves').innerHTML = finalMoves;
    document.getElementById('finalStars').innerHTML = finalStars;
    document.getElementById('finalTime').innerHTML = finalTime;
    }
}

//Get the <span> element that closes the modal
let span = document.getElementsByClassName('close')[0];

//When the user clicks on <span> (x), close the modal
span.onclick = function() {
   modal.style.display = 'none';
   window.location.reload();
};

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
   if (event.target == modal) {
       modal.style.display = 'none';
       window.location.reload();
   }
};

//Modal play again button
function closeModal() {
  closeButton.addEventListener('click' , function(e){
    modal.style.display = 'none';
    window.location.reload();
  });
}
