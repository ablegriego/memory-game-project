//A list that holds all of the cards
let card = document.getElementsByClassName('card');
let cards = [...card];

// Variables needed for functions
let shownCardsArray = [];
let matchedCard = document.getElementsByClassName('match');
const deck = document.querySelector('.deck');
let moves = 0;
let totalSeconds = 0;
let timer = document.querySelector('.timer');
let restartButton = document.getElementById('restart');
let minutesLabel = document.getElementById('minutes');
let secondsLabel = document.getElementById('seconds');
let interval = setInterval(startTimer, 1000);
// Variables for resetting stars
let starOne = document.getElementById('star1');
let starTwo = document.getElementById('star2');
let starThree = document.getElementById('star3');
let closeButton = document.getElementById('closeModal');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
document.body.onload = startGame();

function startGame() {
    let shuffledCards = shuffle(cards);
    for (let i = 0; i < shuffledCards.length; i++) {
         deck.appendChild(shuffledCards[i]);
         cards[i].classList.remove('open', 'show', 'match', 'disabled');
     }
}

// Loop to add event Listener to each card
 for (let i = 0; i < cards.length; i++) {
   let eachCard = cards[i];
   eachCard.addEventListener('click', showCard);
   eachCard.addEventListener('click', matchCheck);
   eachCard.addEventListener('click', congratsModal);
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
     },500);
 }

//Disables and Enable card functions
function disableCards() {
  for(let i = 0; i < cards.length; i++){
    cards[i].classList.add('disabled');
  }
}

function enableCards() {
  for(let i = 0; i < cards.length; i++){
    cards[i].classList.remove('disabled');
  }

  for(let i = 0; i < matchedCard.length; i++){
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
}

//Move counter function and star rating
let stars = document.getElementById('stars');

function moveCounter() {
    moves++;
    moveCount.innerHTML = moves;
    if ((moves > 10) && (moves < 20)) {
      document.getElementById("star3").className = "hidden";
            }
    if (moves >= 20) {
      document.getElementById("star2").className = "hidden";
    }
}

//Restart the game and call reset values function
function restartGame() {
      reset();
      startGame();
    }

//Reset all values
function reset() {
  moveCount.innerHTML = 0;
  moves = 0;
  totalSeconds = 0;
  startTimer();
  //reset stars
  stars.appendChild(starOne);
  stars.appendChild(starTwo);
  stars.appendChild(starThree);
  }


//Congratulations modal
let modal = document.getElementById('myModal');

//If 16 matched cards, display modal
function congratsModal() {
  if(matchedCard.length === 16){
    clearInterval(interval);
    modal.style.display = 'block';
    let finalTime = timer.innerHTML;
    let finalStars = document.querySelector('#stars').innerHTML;
    let finalMoves = document.querySelector('.moves').innerHTML;
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
