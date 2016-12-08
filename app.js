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
var whichReset; //logs whether reset or submit was clicked


// HELPER FUNCTIONS
// Function to set min & max values
function setRange(min, max) {
  if(min > max) {
    alert("Please enter the lowest number in the left field");
  } else {
  minNum = min;
  maxNum = max;
  }
}

// Function to set the value on the min & max values
function setRangeValue(min, max) {
  minNumRange.value = min;
  maxNumRange.value = max;
}

// Function holdig game conditional
function guessFunction(userNum, randomNum) {
  if (userNum === randomNum) {
    boom();
    lastGuessNumber.style.color = "#1abc9c";
    guessBtn.disabled = true;
    setRangeValue(minNum -= 10, maxNum += 10);
  } else if (userNum > randomNum) {
    guessText.innerText = "That is too high";
    lastGuessNumber.style.color = "#ed5a64";
  } else {
    guessText.innerText = "That is too low";
    lastGuessNumber.style.color = "#ed5a64";
  }
}

// Function to set new game
function setGame() {
  console.log(whichReset);
  if(whichReset === "resetBtn") {
    setRange(1, 100);
  } else {
    setRange(parseInt(minNumRange.value), parseInt(maxNumRange.value));
  }
  setRangeValue(minNum, maxNum);
  numberGuessInput.min = minNum;
  numberGuessInput.max = maxNum;
  randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  guessText.className = "normalText";
  lastGuessNumber.innerText = "Take a guess between " + minNum + " & " + maxNum;
  numberGuessInput.value = "";
  lastGuessNumber.style.color = "black";
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
  setRange(parseInt(minNumRange.value), parseInt(maxNumRange.value));
  randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  scoreSection.style.visibility = "hidden";
  playerAttempt.style.visibility = "hidden";
  textVisible();
  disableClearBtn();
  typeOfInput();
  console.log("Min:" + minNum + " Max:" + maxNum + " Random:" + randomNumber);
};

// EVENT LISTENER FUNCTIONS
// Guess button function
guessBtn.addEventListener("click", function() {
  var userNumber = parseInt(numberGuessInput.value);
  if(isNaN(userNumber)) {
    return alert("Error: Valid Number Required");
  } else if(userNumber < minNum || userNumber > maxNum) {
    return alert("Please enter a number between " + minNum + " & " + maxNum);
  }
  lastGuessNumber.innerText = userNumber;
  disableClearBtn();
  resetBtn.disabled = false;
  guessText.style.visibility = "visible";
  lastGuessWas.style.visibility = "visible";
  guessFunction(userNumber, randomNumber);
  twoPlayer();
  typeOfInput();
});

// Clear button function
clearBtn.addEventListener("click", function() {
  numberGuessInput.value = "";
  disableClearBtn();
});

// Reset button function
resetBtn.addEventListener("click", function(e) {
  whichReset = e.target.id;
  setGame();
  changePlayerText();
  oneScore = 0;
  twoScore = 0;
  playerOneScore.innerText = oneScore;
  playerTwoScore.innerText = twoScore;
});

// Submit button function
submitRangeBtn.addEventListener("click", function(e) {
  whichReset = e.target.id;
  setGame();
  changePlayerText();
  if(lastGuessNumber.innerText.search("Take") !== -1) {
    guessText.style.visibility = "hidden";
    lastGuessWas.style.visibility = "hidden";
  }
});

// Function to disable clear btn when input is empty
numberGuessInput.addEventListener("keyup", function() {
  disableClearBtn();
});

// ********************************************************
// 2 PLAYER GAME

 // Player2 variables;
var playerOneBtn = document.getElementById("playOne");
var playerTwoBtn = document.getElementById("playTwo");
var playerOneScore = document.getElementById("playerOneScore");
var playerTwoScore = document.getElementById("playerTwoScore");
var scoreSection = document.querySelector(".keepScore");
var playerAttempt = document.getElementById("playerAttempt");
var oneScore = 0;
var twoScore = 0;

// Player1 checkbox toggle function
playerOneBtn.addEventListener("change" , function() {
  if(playerOneBtn.checked) {
    console.log("Player1");
    playerTwoBtn.checked = false;
    scoreSection.style.visibility = "hidden";
    playerAttempt.style.visibility = "hidden";
  }
});

// Player2 checkbox toggle function
playerTwoBtn.addEventListener("change" , function() {
  if(playerTwoBtn.checked) {
    console.log("Player2");
    playerOneBtn.checked = false;
    scoreSection.style.visibility = "visible";
    playerAttempt.style.visibility = "visible";
    playerAttempt.innerText = "Player one to guess";
  }
});

// Game function
function twoPlayer() {
  if(playerTwoBtn.checked && playerAttempt.innerText.search("one") !== -1) {
    if(guessText.innerText.search("BOOM!") !== -1) {
      playerAttempt.innerText = "Player one wins!!!";
      oneScore += 1;
      playerOneScore.innerText = oneScore;
    } else {
      playerAttempt.innerText = "Player two to guess";
    }
  } else if(playerTwoBtn.checked && playerAttempt.innerText.search("two") !== -1) {
    if(guessText.innerText.search("BOOM!") !== -1) {
      playerAttempt.innerText = "Player two wins!!!";
      twoScore += 1;
      playerTwoScore.innerText = twoScore;
    } else {
      playerAttempt.innerText = "Player one to guess";
    }
  }
}

// Fucntion to change text on player win
function changePlayerText() {
  if(playerAttempt.innerText.search("one wins!!!") !== -1) {
    playerAttempt.innerText = "Player two to guess";
  } else if(playerAttempt.innerText.search("two wins!!!") !== -1) {
    playerAttempt.innerText = "Player one to guess";
  }
}
