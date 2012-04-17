//jquery cdn: http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//jquery local: jquery-1.7.2.js

var Map = function($obj, width, height) {
  this.width = $obj.attr("width");
  this.height = $obj.attr("height");
  this.ctx = $('#canvas')[0].getContext("2d");
};

Map.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
};

Map.prototype.draw = function() {
  this.clear();

  this.ctx.fillStyle = "rgb(200,0,0)";
  this.ctx.fillRect(0, 0, this.width, 2);
  this.ctx.fillRect(0, 0, 2, this.height);
  this.ctx.fillRect(0, this.height - 2, this.width, 2);
  this.ctx.fillRect(this.width - 2, 0, 2, this.height);
};



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
