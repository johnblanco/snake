//jquery cdn: http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//jquery local: jquery-1.7.2.js

var ctx;
var canvas_height;
var canvas_width;
var keyboardState;
var snake = new Snake();

var maps = [
  {foods: [
    {x:165, y: 205},
    {x:205, y: 105}
  ]}
];

var currentMap = 0;
var currentFood = 0;

function drawMap() {
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(0, 0, canvas_width, 2);
  ctx.fillRect(0, 0, 2, canvas_height);
  ctx.fillRect(0, canvas_height-2, canvas_width, 2);
  ctx.fillRect(canvas_width-2, 0, 2, canvas_height);

  var foodPos = {x: maps[currentMap].foods[currentFood].x, y:maps[currentMap].foods[currentFood].y};
  ctx.beginPath();
  ctx.arc(foodPos.x, foodPos.y, 5, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
  
}

function debugInfo(){
  var textY = 300;
  $.each(snake.pieces,function(index,value){
    ctx.fillText(value.pos.x + " , " + value.pos.y , 560, textY);
    textY += 20;
  });
}

function clear() {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
}

function draw(){
  clear();
  drawMap();
  snake.draw(ctx);
  debugInfo();
}

function update(){
  snake.update(canvas_width, canvas_height, keyboardState);
  draw();
}

$(document).ready(function(){
  keyboardState = new KeyboardState();

  $(document).keydown(function(evt){
    keyboardState = new KeyboardState();

    if (evt.keyCode == 39)
      keyboardState.rightDown = true;
    if (evt.keyCode == 37)
      keyboardState.leftDown = true;
    if (evt.keyCode == 38)
      keyboardState.upDown = true;
    if (evt.keyCode == 40)
      keyboardState.downDown = true;
  });

  $(document).keyup(function(evt){
    keyboardState = new KeyboardState();
  });

  ctx = $('#canvas')[0].getContext("2d");
  canvas_width = $("#canvas").attr("width");
  canvas_height = $("#canvas").attr("height");
  setInterval(update, 90);

});
