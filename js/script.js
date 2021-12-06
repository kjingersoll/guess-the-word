const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingMessage = document.querySelector(".remaining");
const remaining = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

const makeLettersSecret = function (word) {
  const wordArray = [];
  for (const letter of word) {
    wordArray.push("●");
  }
  wordInProgress.innerText = wordArray.join("");
};

makeLettersSecret(word);

guessButton.addEventListener("click", function(e) {
  e.preventDefault();
  const guess = guessInput.value;
  guessMessage.innerText = "";
  const validGuess = checkInput(guess);
  makeGuess(validGuess);
  guessInput.value = "";
});

const checkInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input === 0) {
    guessMessage.innerText = "Please guess a letter";
  } else if (input.length > 1) {
    guessMessage.innerText = "Please guess only 1 letter";
  } else if (!input.match(acceptedLetter)) {
    guessMessage.innerText = "Please guess a letter A - Z";
  } else {
    return input;
  };
};

const makeGuess = function (letter) {
  guess = letter.toUpperCase();
  if (guessedLetters.includes(guess)) {
    guessMessage.innerText = `You've already guessed ${letter}, please guess a new letter.`;
  } else {
    guessedLetters.push(guess);
    displayGuesses();
    updateWord(guessedLetters);
  }
};

const displayGuesses = function () {
  guessedLettersList.innerHTML = "";
  for (letter of guessedLetters) {
    guessedLettersList.innerHTML += `${letter} `;
  }
};

const updateWord = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  winCheck();
};

const winCheck = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    guessMessage.classList.add("wind");
    guessMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
