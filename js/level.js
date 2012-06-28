var Level = function(obstacles, foods){
  this.foods = foods;
  this.currentFoodIndex = 0;
  this.foodDiameter = 6;
  this.levelCleared = false;
  this.obstacles = obstacles;

  this.getCurrentFood = function(){
    return this.foods[this.currentFoodIndex];
  }

  this.moveNextFood = function(){
    this.currentFoodIndex ++;
    if(this.currentFoodIndex >= this.foods.length){
      this.levelCleared = true;
    }
  }

  this.draw = function(ctx, canvas_width, canvas_height){

    ctx.fillRect(0, 0, canvas_width, canvas_height);
    ctx.clearRect(2, 2, canvas_width - 4, canvas_height - 4);

    //dibujo comida
    if(this.getCurrentFood() != null){
      ctx.beginPath();
      ctx.arc(this.getCurrentFood().x, this.getCurrentFood().y, this.foodDiameter /2, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fill();
    }

    //dibujo obstaculos
    $.each(this.obstacles, function(index, obstacle){
      obstacle.draw(ctx);
    });


  }
}
