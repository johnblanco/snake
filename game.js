var ctx;
var x = 100;
var y = 100;
var rightDown = false;
var leftDown = false;
var upDown = false;
var downDown = false;

function drawMap() {
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(0, 0, 800, 2);
  ctx.fillRect(0, 0, 2, 600);
  ctx.fillRect(0, 598, 800, 2);
  ctx.fillRect(798, 0, 2, 600);
}

function clear() {
  ctx.clearRect(0, 0, 800, 600);
}

function draw(){
  clear();
  drawMap();

  ctx.fillRect(x,y,5,5);
}

function update(){
  if(leftDown)
    x -= 1;
  if(rightDown)
    x+=1;
  if(upDown)
    y-=1;
  if(downDown)
    y+=1;
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
  setInterval(update,10)
  
  
});
