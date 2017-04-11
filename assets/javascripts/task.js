// $(document).ready(shootUFOGame.start());
window.onload = shootUFOGame;

function shootUFOGame() {
  var gameContainerElm = document.getElementById('game-container');
  var scoreElm = document.getElementById('score');
  var countdownElm = document.getElementById('countdown');
  var shipElm = document.getElementById('spaceship');

  // Rightmost bound the ship can move to
  var rightBound = gameContainerElm.offsetWidth - shipElm.offsetWidth;
  // Bottommost bound the ship can move to
  var bottomBound = gameContainerElm.offsetHeight - shipElm.offsetHeight;
  // The setInterval() timer that's defined inside initialiseCountdown()
  var countdownTimer;
  // The setTimeout() timer that's defined inside scheduleMove()
  var movementTimer;
  // Player score
  var score = 0;
  // Game duration
  var secondsLeft = 60;

  function initialiseCountdown() {
    countdownElm.innerHTML = 'Seconds left: ' + secondsLeft;
    countdownTimer = setInterval(decreaseCountdown, 1000);
  }

  function decreaseCountdown() {
    countdownElm.innerHTML = 'Seconds left: ' + (secondsLeft -= 1);
    // Game end condition
    if (secondsLeft === 0) {
      stopGame();
    }
  }

  function initialiseScore() {
    scoreElm.innerHTML = 'Score: ' + score;
  }

  function increaseScore() {
    scoreElm.innerHTML = 'Score: ' + (score += 1);
  }

  function hideShip() {
    shipElm.className = 'hidden';
  }

  function unhideShip() {
    shipElm.className = '';
  }

  function moveShip() {
    shipElm.style.left = Math.random() * rightBound + 'px';
    shipElm.style.top = Math.random() * bottomBound + 'px';
  }

  function scheduleMove() {
    var delay = Math.random() * 2000;
    movementTimer = setTimeout(function () {
      moveShip();
      unhideShip();
      // Each move schedules the next move
      scheduleMove();
    }, delay);
  }

    function setShipClickHandler() {
      shipElm.onclick = function () {
        increaseScore();
        hideShip();
      };
    }

  function startGame() {
    setShipClickHandler();
    initialiseCountdown();
    initialiseScore();
    scheduleMove();
  }

  function stopGame() {
    clearInterval(countdownTimer);
    clearTimeout(movementTimer);
    shipElm.onclick = null;
  }

  startGame();
}
