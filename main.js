// declare some variables
const rowLength = 5;
let currentPosition = 0; // keep track of current position
let numberOfRows = 6;
let maxTries = rowLength * numberOfRows

// select scoreboard-letter class
const lettersContainer = document.querySelector(".scoreboard-letter");
console.log(lettersContainer);

// set up event listeners
// event.key is a property of the KeyboardEvent object in JavaScript that holds the value of the key being pressed

document.addEventListener("keydown", function (event) {
  console.log(event.key);

  // get the current letter element based on the currentPosition
  const currentLetterElement = document.getElementById(`letter-${currentPosition}`);

  // update content of current letter element
  currentLetterElement.textContent = event.key;

  // increment current position
  currentPosition++;
  console.log(currentPosition);

  if (currentPosition === maxTries) {
    console.log(currentPosition);
    alert(`Sorry, you lose.`);
  }

});
