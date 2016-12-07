var numberGuessInput = document.getElementById("numberGuess");
var guessBtn = document.getElementById("guessBtn");
var clearBtn = document.getElementById("clearBtn");
var resetBtn = document.getElementById("resetBtn");
var lastGuessNumber = document.getElementById("lastGuessNumber");
var guessText = document.getElementById("guessText");
var lastGuessWas = document.getElementById("lastGuessWas");
var minNumRange = document.getElementById("minNum");
var maxNumRange = document.getElementById("maxNum");
var submitRangeBtn = document.getElementById("submitRange");
var randomNumber;
var maxNum;
var minNum;
resetBtn.disabled = true;

submitRangeBtn.addEventListener("click", function() {
  minNum = minNumRange.value;
  maxNum = maxNumRange.value;

  console.log("Submit clicked " + minNum + " " + maxNum);
});


// HELPER FUNCTIONS
// Function to hide text on load and reset
function textVisible() {
  if(guessText.style.visibility === "hidden" && lastGuessWas.style.visibility === "hidden") {
    guessText.style.visibility = "visible";
    lastGuessWas.style.visibility = "visible";
  } else {
    guessText.style.visibility = "hidden";
    lastGuessWas.style.visibility = "hidden";
  }
}

// Function to toggle/disable clearBtn
function disableClearBtn() {
  clearBtn.disabled = false;
  if(numberGuessInput.value === "") {
    clearBtn.disabled = true;
  }
}

// Function to add boom class when answer is correct
function boom() {
  guessText.innerText = "BOOM!";
  guessText.className = "boom";
}

// Function to set text size depending on guess inner test
function typeOfInput() {
  if(lastGuessNumber.innerText === "Take a guess...") {
    lastGuessNumber.style.fontSize = "2em";
  } else {
    lastGuessNumber.style.fontSize = "7em";
  }
}

// ONLOAD FUNCTION
// Load random number and style page on load/refresh
window.onload = function() {
  randomNumber = Math.ceil(Math.random() * 100);
  textVisible();
  disableClearBtn();
  typeOfInput();
  console.log(randomNumber);
};

// EVENT LISTENER FUNCTIONS
// Guess button function
guessBtn.addEventListener("click", function() {
  var userNumber = parseInt(numberGuessInput.value);
  if(numberGuessInput.value === "") {
    return alert("Error: Valid Number Required");
  } else if(userNumber < 1 || userNumber > 100) {
    return alert("Please enter a number between 1 & 100");
  }
  lastGuessNumber.innerText = userNumber;
  disableClearBtn();
  resetBtn.disabled = false;
  guessText.style.visibility = "visible";
  lastGuessWas.style.visibility = "visible";

  if (userNumber === randomNumber) {
    boom();
    lastGuessNumber.style.color = "#1abc9c";
    guessBtn.disabled = true;
  } else if (userNumber > randomNumber) {
    guessText.innerText = "That is too high";
  } else {
    guessText.innerText = "That is too low";
  }
  typeOfInput();
});

// Clear button function
clearBtn.addEventListener("click", function() {
  numberGuessInput.value = "";
  disableClearBtn();
});

// Reset button function
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

// Function to disable clear btn when input is empty
numberGuessInput.addEventListener("keyup", function() {
  disableClearBtn();
});
