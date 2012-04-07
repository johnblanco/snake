var ctx;
var canvas_height;
var canvas_width;
var snake = {
  width: 5,
  pos: {x: 50, y:50},
  pieces: [{x:49, y:50},{x:48, y:50},{x:47, y:50},{x:46, y:50},{x:45, y:50}],
  speed: {x:1, y:0}
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
  ctx.fillRect(snake.pos.x, snake.pos.y, snake.width, snake.width);
  $.each(snake.pieces,function(index, value){
    ctx.fillRect(value.x, value.y, snake.width, snake.width);
  });
}

function checkCollisions() {
  if (upDown && snake.speed.y != 1)
    snake.speed = {x: 0, y:-1 };
  if (downDown && snake.speed.y != -1)
    snake.speed = {x: 0, y:1 };
  if (leftDown && snake.speed.x != 1)
    snake.speed = {x: -1, y:0 };
  if (rightDown && snake.speed.x != -1)
    snake.speed = {x: 1, y:0 };
}
function updateSnake() {
  snake.pos.x += snake.speed.x;
  snake.pos.y += snake.speed.y;

  $.each(snake.pieces, function(index,value){
    value.x += snake.speed.x;
    value.y += snake.speed.y;
  });

  checkCollisions();
}
function update(){

  updateSnake();
  if(snake.pos.x >= canvas_width - snake.width || snake.pos.x <= 0)
    snake.speed.x = 0;
  if(snake.pos.y <= 0 || snake.pos.y >= canvas_height - snake.width)
    snake.speed.y = 0;
  
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
