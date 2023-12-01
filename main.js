// declare some variables
const rowLength = 5;
let currentPosition = 0; // keep track of current position

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

  // check rowLength to see if it's been reached
  if (currentPosition % rowLength === 0) {
    // reset currentPosition for new row
    currentPosition = 0;
  }
});
