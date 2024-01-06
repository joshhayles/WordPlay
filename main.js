// TODO
// game isn't checking for a win when backspace is used (need to clear things out somehow, or get the new currentPosition from the backspace function)

// prevent the option key from showing up in the alertElement when opening devtools

// declare variables
const numberOfRows = 6;

// select the HTML elements and assign to variables
const lettersContainer = document.querySelector(".scoreboard-letter");

// create an Array (with a length the same as numberOfRows) for storing the user's guesses
const rows = Array.from({ length: numberOfRows }, () => []);

let currentPosition = 0;
let currentRow = 0;
let gameOver = false;
let wordOfTheDay;
let defaultWordOfTheDay = "abase";
let scoreboardLetters = document.querySelectorAll('.scoreboard-letter')

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
    wordOfTheDay = defaultWordOfTheDay;
    console.log(
      `Word of the day wasn't available. Using default: ${wordOfTheDay}`
    );
  }
}

// a function that takes in the keyboard event as a parameter and extracts the key that was pressed.
function handleKeyDown(event) {
  // console.log(currentRow, "currentRow")

  // const letterCode = event.code;
  const alertElement = document.querySelector(".alert-enter-valid-letter");
  const validRegex = /^[a-zA-Z]$/;

  alertElement.style.visibility = "hidden"

  if (event.key === 'Backspace' && (currentPosition !== 0 && currentPosition % 5 !== 0)) {
    // decrement currentPosition
    currentPosition--;
    rows[currentRow].pop()

    // grab the previous letter element based on the updated currentPosition
    const previousLetterElement = document.getElementById(
      `letter-${currentPosition}`
    );
    // clear contents of previous letter element
    previousLetterElement.textContent = "";
    previousLetterElement.style.backgroundColor = "";
  } else if (validRegex.test(event.key)) {
    const letter = event.key.toLowerCase();
    playTheGame(letter)
  }
  console.log(rows[currentRow], "rows[currentrow]")
}

// a function for the game's primary logic
function playTheGame(letter) {
  // check to see if game can be played
  if (gameOver) {
    return;
  }

  const lowercaseLetter = letter.toLowerCase();

  if (lowercaseLetter >= "a" && lowercaseLetter <= "z") {
    // get the current letter element based on the currentPosition
    const currentLetterElement = document.getElementById(
      `letter-${currentPosition}`
    );

    // add letter to UI
    currentLetterElement.textContent = lowercaseLetter;

    // add (push) the letter to the current row
    rows[currentRow].push(lowercaseLetter);
    console.log(rows);

    // check if user's letter is in wordOfTheDay. If true, change background to green
    const letterInWordOfDay = wordOfTheDay.includes(lowercaseLetter);

    if (letterInWordOfDay) {
      currentLetterElement.style.backgroundColor = "green";
    }

    // increment current position
    currentPosition++;

    if (currentPosition % 5 === 0) {
      checkIfUserWins();

      console.log(
        `Current Position: ${currentPosition}, Current Row: ${currentRow} of ${numberOfRows}`
      );
    }
  }
}

function checkIfUserWins() {
  // join the letters to form the user's word
  const userWord = rows[currentRow].join("");
  console.log(userWord, "userWord");

  if (userWord === wordOfTheDay) {
    // set flag to true when user loses the game
    // gameOver = true;
    alert(`You win, from checkIfUserWins()`);
  } else if (currentPosition === numberOfRows * 5) {
    gameOver = true;
    alert(`You lose!`);
  } else {
    // Move to the next row
    currentRow++;
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
