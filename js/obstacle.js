var Obstacle = function(position, width, heigth, animation){
  this.position = position;
  this.width = width;
  this.height = heigth;
  this.animation = animation;
  this.animated = (animation!=null);

  this.draw = function(ctx){
    ctx.fillRect(position.x, position.y, this.width, this.height);
  }
};
