# About WordPlay

## 1.0 version (Completed Dec, 2023)

[Visit a Live DEMO Here](https://joshhayles.github.io/WordPlay/)

See file 'mainWithComments.js' for more comments and notes about the project's code.

WordPlay is a project that fetches the word of the day from GET https://words.dev-apis.com/word-of-the-day and allows the user 6 chances to guess it. If they guess a letter correctly, the background turns green. They can use those correct guesses as 'hints' and implement them in their remaining chances as they progress forward in the process.

If they guess correctly, the entire row lights up in green.

Once they run out of chances and still have not guessed the word, they receive an alert stating they have lost.

## 2.0 version (Future Project Additions)

- Show the wordOfTheDay definition to the user for a hint (use a dictionary definition API)
- Give the user the option to "refresh" the game with a button

# What I'm Learning

- When using document.querySelectorAll("scoreboard-letter") to select the HTML element "scoreboard-letter" it provides you with a NodeList[ ]. This selector returns all matching elements.

- When using document.querySelector(), it will select the first element that matches a specified selector, and will only return the first matching element, even if multiple elements match. Returns 'null' if no elements are found.

- Learned a lot about async / await, order of operations, scope, waiting on promises

- I also learned more about Keboard Events, and code values that come from keys being pressed by the user

# Troubleshooting
Error in console:

"Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received."

- This can happen when using Async/Await functionality in combination with event listeners. It's saying that the event listener is not waiting for the async operation to complete before moving on. This usually happens when a function is expected to return a response to another function asynchronously, but the connection closed before the response is sent.

- In my case, I needed to add a 'return' statement to my 'playTheGame()' function, and the error was resolved. 

- Without the return statement, this leads the browser to think it will eventually send a response asynchronously, hence the 'true' return value. Otherwise, it marks the function as "in progress" and keeps the communication channel open, waiting for the response. And since my playTheGame() function is not an asynchronous operation, it doesn't send back a response. And eventually, the browser closes the communication channel, and submits the error message.

