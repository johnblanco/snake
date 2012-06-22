//jquery cdn: http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//jquery local: jquery-1.7.2.js

var ctx;
var canvas_height;
var canvas_width;
var debugDiv;
var snake = {
  width: 5,
  pieces: [
    {pos: {x:50, y:50}, speed: {x:5, y:0}},
    {pos: {x:45, y:50}, speed: {x:5, y:0}},
    {pos: {x:40, y:50}, speed: {x:5, y:0}},
    {pos: {x:35, y:50}, speed: {x:5, y:0}},
    {pos: {x:30, y:50}, speed: {x:5, y:0}},
    {pos: {x:25, y:50}, speed: {x:5, y:0}},
    {pos: {x:20, y:50}, speed: {x:5, y:0}},
    {pos: {x:15, y:50}, speed: {x:5, y:0}}
  ],
  corners: []
};
var maps = [
  {foods: [
    {x:165, y: 205},
    {x:205, y: 105}
  ]}
];

var rightDown = false;
var leftDown = false;
var upDown = false;
var downDown = false;
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
  drawSnake();
  debugInfo();
}

function drawSnake(){
//  draw snake
  $.each(snake.pieces,function(index, value){
    ctx.fillRect(value.pos.x, value.pos.y, snake.width, snake.width);
  });
}

function checkCollisions(head) {
  if (head.pos.x >= canvas_width - snake.width || head.pos.x <= 0)
    head.speed.x = 0;
  if (head.pos.y <= 0 || head.pos.y >= canvas_height - snake.width)
    head.speed.y = 0;
}
function checkInputs(head) {
  if (upDown && head.speed.y == 0) {
    head.speed = {x: 0, y:-5 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }
  if (downDown && head.speed.y == 0) {
    head.speed = {x: 0, y:5 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }

  if (leftDown && head.speed.x == 0) {
    head.speed = {x: -5, y:0 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }

  if (rightDown && head.speed.x == 0) {
    head.speed = {x: 5, y:0 };
    snake.corners.push({pos: {x:head.pos.x, y:head.pos.y},speed: {x: head.speed.x, y: head.speed.y}});
  }
}
function update(){
  var head = snake.pieces[0];

  checkInputs(head);
  checkCollisions(head);

  var deleteLastCorner = false;

  $.each(snake.pieces, function(indexPiece,piece){
    if(indexPiece != 0){
      $.each(snake.corners,function(indexCorner,corner){
        if(piece.pos.x == corner.pos.x && piece.pos.y == corner.pos.y){

          piece.speed.x = corner.speed.x;
          piece.speed.y = corner.speed.y;

          if(indexPiece == snake.pieces.length-1){
            //es la ultima pieza que doblo en la esquina
            //esta esquina no sirve mas
            deleteLastCorner = true;
          }
        }
      });
    }

    piece.pos.x += piece.speed.x;
    piece.pos.y += piece.speed.y;
    if(deleteLastCorner)
      snake.corners.shift();
  });


  draw();
}

$(document).ready(function(){
  debugDiv = $("#debug");

  $(document).keydown(function(evt){
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
  setInterval(update, 90);

});
