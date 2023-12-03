fetch("https://words.dev-apis.com/word-of-the-day?random=1")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const wordOfTheDay = data.word;
    console.log(wordOfTheDay);
  })
  .catch((error) => {
    console.error(error);
  });