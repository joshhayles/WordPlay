// declare variables
const numberOfRows = 6;

// create an Array the same length as numberOfRows for storing the user's guesses
// this essentially creates 6 empty arrays, representing the 6 rows
const rows = Array.from({ length: numberOfRows }, () => []);

// further explained:
  // Array.from is an available javascript method used to create a new array
  // { length: numberOfRows } creates an object with a property 'length' set to the value of the variable 'numberOfRows'
  // () => [] is the next argument of 'Array.from'. It's a callback function that gets executed for each element in the array structure that was defined in the first argument { length: numberOfRows }
  // in this case, it returns an empty array [] for each element

let currentPosition = 0;
let currentRow = 0;
let gameOver = false;
let wordOfTheDay; // declare for later, but don't assign a value immediately
let defaultWordOfTheDay = "abase";

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
    console.log("WORD OF THE DAY:" , wordOfTheDay);
    return wordOfTheDay;
  } catch (error) {
    console.error(error);
    wordOfTheDay = defaultWordOfTheDay;
    console.log(
      `Word of the day wasn't available. Using default: ${wordOfTheDay}`
    );
  }
}

// a function that takes in the keyboard event as a parameter and extracts the key that was pressed

function handleKeyDown(event) {
  const alertElement = document.querySelector(".alert-enter-valid-letter");
  const validRegex = /^[a-zA-Z]$/;

  if (event.key !== "Backspace" && !validRegex.test(event.key)) {
    alertElement.style.visibility = "visible";
    return; // stop execution if the pressed key is not valid
  } else {
    alertElement.style.visibility = "hidden";
  }

  // check to see if key pressed is Backspace && see if the currentPosition is NOT at the beginning && NOT at the end of a row (currentPosition % 5 !== 0)
  // currentPosition % 5 calculates the remainder when the currentPosition is divided by 5

  if (event.key === 'Backspace' && (currentPosition !== 0 && currentPosition % 5 !== 0)) {
    // decrement currentPosition && remove last character from the currentRow
    currentPosition--;
    rows[currentRow].pop() // retrieves the array (row) at the index specified by currentRow

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
  
  // log the letters being entered in the current row
  // rows[currentRow]: rows is the array, and currentRow is the variable keeping track of the current row within this array. In other words, rows[currentRow] is used to dynamically access the array representing the current row of guesses
  console.log("rows[currentRow]", rows[currentRow]);
}

// a function for the game's primary logic
function playTheGame(letter) {
  // check to see if game can be played
  if (gameOver) {
    return;
  }

  console.log("LETTER:" , letter);

  // get the current letter element, based on the currentPosition
  const currentLetterElement = document.getElementById(`letter-${currentPosition}`)

  // add element to the UI
  currentLetterElement.textContent = letter;

  // push the letter to the currentRow
  rows[currentRow].push(letter);
  console.log("ALL ROWS:", rows);

  // check if user's letter is in wordOfTheDay. If true, change background to green
  const letterInWordOfDay = wordOfTheDay.includes(letter);

  if (letterInWordOfDay) {
    currentLetterElement.style.backgroundColor = "green";
  }
  currentPosition++; // increment currentPosition

  // if the row is filled up, check for a win

  if (currentPosition % 5 === 0) {
    checkIfUserWins();
    console.log(`Current Position: ${currentPosition}, Current Row: ${currentRow} of ${numberOfRows}`)
  }
}

function checkIfUserWins() {
  // join the letters to form the user's word
  const userWord = rows[currentRow].join("");
  console.log("USER WORD", userWord);

  if (userWord === wordOfTheDay) {
    // use setTimeout() to ensure last letter appears on the screen before the alert
    setTimeout(() => {
      alert(`You win!! That's amazing!`);
    }, 20);
    gameOver = true;
  } else if (currentPosition === numberOfRows * 5) {
    gameOver = true;
    setTimeout(() => {
      alert(`You lose!`);
    }, 20);
  } else {
    currentRow++; // move to the next row
  }
}

async function init() {
  console.log(`init() called`);

  wordOfTheDay = await fetchWordOfTheDay(); // fetch word of the day using await

  // add event listener and call handleKeyDown
  document.addEventListener("keydown", (event) => handleKeyDown(event));
}

init();