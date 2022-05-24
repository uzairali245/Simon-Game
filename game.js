var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var notstarted = true;

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed").delay(100).queue(function(next) {
    $(this).removeClass("pressed");
    next();
  });
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio1 = new Audio("sounds/wrong.mp3");
    audio1.play();
    $("body").addClass("game-over").delay(200).queue(function(next) {
      $(this).removeClass("game-over");
      next();
    });
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  notstarted = true;
}
$(".btn").click(function() {
  var userChosenColour = this.id
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length - 1);
});


$(document).keypress(function() {
  if (notstarted) {
    nextSequence();

    $("h1").text("Level " + level);
  }
});