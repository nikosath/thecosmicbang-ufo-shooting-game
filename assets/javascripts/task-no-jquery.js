window.onload = shootUFOGame;

function shootUFOGame() {
  var scoreElm = document.getElementById('score');
  var countdownElm = document.getElementById('countdown');
  var shipElm = document.getElementById('spaceship');

  // Rightmost bound the ship can move to
  var rightBound = window.innerWidth - shipElm.offsetWidth;
  // Bottommost bound the ship can move to
  var bottomBound = window.innerHeight - shipElm.offsetHeight;
  // The setInterval() timer that's defined inside initialiseCountdown()
  var countdownTimer;
  // The setTimeout() timer that's defined inside scheduleMove()
  var movementTimer;
  // Player score
  var score;
  // Game duration
  var secondsLeft;

  function initialiseCountdown() {
    secondsLeft = 60;
    countdownElm.innerHTML = 'Seconds left: ' + secondsLeft;
    // Decrease countdown every 1000ms
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
    score = 0;
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
    // Wait between 0 and 2000ms before each move
    var delay = Math.random() * 2000;
    movementTimer = setTimeout(function () {
      moveShip();
      unhideShip();
      // With each move, schedule the next move
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
