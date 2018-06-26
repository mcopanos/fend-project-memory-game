const array = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]
let openCards = [];
let timer= 0;
let matches = 0;
let moves = 0;
let star = 3;
let selected = '.card';
const deck = document.querySelector('.deck');
shuffle(array);
setTimeout(startTimer(), 2000);

//  For loop to display cards
for (let i = 0; i < array.length; i++) {
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `<i class="${array[i]}"></i>`;
    deck.appendChild(card);
};

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

/*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // Event listener for clicked cards.
deck.addEventListener('click', function(event) {
    let targetCard = event.target;
    if (targetCard.matches(selected) && openCards.length < 2) {
        showCard(targetCard);
        faceUp(targetCard);
        if (openCards.length === 2) {
            lookForMatch();
            addOne();
            starRating();;
        }
        if (matches === 8) {
            stopTimer();
            triggerModal(modalDisplay());
            console.log(timer);
         }
    }
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
    let time = setInterval(function() {
         document.getElementById('timer').innerHTML = ` ${timer} seconds`;
        timer++;
    }, 1000);
    console.log(timer);
}

// Function to stop timer
function stopTimer() {
    clearInterval();
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
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('transitionend', removeAnimation));

// Function to add moves to the moves variable
function addOne() {
    moves++;
}

// Function to keep score
function starRating() {
    if (moves  === 15 ){
        removeStar();
     if (moves === 20) {
        removeStarTwo();
    }
}
}

// Function to remove star rating
function removeStar() {
    let  stars = document.querySelectorAll('.stars li i');
    stars[0].classList.remove('fa-star');
    stars[0].classList.add('fa-star-o');
    star--;
}

function removeStarTwo() {
    let  stars = document.querySelectorAll('.stars li i');
    stars[1].classList.remove('fa-star');
    stars[1].classList.add('fa-star-o');
    star--;
}

// Modal element
function modalDisplay() {
    let modal = document.getElementById('modal');
    var newDiv = document.querySelector('.newContent h3');
    newDiv.innerHTML = `It took you ${timer} seconds and ${moves} moves to finish. <br>
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
//  Restart game
let restart = document.querySelector('.restartBtn');
restart.addEventListener('click', function(){
    document.location.reload();
})

//  Close button
let closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click', closeModal);
// Function to close modal
function closeModal() {
    modal.style.display = 'none';
}
