// $(document).ready(shootUFOGame.start());
window.onload = shootUFOGame;

function shootUFOGame() {
  var elmGameMap = document.getElementById('game-map');
  // The setInterval() timer that's defined inside initialiseCountdown()
  var countdownTimer;
  // The setTimeout() timer that's defined inside scheduleMove()
  var movementTimer;
  // increaseScore() is defined inside initialiseScore()
  var increaseScore;

  var elmShip = document.getElementById('spaceship');
  elmShip.onclick = function handleShipClick() {
    increaseScore();
    hideShip();
  };
  
  // Rightmost bound the ship can move to
  var rightBound = elmGameMap.offsetWidth - elmShip.offsetWidth;
  // Bottommost bound the ship can move to
  var bottomBound = elmGameMap.offsetHeight - elmShip.offsetHeight;

  var elmCountdown = document.getElementById('countdown');
  // Game duration
  var secondsLeft = 10;

  function initialiseCountdown() {
    elmCountdown.innerHTML = 'Seconds left: ' + secondsLeft;
    countdownTimer = setInterval(decreaseCountdown, 1000);
  }

  function decreaseCountdown() {
    elmCountdown.innerHTML = 'Seconds left: ' + (secondsLeft -= 1);
    // Game end condition
    if (secondsLeft === 0) {
      stopGame();
    }
  }

  var elmScore = document.getElementById('score');
  var score = 0;

  function initialiseScore() {
    elmScore.innerHTML = 'Score: ' + score;
  }

  increaseScore = function () {
    elmScore.innerHTML = 'Score: ' + (score += 1);
  };

  function hideShip() {
    elmShip.className = 'hidden';
  }

  function unhideShip() {
    elmShip.className = '';
  }

  function moveShip() {
    elmShip.style.left = Math.random() * rightBound + 'px';
    elmShip.style.top = Math.random() * bottomBound + 'px';
  }

  function scheduleMove() {
    var delay = Math.random() * 2000;
    movementTimer = setTimeout(function () {
      moveShip();
      unhideShip();
      scheduleMove();
    }, delay);
  }

  function startGame() {
    initialiseCountdown();
    initialiseScore();
    scheduleMove();
  }

  function stopGame() {
    clearInterval(countdownTimer);
    clearTimeout(movementTimer);
    ship.onclick = null;
  }

  startGame();
}
