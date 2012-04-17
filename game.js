//jquery cdn: http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//jquery local: jquery-1.7.2.js

var debug = null;
var ctx;
var canvas_height;
var canvas_width;
var gameOver = false;
var snake = null;
var control = null;

function drawMap() {
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(0, 0, canvas_width, 2);
  ctx.fillRect(0, 0, 2, canvas_height);
  ctx.fillRect(0, canvas_height - 2, canvas_width, 2);
  ctx.fillRect(canvas_width - 2, 0, 2, canvas_height);
}

function clear() {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function update() {
  clear();
  drawMap();
  snake.moveForward();
  snake.checkCollisions(snake);
}

$(function() {
  debug = new Debug($("#debug"));
  control = new Control();
  snake = new Snake(100, control);

  snake.bind("collision", function() {
    gameOver = true;
    debug.print("Game Over!");
  });

  $(document).keydown(function(evt){
    if(!gameOver){
      control.keyDown(evt.keyCode);
    }
  });

  $(document).keyup(function(evt){
    control.keyUp(evt.keyCode)
  });


  ctx = $('#canvas')[0].getContext("2d");
  canvas_width = $("#canvas").attr("width");
  canvas_height = $("#canvas").attr("height");
  snake.assignMap(ctx);
  snake.make();

  var loop = setInterval(function() {
    if (gameOver) {
      clearInterval(loop);
    } else {
      update();
    }
  }, 30);

});
