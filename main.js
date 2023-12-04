// declare some variables
const rowLength = 5;
let currentPosition = 0; // keep track of current position
const numberOfRows = 6;
let maxTries = rowLength * numberOfRows;

// select scoreboard-letter class
const lettersContainer = document.querySelector(".scoreboard-letter");

async function fetchWordOfTheDay() {
  try {
    const response = await fetch(
      "https://words.dev-apis.com/word-of-the-day?random=1"
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    const wordOfTheDay = data.word;
    console.log(wordOfTheDay);
    return wordOfTheDay;
  } catch (error) {
    console.error(error);
  }
}

function updateCurrentLetterElement(letter) {
  // get the current letter element based on the currentPosition
  const currentLetterElement = document.getElementById(
    `letter-${currentPosition}`
  );

  // update content of current letter element
  currentLetterElement.textContent = letter;
}

function handleKeyDown(event) {
  console.log(event.key);

  // call function
  updateCurrentLetterElement(event.key);

  // increment current position
  currentPosition++;
  console.log(currentPosition);

  if (currentPosition === maxTries) {
    console.log(currentPosition);
    alert(`Sorry, you lose.`);
  }
}

async function init() {
  // initialize the game for a starting point
  let currentGuess = "";
  let currentRow = 0;

  // fetch word of the day using await
  const wordOfTheDay = await fetchWordOfTheDay();
}

document.addEventListener("keydown", handleKeyDown);

init();
