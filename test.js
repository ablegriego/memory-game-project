spare code...

for (const newCard of cards) {
    deck.appendChild(newCard);
}


      [].forEach.call(cards, function(item) {
        deck.appendChild(item);
      });



      card.addEventListener('click', function onClick() {
        card.classList.toggle('show');
      }, false);

      let openCard = function() {
        this.classList.toggle('show');
        this.classList.toggle('disabled');
      };


      REMOVED:
      .deck .card.show {
          font-size: 60px;
      }
      AS no show class added



      function openCards(){
		openedCards.push(this);
		let cardLength = openedCards.length;
		if (cardLength === 1) {
			movesCounter();
		}
		else if(cardLength === 2){

			if(openedCards[0].innerHTML != openedCards[1].innerHTML || openedCards[0].isSameNode(openedCards[1])){
				unmatched();
			}else{
				matched();
}


function openCards(){

 let cardLength = openedCards.length;
 if (cardLength === 1) {
  movesCounter();
 }
 else if(cardLength === 2){

  if(openedCards[0].innerHTML != openedCards[1].innerHTML || openedCards[0].isSameNode(openedCards[1])){
    unmatched();
  }else{
    matched();
 }

 function cardArray() {

 }

let cardLength = shownCards.length;

 if (shownCards.length === 2) {
   card.removeEventListener('click', showCard);
 }

 card = cards[i];
 card.classList.remove('show');






 // Loop to add event Listener to each card
 for (var i = 0; i < cards.length; i++) {
   card = cards[i];
   card.addEventListener('click', showCard);
 }

 // Check if shown cards match, push to matchCards array and loop cards to remove class
 if (shownCards.length === 2) {
   if (shownCards[0].classList.value === shownCards[1].classList.value) {
     cards[i].classList.add('match');
     matchCards.push(this);
   }
   else {
     for (let i = 0; i < cards.length; i++) {
       deck.innerHTML = "";
       [].forEach.call(cards, function(item) {
         deck.appendChild(item);
   });
     cards[i].classList.remove('show');
     shownCards.splice(0, 2);
   }
 }
 }
