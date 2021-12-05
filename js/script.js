const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingMessage = document.querySelector(".remaining");
const remaining = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

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
  console.log(guess);
  guessInput.value = "";
});
