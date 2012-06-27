//jquery cdn: http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//jquery local: jquery-1.7.2.js

var ctx;
var canvas_height;
var canvas_width;
var keyboardState;
var snake = new Snake();
var timer;
var gameStatus = "menu";

var levels = [new Level([],[new Vector(165,205),new Vector(205,105)]),
              new Level([],[new Vector(50,50),new Vector(100,100)])];
var currentLevel = 0;

function debugInfo(){
  var textY = 300;
  $.each(snake.pieces,function(index,value){
    ctx.fillText(value.pos.x + " , " + value.pos.y , 540, textY);
    textY += 20;
  });

  textY = 300;
  $.each(snake.corners,function(index,value){
    ctx.fillText(value.pos.x + " , " + value.pos.y , 590, textY);
    textY += 20;
  });
}

function clear() {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
}

function drawPlaying(){
  clear();
  //draw level
  levels[currentLevel].draw(ctx, canvas_width, canvas_height);
  //draw snake
  snake.draw(ctx);
  debugInfo();
}

function drawMenu(){
  clear();
  ctx.fillText("Press 's' to start game.",50,50);
}

function update(){
  switch(gameStatus){
    case "menu":
      drawMenu();
      if(keyboardState.sDown)
        gameStatus = "playing";
      break;
    case "playing":
      snake.update(canvas_width, canvas_height, levels[currentLevel], keyboardState);
      drawPlaying();
      if(keyboardState.pDown)
        snake.pause();
      break;
    case "gameover":
    break;
  }
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
    if(evt.keyCode == 83){ // s key
      keyboardState.sDown = true;
    }
    if(evt.keyCode == 80){ // p key
      keyboardState.pDown = true;
    }

  });

  $(document).keyup(function(evt){
    keyboardState = new KeyboardState();
  });

  ctx = $('#canvas')[0].getContext("2d");
  canvas_width = $("#canvas").attr("width");
  canvas_height = $("#canvas").attr("height");
  timer = setInterval(update, 30);

});
