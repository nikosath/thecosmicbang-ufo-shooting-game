$(shootUFOGame);

function shootUFOGame() {
  var $window = $(window);
  var $score = $('#score');
  var $countdown = $('#countdown');
  var $ship = $('#spaceship');

  // Rightmost bound that the ship can move to
  var rightBound = $window.width() - $ship.width();
  // Bottommost bound that the ship can move to
  var bottomBound = $window.height() - $ship.height();
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
    $countdown.html(secondsLeft);
    // Decrease countdown every 1000ms
    countdownTimer = setInterval(decreaseCountdown, 1000);
  }

  function decreaseCountdown() {
    console.log(secondsLeft);
    $countdown.html(secondsLeft -= 1);
    // Game end condition
    if (secondsLeft === 0) {
      stopGame();
    }
  }

  function initialiseScore() {
    score = 0;
    $score.html(score);
  }

  function increaseScore() {
    $score.html(score += 1);
  }

  function hideShip() {
    $ship.addClass('hidden');
  }

  function unhideShip() {
    $ship.removeClass('hidden');
  }

  function moveShip() {
    $ship.css('left', Math.random() * rightBound + 'px');
    $ship.css('top', Math.random() * bottomBound + 'px');
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
      $ship.on('click', function () {
        increaseScore();
        hideShip();
      });
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
    $ship.off('click');
  }

  startGame();
}
