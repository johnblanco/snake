//jquery cdn: http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//jquery local: jquery-1.7.2.js

var ctx;
var canvas_height;
var canvas_width;
var keyboardState;
var snake;
var timer;
var gameStatus;
var gamePaused;
var framesToWait;
var levels;
var currentLevel;

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
//  debugInfo();
}

function drawMenu(){
  clear();
  ctx.fillText(START_GAME , 50, 50);
}

function drawGameOver(){
  clear();
  ctx.fillText(GAME_OVER, 50, 50);
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
      
      if(snake.collisioned){
        gameStatus = "gameover";
        framesToWait = 45;
      }
      break;
    case "gameover":
      if(framesToWait > 0){
        drawGameOver();
        framesToWait --;
      }
      else{
        initGame();
      }
    break;
  }
}

function initGame(){
  ctx.fillStyle = "rgb(200,0,0)";

  clearInterval(timer);

  snake = new Snake();
  gamePaused = false;
  gameStatus = "menu";
  levels = [new Level([],
            [
              new Vector(130,94),
              new Vector(130,123),
              new Vector(330,123),
              new Vector(561,195),
              new Vector(450,193),
              new Vector(10,205),
              new Vector(205,105)]),
              new Level([],[new Vector(50,50),new Vector(100,100)])];
  currentLevel = 0;

  timer = setInterval(update, 30);
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
      if(gamePaused){
        timer = setInterval(update, 30);
      }
      else{
        clearInterval(timer);
      }
      gamePaused = !gamePaused;
    }
  });

  $(document).keyup(function(evt){
    keyboardState = new KeyboardState();
  });

  ctx = $('#canvas')[0].getContext("2d");
  canvas_width = $("#canvas").attr("width");
  canvas_height = $("#canvas").attr("height");
  initGame();

});
