// declare some variables
const rowLength = 5;
let currentPosition = 0; // keep track of current position
const numberOfRows = 6;
let maxTries = rowLength * numberOfRows;

// select scoreboard-letter class
const lettersContainer = document.querySelector(".scoreboard-letter");

// fetch word of the day
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

function handleKeyDown(event) {
  const letter = event.key;
  //console.log(letter, currentPosition);

  // get the current letter element based on the currentPosition
  const currentLetterElement = document.getElementById(
    `letter-${currentPosition}`
  );

  // add letter to UI
  currentLetterElement.textContent = letter;

  // increment current position
  currentPosition++;

  playTheGame(letter, currentLetterElement, currentPosition);
}

function playTheGame(letter, currentLetterElement, currentPosition) {
  console.log(`Letter: ${letter}, Letter Element: ${currentLetterElement}, Current Position: ${currentPosition}`);

  if (currentPosition == maxTries) {
    //console.log(currentPosition);
    alert(`Sorry. You lose.`);
    return;
  } else {
    //
  }
}

async function init() {
  // initialize the game for a starting point
  let currentGuess = "";
  let currentRow = 0;

  // fetch word of the day using await
  const wordOfTheDay = await fetchWordOfTheDay();

  // add event listener and call handleKeyDown
  document.addEventListener("keydown", (event) => handleKeyDown(event));
}

init();
