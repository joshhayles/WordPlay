// declare some variables
const rowLength = 5;
let currentPosition = 0; // keep track of current position
const numberOfRows = 6;
const maxTries = rowLength * numberOfRows;

// select the HTML element with class 'scoreboard-letter' and assign it to lettersContainer
const lettersContainer = document.querySelector(".scoreboard-letter");

// create Arrays (with a length the same as numberOfRows) for storing the user's input and guesses
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

// a function that takes in the keyboard event as a parameter and extracts the key that was pressed. It then calls the playTheGame() function to handle the game logic
function handleKeyDown(event) {
  const letter = event.key;

  playTheGame(letter);
}

// a function for the game's primary logic
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

  // add (push) the letter to the current row
  rows[currentRow - 1].push(letter);
  console.log(rows);

  // check if user's letter is in wordOfTheDay. If true, change background to green
  const letterInWordOfDay = wordOfTheDay.includes(letter);

  if (letterInWordOfDay) {
    currentLetterElement.style.backgroundColor = "green";
  }

  // increment current position
  currentPosition++;

  // check to see if currentPosition is a multiple of rowLength (for filling up the row)
  if (currentPosition % rowLength === 0) {
    // save their guess to the guesses Array
    // copy the contents of the current row: rows[guessNumber - 1], into the corresponding position of the guesses array
    // slice is used to create a shallow copy of the array so the changes don't affect the other
    // subtracting 1 is necessary because guessNumber starts at 1
    guesses[guessNumber - 1] = rows[guessNumber - 1].slice();
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
    // delay alert by 100 milliseconds to make sure the last letter shows up
    setTimeout(() => {
      alert(`You win!!`);
    }, 100);
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