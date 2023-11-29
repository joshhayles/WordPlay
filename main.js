const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;
const ROUNDS = 6;

async function init() {
  let currentGuess = "";
  let currentRow = 0;
  let done = false;
  let isLoading = true;

  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const { word: wordRes } = await res.json();
  const word = wordRes.toUpperCase();
  const wordParts = word.split("");
  isLoading = false;
  setLoading(isLoading);

  console.log(word);

  // user adds a letter for their guess
  function addLetter(letter) {
    if (currentRow * ANSWER_LENGTH + currentGuess.length >= letters.length) {
      // move to the next row
      currentRow++;
      currentGuess = "";
    }

    // add letter to the end
    currentGuess += letter;

    letters[currentRow * ANSWER_LENGTH + currentGuess.length - 1].innerText =
      letter;
  }

  async function commit() {
    // console.log("commit function called, done:", done);
    if (done) {
      // Game is already done. Do nothing
      console.log("before done check", done);
      return;
    }

    if (currentGuess.length !== ANSWER_LENGTH) {
      // do nothing
      return;
    }

    // check API to make sure it's a valid word
    isLoading = true;
    setLoading(isLoading);
    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });

    const { validWord } = await res.json();
    isLoading = false;
    setLoading(isLoading);

    // if the word is not valid, mark as invalid
    if (!validWord) {
      markInvalidWord();
      return;
    }

    // handle marking as "correct" "close" or "wrong"
    const guessParts = currentGuess.split(""); // get an array of individual letters
    const map = makeMap(wordParts);
    let allRight = true;

    // finds correct letters so we can mark them as correct
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        // mark as correct
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    // finds the close and wrong letters
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        // do nothing. We already did it
      } else if (map[guessParts[i]] && map[guessParts[i]] > 0) {
        // mark as close
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        // wrong
        allRight = false;
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }
    currentGuess = "";

    if (currentRow >= ROUNDS) {
      if (!allRight) {
        // user entered last letter in the last row and still hasn't guessed correctly
        alert(`You lose. The word was ${word}`);
        done = true;
      } else {
        // winner!!
        alert("You win, dude!");
        document.querySelector(".brand").classList.add("winner");
        done = true;
      }
    } else {
      currentRow++;
    }
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[currentRow * ANSWER_LENGTH + currentGuess.length].innerText = "";
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function markInvalidWord() {
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");

      await delay(10);
      letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
    }
  }

  // listen for event keys (keydown for 'enter' and 'backspace') and route to correct function
  document.addEventListener("keydown", function handleKeyPress(event) {
    if (done || isLoading) {
      // do nothing
      return;
    }

    const action = event.key;

    if (action == "Enter") {
      commit();
    } else if (action == "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
    console.log(action);
  });
}

// check to see if character is an alphabet letter
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

// show loading spinner when needed
function setLoading(isLoading) {
  loadingDiv.classList.toggle("hidden", !isLoading);
}

// creates an object out of array of letters to mark the correct amount of letters as 'close' instead of just 'wrong' or 'correct'
function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}

init();
