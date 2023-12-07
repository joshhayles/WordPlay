// declare some variables
const rowLength = 5;
let currentPosition = 0; // keep track of current position
const numberOfRows = 6;
const maxTries = rowLength * numberOfRows;

// select scoreboard-letter class
const lettersContainer = document.querySelector(".scoreboard-letter");

// create Arrays (with a length the same as numberOfRows) for storing the letters to help define each row, and each completed guess
const rows = Array.from({ length: numberOfRows }, () => []);
const guesses = Array.from({ length: numberOfRows }, () => []);

let wordOfTheDay;

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
    wordOfTheDay = data.word;
    console.log(wordOfTheDay);
    return wordOfTheDay;
  } catch (error) {
    console.error(error);
  }
}

function handleKeyDown(event) {
  const letter = event.key;

  playTheGame(letter);
}

function playTheGame(letter) {
  // initialize the game for a starting point
  let guessNumber = 1;
  let currentRow = 1;

  // get the current letter element based on the currentPosition
  const currentLetterElement = document.getElementById(
    `letter-${currentPosition}`
  );

  // add letter to UI
  currentLetterElement.textContent = letter;

  // add letter to the current row
  rows[currentRow - 1].push(letter);
  console.log(rows);

  // increment current position
  currentPosition++;

  if (currentPosition % rowLength === 0) {
    // save their guess to the guesses Array, then increment guessNumber
    guesses[guessNumber - 1] = rows[guessNumber - 1].slice();
    console.log(guesses);
    guessNumber++;
  }

  if (currentPosition == maxTries) {
    alert(`Sorry. You lose`);
    return;
  } else {
    checkIfUserWins();
  }

  console.log(
    `Letter: ${letter}, Position: ${currentPosition} of ${maxTries}, Guess Number: ${guessNumber} of ${numberOfRows}, Current Row: ${currentRow} of ${numberOfRows}`
  );
}

function checkIfUserWins() {
  // join the letters to form the user's word
  const userWord = guesses.flat().join("");

  if (userWord === wordOfTheDay) {
    alert(`You win!!`);
  } else {
    return;
  }
}

async function init() {
  // fetch word of the day using await
  const wordOfTheDay = await fetchWordOfTheDay();

  // add event listener and call handleKeyDown
  document.addEventListener("keydown", (event) => handleKeyDown(event));
}

init();
