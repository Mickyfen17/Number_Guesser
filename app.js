var numberGuessInput = document.getElementById("numberGuess");
var guessBtn = document.getElementById("guessBtn");
var clearBtn = document.getElementById("clearBtn");
var resetBtn = document.getElementById("resetBtn");
var lastGuessNumber = document.getElementById("lastGuessNumber");
var guessText = document.getElementById("guessText");
var lastGuessWas = document.getElementById("lastGuessWas");
var randomNumber;
resetBtn.disabled = true;

// Helper funtion to hide text on load and reset
function textVisible() {
  if(guessText.style.visibility === "hidden" && lastGuessWas.style.visibility === "hidden") {
    guessText.style.visibility = "visible";
    lastGuessWas.style.visibility = "visible";
  } else {
    guessText.style.visibility = "hidden";
    lastGuessWas.style.visibility = "hidden";
  }
}

// Disable clearBtn helper function
function disableClearBtn() {
  clearBtn.disabled = false;
  if(numberGuessInput.value === "") {
    clearBtn.disabled = true;
  }
}

// Clear button function
clearBtn.addEventListener("click", function() {
  numberGuessInput.value = "";
  disableClearBtn();
});

// Load random number on page load
window.onload = function() {
  randomNumber = Math.ceil(Math.random() * 100);
  textVisible();
  disableClearBtn();
  typeOfInput();
  console.log(randomNumber);
};

// Load random number on reset
resetBtn.addEventListener("click", function() {
  randomNumber = Math.ceil(Math.random() * 100);
  guessText.className = "normalText";
  lastGuessNumber.innerText = "Take a guess...";
  numberGuessInput.value = "";
  lastGuessNumber.style.color = "#ed5a64";
  typeOfInput();
  textVisible();
  disableClearBtn();
  resetBtn.disabled = true;
  guessBtn.disabled = false;
  console.log(randomNumber);
});

// Guess function
guessBtn.addEventListener("click", function() {
  var userNumber = parseInt(numberGuessInput.value);
  if(numberGuessInput.value === "") {
    return alert("Error: Valid Number Required");
  } else if(userNumber < 1 || userNumber > 100) {
    return alert("Please enter a number between 1 & 100");
  }
  disableClearBtn();
  resetBtn.disabled = false;
  guessText.style.visibility = "visible";
  lastGuessWas.style.visibility = "visible";

  if (userNumber === randomNumber) {
    boom();
    lastGuessNumber.innerText = userNumber;
    lastGuessNumber.style.color = "#1abc9c";
    guessBtn.disabled = true;
  } else if (userNumber > randomNumber) {
    guessText.innerText = "That is too high";
    lastGuessNumber.innerText = userNumber;
  } else {
    guessText.innerText = "That is too low";
    lastGuessNumber.innerText = userNumber;
  }
  typeOfInput();
});

// Function to add boom class when answer is correct
function boom() {
  guessText.innerText = "BOOM!";
  guessText.className = "boom";
}

// Function to set size depending on guess inner test
function typeOfInput() {
  if(lastGuessNumber.innerText === "Take a guess...") {
    lastGuessNumber.style.fontSize = "2em";
  } else {
    lastGuessNumber.style.fontSize = "7em";
  }
}
