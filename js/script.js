const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingMessage = document.querySelector(".remaining");
const remaining = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
  const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await res.text();
  const wordArray = data.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  makeLettersSecret(word);
};

const makeLettersSecret = function (word) {
  const wordArray = [];
  for (const letter of word) {
    wordArray.push("●");
  }
  wordInProgress.innerText = wordArray.join("");
};

getWord();

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
    countGuesses(guess);
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

const countGuesses = function (guess) {
  const wordUpper = word.toUpperCase();
  if (!wordUpper.includes(guess)) {
    guessMessage.innerText = `Sorry, the word doesn't have ${guess} in it, please guess a new letter.`;
    remainingGuesses -= 1;
  } else {
    guessMessage.innerText = `Good guess! The word has the letter ${guess}.`;
  };
  if (remainingGuesses === 0) {
    guessMessage.innerText = `Game Over! The word was:`;
    wordInProgress.innerText = wordUpper;
    remainingMessage.innerText = "";
  } else if (remainingGuesses === 1){
    remainingMessage.innerHTML = `You have <span>${remainingGuesses} guess</span> remaining.`;
  } else {
    remainingMessage.innerHTML = `You have <span>${remainingGuesses} guesses</span> remaining.`;
  }
};

const winCheck = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    guessMessage.classList.add("win");
    guessMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
