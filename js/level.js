var Level = function(rectangles, foods){
  this.foods = foods;
  this.currentFood = 0;

  this.draw = function(ctx, canvas_width, canvas_height){

    ctx.fillRect(0, 0, canvas_width, canvas_height);
    ctx.clearRect(2, 2, canvas_width - 4, canvas_height - 4);

    ctx.beginPath();
    ctx.arc(foods[this.currentFood].x, foods[this.currentFood].y, 3, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
}
