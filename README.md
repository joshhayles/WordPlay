# About WordPlay

## 1.0 version (Completed Dec, 2023)
WordPlay is a small project that fetches the word of the day from GET https://words.dev-apis.com/word-of-the-day and allows the user 6 chances to guess it. If they guess a letter correctly, the background turns green. They can use those correct guesses as 'hints' and implement them in their remaining chances as they progress forward in the process.

If they guess correctly, the row lights up in green.

Once they run out of chances, and still have not guessed the word, they receive an alert stating they have lost.

## 2.0 version (Coming Soon)

# What I'm Learning

- When using document.querySelectorAll("scoreboard-letter") to select the HTML element "scoreboard-letter" it provides you with a NodeList[ ]. This selector returns all matching elements.

- When using document.querySelector(), it will select the first element that matches a specified selector, and will only return the first matching element, even if multiple elements match. Returns 'null' if no elements are found.

# Troubleshooting
Error in console:

"Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received."

- This can happen when using Async/Await functionality in combination with event listeners. It's saying that the event listener is not waiting for the async operation to complete before moving on. In my case, I was originally calling the function inside my async init() like this: fetchWordOfTheDay();
    
- However, by changing that to this, the error in the console went away:
  ```javascript
    const wordOfTheDay = await function fetchWordOfTheDay();

- This change to: `const wordOfTheDay = await function fetchWordOfTheDay();` was necessary because fetchWordOfTheDay() is an asynchronous function that returns a promise. The 'await' keyword is used to wait for that promise to resolve and to get the value returned by the promise (it pauses the execution of the init() function until the promise returned by fetchWordOfTheDay() is resolved). In other words, it's waiting for the result of the asynchronous 'fetch' operation inside the fetchWordOfTheDay() function.

- Once the promise is resolved, the value is assigned to the variable 'wordOfTheDay', which is the actual word fetched, and can now be used in the code.

