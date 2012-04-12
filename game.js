//jquery cdn: http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//jquery local: jquery-1.7.2.js

var ctx;
var canvas_height;
var canvas_width;
var debugDiv;
var snakeLength = 200;
var time = 0;
var timeBetweenGrowth = 150;
var gameOver = false;
var snake = {
  width: 1,
  corners: [],
  pieces: [],
};
var horiz_impar = new Image();
  horiz_impar.src = 'horiz_impar.png';
var horiz_par = new Image();
  horiz_par.src = 'horiz_par.png';
var vert_impar = new Image();
  vert_impar.src = 'vert_impar.png';
var vert_par = new Image();
  vert_par.src = 'vert_par.png';


function makeSnake() {
  while(snakeLength > 0) {
    snake.pieces.push({pos: {x:snakeLength, y:50},speed: {x: 40, y: 0}});
    snakeLength = snakeLength - 40;
  } 
}

function extendSnake(tail){
  var extendSnakeLength = 1;
  while(extendSnakeLength < 10){
    snake.pieces.push({pos: {x:Math.abs(tail.pos.x - (extendSnakeLength * tail.speed.x)), y:Math.abs(tail.pos.y 
        - (extendSnakeLength * tail.speed.y))}, speed: {x:tail.speed.x, y: tail.speed.y}});
    extendSnakeLength++;
  }
}

var rightDown = false;
var leftDown = false;
var upDown = false;
var downDown = false;

function drawMap() {
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(0, 0, canvas_width, 2);
  ctx.fillRect(0, 0, 2, canvas_height);
  ctx.fillRect(0, canvas_height-2, canvas_width, 2);
  ctx.fillRect(canvas_width-2, 0, 2, canvas_height);
}

function debugInfo(){
  debugDiv.html("---PIECES---</br>");
  $.each(snake.pieces,function(index,value){
    debugDiv.html(debugDiv.html() + value.pos.x + " , " + value.pos.y + "<br/>");
  });

  debugDiv.html(debugDiv.html() + "---SPEED---</br>");
  debugDiv.html(debugDiv.html() + snake.pieces[0].speed.x + " , " + snake.pieces[0].speed.y + "<br/>");

  debugDiv.html(debugDiv.html() + "---CORNERS---</br>");
  $.each(snake.corners,function(index,value){
    debugDiv.html(debugDiv.html() + value.pos.x + " , " + value.pos.y + " " +
      value.speed.x + " , " + value.speed.y + "<br/>");
  });
}

function clear() {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
}

function draw(){
  clear();
  drawMap();
  drawSnake();
  //debugInfo();
}

function drawSnake(){
//  draw snake
  $.each(snake.pieces,function(index, value){
    var esPar = false;
    var movHoriz = false;

    if(value.pos.x % 2 == 0) esPar = true;
    if(value.speed.x != 0) movHoriz = true; 
    
    if(esPar){
      if(movHoriz){
        ctx.drawImage(horiz_impar, value.pos.x, value.pos.y);
      } else {
        ctx.drawImage(vert_impar, value.pos.x, value.pos.y);
      }
    } else {
      if(movHoriz){
        ctx.drawImage(horiz_par, value.pos.x, value.pos.y); 
      } else {
        ctx.drawImage(vert_par, value.pos.x, value.pos.y);
      }
    }
    //ctx.fillRect(value.pos.x, value.pos.y, snake.width, snake.width);
  });
  
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function checkCollisions(head) {

  var response = false;
  /*var pixel = ctx.getImageData(head.pos.x + head.speed.x, head.pos.y + head.speed.y, 1, 1).data; 
  var hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);

  if(ctx.fillStyle == hex && hex != '#000000'){
    response = true;
  }*/

  if (head.pos.x >= canvas_width - snake.width || head.pos.x <= 0){
    head.speed.x = 0;
    response = true;
  }
  if (head.pos.y <= 0 || head.pos.y >= canvas_height - snake.width){
    head.speed.y = 0;
    response = true;
  }
  return response;
}

function checkInputs(head) {
  if (upDown && head.speed.y == 0) {
    head.speed = {x: 0, y:-40 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }
  else if (downDown && head.speed.y == 0) {
    head.speed = {x: 0, y:40 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }
  else if (leftDown && head.speed.x == 0) {
    head.speed = {x: -40, y:0 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }
  else if (rightDown && head.speed.x == 0) {
    head.speed = {x: 40, y:0 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }
}

function update(){
  time++;
  if(time > timeBetweenGrowth){
    time = 0;
    //extendSnake(snake.pieces[snake.pieces.length-1]);
  }

  var head = snake.pieces[0];

  checkInputs(head);
  if(!checkCollisions(head)){

	  $.each(snake.pieces, function(indexPiece,piece){
	     var isLastPiece = false;
	       $.each(snake.corners,function(indexCorner,corner){
		 if(piece.pos.x == corner.pos.x && piece.pos.y == corner.pos.y){
		  piece.speed.x = corner.speed.x;
		  piece.speed.y = corner.speed.y;

		  if(indexPiece == snake.pieces.length-1) isLastPiece = true;
		 }
	       });
	     if (isLastPiece) snake.corners.shift(); //debugDiv.html(snake.corners.length);

	     piece.pos.x += piece.speed.x;
	     piece.pos.y += piece.speed.y;
	  });
	  draw();
  } else {
    debugDiv.html("Game Over! Has perdido!");
    gameOver = true;
  }
}

$(document).ready(function(){
  debugDiv = $("#debug");

  $(document).keydown(function(evt){
   if(!gameOver){
    rightDown = false;
    leftDown = false;
    upDown = false;
    downDown = false;

    if (evt.keyCode == 39)
      rightDown = true;
    if (evt.keyCode == 37)
      leftDown = true;
    if (evt.keyCode == 38)
      upDown = true;
    if (evt.keyCode == 40)
      downDown = true;
   }
  });

  $(document).keyup(function(evt){
    if (evt.keyCode == 39)
      rightDown = false;
    if (evt.keyCode == 37)
      leftDown = false;
    if (evt.keyCode == 38)
      upDown = false;
    if (evt.keyCode == 40)
      downDown = false;
  });


  ctx = $('#canvas')[0].getContext("2d");
  canvas_width = $("#canvas").attr("width");
  canvas_height = $("#canvas").attr("height");
  makeSnake();
  setInterval(update,300);

});
