//jquery cdn: http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//jquery local: jquery-1.7.2.js

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

$(function() {
  var gameOver = false;

  var map = new Map($("#canvas"));
  var debug = new Debug($("#debug"));
  var control = keyboardController();

  var snake = new Snake(Point.at(10, 10), 100, control);
  snake.assignMap(map);

  snake.bind("collision", function() {
    gameOver = true;
    debug.print("Game Over!");
  });

  $(document).keydown(function(evt) {
    if(!gameOver){
      control.keyDown(evt.keyCode);
    }
  });

  $(document).keyup(function(evt) {
    control.keyUp(evt.keyCode)
  });

  var loop = setInterval(function() {
    if (gameOver) {
      clearInterval(loop);
    } else {
      map.draw();
      snake.moveForward();
      snake.checkCollisions(snake);
    }
  }, 30);

});
