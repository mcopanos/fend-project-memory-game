const myCards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]
let openCards = [];
let matches = 0;
let moves = 0;
const pairs = 8;
let timer= 0;
let star = 3;
let time;
let selected = '.card';
const deck = document.querySelector('.deck');
let move = document.querySelector('.moves');
let  stars = document.querySelectorAll('.stars li i');
shuffleCards();
startTimer();

//  For loop to display cards
function makeCards() {
    for (let i = 0; i < myCards.length; i++) {
        let card = document.createElement('li');
        card.className = 'card';
        card.innerHTML = `<i class="${myCards[i]}"></i>`;
        deck.appendChild(card);
    }
}
makeCards();

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

 // Event listener for clicked cards.
deck.addEventListener('click', function(event) {
    let targetCard = event.target;
    if (targetCard.matches(selected) && openCards.length < 2
         && !openCards.includes(targetCard)) {
        showCard(targetCard);
        faceUp(targetCard);
        if (openCards.length === 2) {
            lookForMatch();
            addOne();
            starRating();;
        }
        if (matches === pairs) {
            stopTimer();
            triggerModal(modalDisplay());
         }
    }
    move.innerHTML = `${moves} `;
});

 // Function to show selected cards.
function showCard(targetCard) {
    targetCard.classList.toggle('show');
    targetCard.classList.toggle('open');
}

// Function to move selected card to open card array.
function faceUp(targetCard) {
    openCards.push(targetCard);
}

// Function to compare two cards for match.
function lookForMatch() {
    if (openCards[0].firstChild.className === openCards[1].firstChild.className) {
        keeepOpen();
    }else{
        setTimeout('closeCards()', 1250);
       setTimeout('shakeCard()', 300);
    }
}

// Function to lock  matches cards open.
function keeepOpen() {
    openCards[0].classList.toggle('animation');
    openCards[0].classList.toggle('match');
   openCards[1].classList.toggle('animation');
    openCards[1].classList.toggle('match');
    matches ++;
    openCards = [];
}

// Function to close cards.
function closeCards() {
    openCards[0].classList.toggle('open');
    openCards[0].classList.toggle('show');
    openCards[0].classList.toggle('shake');
    openCards[1].classList.toggle('open');
    openCards[1].classList.toggle('show');
    openCards[1].classList.toggle('shake');
    openCards = [];
}

//  Function to start game timer
function startTimer() {
      time =  setInterval( function() {
        timer++;
        document.getElementById('timer').innerHTML = ` ${timer} `;
    }, 1000);
}

// Function to stop timer
function stopTimer() {
    clearInterval(time);
}

// Function to shake non-matching cards
function shakeCard() {
    openCards[0].classList.toggle('shake');
    openCards[1].classList.toggle('shake');
}

//  Function for match animation
function removeAnimation(e){
    if (e.propertyName !==  'transform') return;
    this.classList.remove('animation');
}
// Event listener to remove the remove animation
function animationListener() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('transitionend', removeAnimation));
}
animationListener();

// Function to add moves to the moves variable
function addOne() {
    moves++;
}

// Function to keep score
function starRating() {
    if (moves  === 12){
        removeStar();
    }
    if (  moves == 18){
         removeStarTwo();
    }  
}

// Functions to remove star rating
function removeStar() {
    stars[0].classList.remove('fa-star');
    stars[0].classList.add('fa-star-o');
    star--;
}

function removeStarTwo() {
    stars[1].classList.remove('fa-star');
    stars[1].classList.add('fa-star-o');
    star--;
}

// Modal element
function modalDisplay() {
    let modal = document.getElementById('modal');
    var newDiv = document.querySelector('.newContent h3');
    newDiv.innerHTML = `It took you ${timer} seconds and ${moves} moves to finish <br>
    with a ${star} star rating `;
}
// Add stars
function addStars() {
    let  stars = document.querySelectorAll('.stars li i');
    stars[0].classList.remove('fa-star-o');
    stars[0].classList.add('fa-star');
    stars[1].classList.remove('fa-star-o');
    stars[1].classList.add('fa-star');
}

//  Event to trigger modal
function triggerModal() {
    let display = document.querySelector('.modal');
   setTimeout( display.classList.toggle('none'),2000);
 }

//  Clear cards
function clearMatches() {
let card = document.querySelectorAll('.deck li');
for (let i = 0; i < card.length;  i++){
    card[i].classList.remove('match');
    card[i].classList.remove('open');
    card[i].classList.remove('show');
}
}

//  Shuffle cards 
function shuffleCards() {
    shuffle(myCards);
}

//  Function to clear arrays
function clearStats() {
    openCards = [];
}

// Function to clear board
function clearBoard() {
    deck.innerHTML = ' ';
}
//  Restart game
let restart = document.getElementById('restartBtn');
restart.addEventListener('click', function() {
    clearStats();
    addStars();
    clearBoard();
    shuffleCards();
    makeCards();
    timer = 0;
    startTimer();
    animationListener();
   moves = 0;
   matches = 0;
   triggerModal();
   console.log(openCards);
})

//  Close button
let closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click', closeModal);

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
}

