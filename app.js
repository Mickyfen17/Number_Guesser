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
numberGuessInput.disabled = false;

// HELPER FUNCTIONS
// Function set new game
function setGame() {
  minNum = parseInt(minNumRange.value);
  maxNum = parseInt(maxNumRange.value);
  numberGuessInput.min = minNum;
  numberGuessInput.max = maxNum;
  randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  guessText.className = "normalText";
  lastGuessNumber.innerText = "Take a guess between " + minNum + " & " + maxNum;
  numberGuessInput.value = "";
  lastGuessNumber.style.color = "black";
  // typeOfInput();
  // textVisible();
  // disableClearBtn();
  resetBtn.disabled = true;
  guessBtn.disabled = false;
  numberGuessInput.disabled = false;
  typeOfInput();
  textVisible();
  disableClearBtn();
  console.log("Min:" + minNum + " Max:" + maxNum + " Random:" + randomNumber);
}

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
  numberGuessInput.disabled = true;
}

// Function to set text size depending on guess inner test
function typeOfInput() {
  if(lastGuessNumber.innerText.search("Take") !== -1) {
    lastGuessNumber.style.fontSize = "2em";
  } else {
    lastGuessNumber.style.fontSize = "7em";
  }
}

// ONLOAD FUNCTION
// Load random number and style page on load/refresh
window.onload = function() {
  minNum = parseInt(minNumRange.value);
  maxNum = parseInt(maxNumRange.value);
  randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  textVisible();
  disableClearBtn();
  typeOfInput();
  console.log("Min:" + minNum + " Max:" + maxNum + " Random:" + randomNumber);
};

// EVENT LISTENER FUNCTIONS
// Guess button function
guessBtn.addEventListener("click", function() {
  var userNumber = parseInt(numberGuessInput.value);
  if(numberGuessInput.value === "") {
    return alert("Error: Valid Number Required");
  } else if(userNumber < minNum || userNumber > maxNum) {
    return alert("Please enter a number between " + minNum + " & " + maxNum);
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
    minNumRange.value = minNum -= 10;
    maxNumRange.value = maxNum += 10;
  } else if (userNumber > randomNumber) {
    guessText.innerText = "That is too high";
    lastGuessNumber.style.color = "#ed5a64";
  } else {
    guessText.innerText = "That is too low";
    lastGuessNumber.style.color = "#ed5a64";
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
  setGame();
});

// Submit button function
submitRangeBtn.addEventListener("click", function() {
  setGame();
  if(lastGuessNumber.innerText.search("Take") !== -1) {
    guessText.style.visibility = "hidden";
    lastGuessWas.style.visibility = "hidden";
  }
});

// Function to disable clear btn when input is empty
numberGuessInput.addEventListener("keyup", function() {
  disableClearBtn();
});

// Style input and buttons
// Reset game to reset range
// Display numbers to guess between DONE
// include instructions for min max range
// Take a guess text to be black???  DONE
