// declare some variables
const rowLength = 5;
let currentPosition = 0; // keep track of current position
const numberOfRows = 6;
const maxTries = rowLength * numberOfRows;
let guessNumber = 0;
let currentRow = 0;
let gameOver = false;

// select the HTML element with class 'scoreboard-letter' and assign it to lettersContainer
const lettersContainer = document.querySelector(".scoreboard-letter");

// create two Arrays (with a length the same as numberOfRows) for storing the user's input and guesses
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

// a function that takes in the keyboard event as a parameter and extracts the key that was pressed.
function handleKeyDown(event) {
  const letter = event.key;

  // make sure the key pressed is a letter (or, the command key for opening up dev tools without disrupting the game)
  // if the key pressed is a letter, or the Command key (metaKey), call playTheGame() function
  if (/^[a-zA-Z]$/.test(letter) || event.metaKey) {
    playTheGame(letter);
  } else {
    // if any other key is pressed, send alert
    alert(`Please enter a valid letter A - Z.`)
  }
}

// a function for the game's primary logic
async function playTheGame(letter) {
  // check to see if game can be played
  if (gameOver) {
    return;
  }

  if (/^[a-zA-Z]$/.test(letter)) {
    // get the current letter element based on the currentPosition
    const currentLetterElement = document.getElementById(
      `letter-${currentPosition}`
    );

    // add letter to UI
    currentLetterElement.textContent = letter;

    // add (push) the letter to the current row
    rows[currentRow].push(letter);

    console.log(rows);

    // check if user's letter is in wordOfTheDay. If true, change background to green
    const letterInWordOfDay = wordOfTheDay.includes(letter);

    if (letterInWordOfDay) {
      currentLetterElement.style.backgroundColor = "green";
    }

    // increment current position
    currentPosition++;

    // if user has exhausted all tries (30 entries) call checkIfUserWins();
    if (currentPosition === maxTries) {
      checkIfUserWins();
    }

    // manage the transition to the next row when the current row is filled up with guesses
    // calculate the position within the current row by taking the remainder of the division of currentPosition by rowLength.
    // this determines where the current user input should be placed within the current row

    const positionWithinRow = currentPosition % rowLength;

    // if the row is filled...
    // if it is filled, copy the contents of the currentRow INTO the guesses Array
    // using slice creates a shallow copy of the Array (to preserve the original state of the row)

    if (positionWithinRow === 0) {
      guesses[currentRow] = rows[currentRow].slice();
      guessNumber++;
      currentRow++;

      checkIfUserWins();
    }

    console.log(
      `Letter: ${letter}, Position: ${currentPosition} of ${maxTries}, Guess Number: ${guessNumber} of ${numberOfRows}, Current Row: ${currentRow} of ${numberOfRows}`
    );
  }
}

function checkIfUserWins() {
  // join the letters to form the user's word
  const userWord = guesses[currentRow - 1].join("");
  console.log(userWord);

  if (userWord === wordOfTheDay) {
    setTimeout(() => {
      alert(`You win, from checkIfUserWins()`);
      // set flag to true when user loses the game
      gameOver = true;
    }, 50);
  } else if (currentRow >= numberOfRows) {
    setTimeout(() => {
      alert(`You lose, from checkIfUserWins()`);
      gameOver = true;
    }, 50);
  }
}

async function init() {
  console.log(`init() called`);
  // fetch word of the day using await
  wordOfTheDay = await fetchWordOfTheDay();

  // add event listener and call handleKeyDown
  document.addEventListener("keydown", (event) => handleKeyDown(event));
}

init();