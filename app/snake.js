var Snake = function(length) {
  this.width = 1;
  this.corners = [];
  this.pieces = [];
  this.snakeLength = length;
};

Snake.prototype.assignMap = function(map) {
  this.ctx = map;
};

Snake.prototype.make = function() {
  while(this.snakeLength > 0) {
    this.pieces.push({pos: {x: this.snakeLength, y: 50}, speed: {x: 1, y: 0}});
    this.snakeLength--;
  }
};

Snake.prototype.draw = function() {
  var snake = this;
  _.each(this.pieces, function(value) {
    snake.ctx.fillRect(value.pos.x, value.pos.y, snake.width, snake.width);
  });
};
