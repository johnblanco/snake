//jquery cdn: http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//jquery local: jquery-1.7.2.js

var Debug = function($container) {
  this.$container = $container;
};
Debug.prototype.print = function(string) {
  console.log(string);
};
Debug.prototype.showInfo = function(snake) {
  debug.print("---PIECES---");

  $.each(snake.pieces,function(index,value){
    debug.print(value.pos.x + " , " + value.pos.y);
  });

  debug.print("---SPEED---");
  debug.print(snake.pieces[0].speed.x + " , " + snake.pieces[0].speed.y);

  debug.print("---CORNERS---");
  $.each(snake.corners,function(index,value){
    debug.print(value.pos.x + " , " + value.pos.y + " " +
      value.speed.x + " , " + value.speed.y);
  });
};

var debug = null;

var ctx;
var canvas_height;
var canvas_width;
var snakeLength = 100;
var gameOver = false;

var snake = {
  width: 1,
  corners: [],
  pieces: [],
};


function makeSnake() {
  while(snakeLength > 0) {
    snake.pieces.push({pos: {x:snakeLength, y:50},speed: {x: 1, y: 0}});
    snakeLength--;
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

function clear() {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
}

function draw(){
  clear();
  drawMap();
  drawSnake();
  // debug.showInfo(snake);
}

function drawSnake(){
//  draw snake
  $.each(snake.pieces,function(index, value){
    ctx.fillRect(value.pos.x, value.pos.y, snake.width, snake.width);
  });
  
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function checkCollisions(head) {

  var response = false;
  var pixel = ctx.getImageData(head.pos.x + head.speed.x, head.pos.y + head.speed.y, 1, 1).data; 
  var hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);

  if(ctx.fillStyle == hex && hex != '#000000'){
    response = true;
  }

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
    head.speed = {x: 0, y:-1 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }
  if (downDown && head.speed.y == 0) {
    head.speed = {x: 0, y:1 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }

  if (leftDown && head.speed.x == 0) {
    head.speed = {x: -1, y:0 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }

  if (rightDown && head.speed.x == 0) {
    head.speed = {x: 1, y:0 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }
}

function update(){
  var head = snake.pieces[0];

  checkInputs(head);
  if (!checkCollisions(head)) {

	  $.each(snake.pieces, function(indexPiece,piece){
	    //if(indexPiece != 0){
	      $.each(snake.corners,function(indexCorner,corner){
		if(piece.pos.x == corner.pos.x && piece.pos.y == corner.pos.y){
		  piece.speed.x = corner.speed.x;
		  piece.speed.y = corner.speed.y;

		  if(indexPiece == snake.pieces.length-1){
		    //es la ultima pieza que doblo en la esquina
		    //esta esquina no sirve mas
		    //snake.corners.shift();
		    
		    //BUG: cuando la vibora tiene varias esquinas para hacer
		    //la ultima pieza se va quedando atras
		  }
		}
	      });
	    //}

	    piece.pos.x += piece.speed.x;
	    piece.pos.y += piece.speed.y;
	  });

	  draw();
  } else {
    debug.print("Game Over!");
    gameOver = true;
  }
}

$(document).ready(function() {
  debug = new Debug($("#debug"));

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
  setInterval(update,30)

});
