// $(document).ready(startGame);
window.onload = startGame;

function startGame() {
  var gameMap = document.getElementById('game-map');
  var countdownTimer, movementTimer;
  var ship = document.getElementById('spaceship');
  var rightBound = gameMap.offsetWidth - ship.offsetWidth;
  var bottomBound = gameMap.offsetHeight - ship.offsetHeight;

  function stopGame() {
    clearInterval(countdownTimer);
    clearTimeout(movementTimer);
    ship.onclick = null;
  }

  function initialiseCountdown() {
    var elem = document.getElementById('countdown');
    var secondsLeft = 10;
    elem.innerHTML = 'Seconds left: ' + secondsLeft;

    countdownTimer = setInterval(decreaseCountdown, 1000);
    function decreaseCountdown() {
      elem.innerHTML = 'Seconds left: ' + (secondsLeft -= 1);
      // Game end condition
      if (secondsLeft === 0) {
        stopGame();
      }
    }
  }

  // Make increaseScore() available to handleShipClick()
  var increaseScore;

  function initialiseScore() {
    var elem = document.getElementById('score');
    var score = 0;
    elem.innerHTML = 'Score: ' + score;

    increaseScore = function () {
      elem.innerHTML = 'Score: ' + (score += 1);
    };
  }

  ship.onclick = function handleShipClick() {
    clearTimeout(movementTimer);
    increaseScore();
    moveShip();
    scheduleMove();
  };

  function moveShip() {
    ship.style.left = Math.random() * rightBound + 'px';
    ship.style.top = Math.random() * bottomBound + 'px';
  }

  function scheduleMove() {
    var delay = Math.random() * 2000;
    // var delay = 2000;
    movementTimer = setTimeout(function () {
      moveShip();
      scheduleMove();
    }, delay);
  }

  initialiseCountdown();
  initialiseScore();
  scheduleMove();
}
