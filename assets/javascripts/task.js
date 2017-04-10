// $(document).ready(startGame);
window.onload = startGame;

function startGame() {
  var container = document.getElementById('game-container');
  var countdownTimer, movementTimer;
  var ship = document.getElementById('spaceship');

  function stopGame() {
    clearInterval(countdownTimer);
    clearTimeout(movementTimer);
    ship.onclick = null;
    // countdownTimer = null;
  }

  function startCountdown() {
    var elem = document.getElementById('countdown');
    var secondsLeft = 2;
    elem.innerHTML = 'Seconds left: ' + secondsLeft;

    function updateCountdown() {
      elem.innerHTML = 'Seconds left: ' + (secondsLeft -= 1);
      if (secondsLeft === 0) {
        stopGame();
      }
    }
    countdownTimer = setInterval(updateCountdown, 1000);
  }

  function moveShip() {

  }

  function scheduleMove() {
    movementTimer = setTimeout(function () {
      moveShip();
      scheduleMove();
    }, 500);
  }

  startCountdown();
  scheduleMove();
}
