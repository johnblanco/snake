var ctx;
var canvas_height;
var canvas_width;
var snake = {
  width: 5,
  pieces: [
    {pos: {x:50, y:50}, speed: {x:1, y:0}},
    {pos: {x:49, y:50}, speed: {x:1, y:0}},
    {pos: {x:48, y:50}, speed: {x:1, y:0}},
    {pos: {x:47, y:50}, speed: {x:1, y:0}},
    {pos: {x:46, y:50}, speed: {x:1, y:0}}
  ],
  corners: []
};
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
  ctx.clearRect(0, 0, 800, 600);
}

function draw(){
  clear();
  drawMap();
  drawSnake();

}

function drawSnake(){
  //draw snake
  $.each(snake.pieces,function(index, value){
    ctx.fillRect(value.pos.x, value.pos.y, snake.width, snake.width);
  });
}

function update(){

  $.each(snake.pieces, function(indexPiece,piece){
    piece.pos.x += piece.speed.x;
    piece.pos.y += piece.speed.y;

    if(indexPiece != 0){
      $.each(snake.corners,function(indexCorner,corner){
        if(piece.x == corner.x && piece.y == corner.y){
          piece.speed = corner.speed;
        }
      });
    }
  });

  var head = snake.pieces[0];

  if (upDown && head.speed.y != 1){
    head.speed = {x: 0, y:-1 };
	snake.corners.push({pos:head.pos,speed:head.speed});
  }
  if (downDown && head.speed.y != -1){
	head.speed = {x: 0, y:1 };
	snake.corners.push({pos:head.pos,speed:head.speed});
  }
    
  if (leftDown && head.speed.x != 1){
	head.speed = {x: -1, y:0 };
	snake.corners.push({pos:head.pos,speed:head.speed});
  }
    
  if (rightDown && head.speed.x != -1){
	head.speed = {x: 1, y:0 };
	snake.corners.push({pos:head.pos,speed:head.speed});
  }
    
  if(head.pos.x >= canvas_width - snake.width || head.pos.x <= 0)
    head.speed.x = 0;
  if(head.pos.y <= 0 || head.pos.y >= canvas_height - snake.width)
    head.speed.y = 0;
  
  draw();
}

$(document).ready(function(){
  //hacer que se vea lindo usando
  // una paleta de colores de koul

  $(document).keydown(function(evt){
    if (evt.keyCode == 39)
      rightDown = true;
    if (evt.keyCode == 37)
      leftDown = true;
    if (evt.keyCode == 38)
      upDown = true;
    if (evt.keyCode == 40)
      downDown = true;
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
  setInterval(update,25)

});
