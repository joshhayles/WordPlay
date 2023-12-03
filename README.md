# About WordPlay

1.0 version (Completed Dec, 2023)
WordPlay is a small project that fetches the word of the day from GET https://words.dev-apis.com/word-of-the-day and allows the user 6 chances to guess it. If they guess a letter correctly, the background turns green. They can use those correct guesses as 'hints' and implement them in their remaining chances as they progress forward in the process.

If they guess correctly, the row lights up in green.

Once they run out of chances, and still have not guessed the word, they receive an alert stating they have lost.

2.0 version (Coming Soon)

# What I'm Learning

  When using document.querySelectorAll("scoreboard-letter") to select the HTML element "scoreboard-letter" it provides you with a NodeList[ ]. This selector returns all matching elements.

  When using document.querySelector(), it will select the first element that matches a specified selector, and will only return the first matching element, even if multiple elements match. Returns 'null' if no elements are found.