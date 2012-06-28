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

function rectanglesCollide(pos1, width1, height1, pos2, width2, height2){
  var left1 = pos1.x;
  var left2 = pos2.x;
  var top1 = pos1.y;
  var top2 = pos2.y;
  var bottom1 = pos1.y + height1;
  var bottom2 = pos2.y + height2;
  var right1 = pos1.x + width1;
  var right2 = pos2.x + width2;

  if(bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2){
    return false;
  }
  else{
    return true;
  }
}

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

function drawLevelCleared(){
  clear();
  ctx.fillText(LEVEL_CLEARED, 50, 50);
}

function drawCongratulations(){
  clear();
  ctx.fillText(CONGRATULATIONS, 50, 50);
}

function update(){
  switch(gameStatus){
    case "menu":
      drawMenu();
      if(keyboardState.sDown)
        gameStatus = "playing";
      break;
    case "playing":
      if(levels[currentLevel].levelCleared){
        gameStatus = "level_cleared";
        framesToWait = 45;
        return;
      }else if(snake.collisioned){
        gameStatus = "game_over";
        framesToWait = 45;
        return;
      }else{
        snake.update(canvas_width, canvas_height, levels[currentLevel], keyboardState);
        drawPlaying();
      }
      break;
    case "level_cleared":
      if(framesToWait > 0){
        drawLevelCleared();
        framesToWait --;
      }
      else{
        //iniciar nuevo nivel
        if(currentLevel + 1 < levels.length){
          currentLevel ++;
          snake = new Snake();
          gameStatus = "playing";
        }
        else{
          framesToWait = 90;
          gameStatus = "congratulations";
        }
      }
      break;
    case "game_over":
      if(framesToWait > 0){
        drawGameOver();
        framesToWait --;
      }
      else{
        initGame();
      }
    break;
    case "congratulations":
      if(framesToWait > 0){
        drawCongratulations();
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
  levels = loadLevelData();
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
  ctx.font = "16pt Arial";
  canvas_width = $("#canvas").attr("width");
  canvas_height = $("#canvas").attr("height");
  initGame();

});
