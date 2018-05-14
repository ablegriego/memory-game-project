/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName('card');
let cards = [...card];
// Variables needed for functions
let shownCard = document.getElementsByClassName('show');
let shownCardsArray = [];
let matchCardsArray = [];
const deck = document.querySelector('.deck');
const li = document.querySelector('.li');
let moves = 0;
let totalSeconds = 0;
let moveCount = document.querySelector('.moves');
let timer = document.querySelector('.timer');


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

//CHANGE TO EVENT LISTENER !!! as per tips
// deck.addEventListener('click', ... )???
document.body.onload = startGame();

function startGame() {

  cards = shuffle(cards);
  for (let i = 0; i < card.length; i++) {
      deck.innerHTML = "";
      [].forEach.call(cards, function(item) {
	 			deck.appendChild(item);
});
        cards[i].classList.remove('open', 'show', 'match');
    }
// Reset moves, time, star rating??
  moves = 0;
  totalSeconds = 0;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // Loop to add event Listener to each card
 for (var i = 0; i < cards.length; i++) {
   card = cards[i];
   card.addEventListener('click', showCard);
   card.addEventListener('click', moveCounter);
 }




//Move counter function
function moveCounter() {
    moves++
    moveCount.innerHTML = moves;
}

//Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
let minutesLabel = document.getElementById('minutes');
let secondsLabel = document.getElementById('seconds');
setInterval(setTime, 1000);


function setTime() {
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
}


// Restart button function
const restartButton = document.getElementById('restart');

restartButton.addEventListener('click', function () {
    window.location.reload();
    });
