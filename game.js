/*
    Mohamad Al-Nakib
*/

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keydown(function () {
  //Display the level
  if (start == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});

//Add the click btn to the array
$(".btn").click(function () {
  //Get the clicked element ID
  var userChosenColour = this.getAttribute("id"); // $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

//Restart the game
function startOver() {
  level = 0;
  start = false;
  gamePattern = [];
}

//Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    // Change the H1 title to "Game Over, Press Any Key to Restart" if the user got the answer wrong
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //Play the sound wrong
    playSound("wrong");

    //Change the body class to 'game-over'
    $("body").addClass("game-over");

    //Wait 2000ms then remove the class 'game-over'
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  //Empty the  clicked pattern
  userClickedPattern = [];
  //Increase the level
  level++;

  //Display the level
  $("h1").text("Level " + level);

  //Generate random number between 0 and 3.
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  //Choose the color from the random number.
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  //Select the color and Flash it (animation).
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  //Play the sound of the color.
  var playSound = new Audio("./sounds/" + name + ".mp3");
  playSound.play();
}

function animatePress(currentColour) {
  //Add the pressed class to the btn
  $("#" + currentColour).addClass("pressed");

  //Wait 100ms remove the pressed class from the btn
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
