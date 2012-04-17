var Snake = function(length, control) {
  this.width = 1;
  this.corners = [];
  this.pieces = [];
  this.snakeLength = length;
  var snake = this;
  
  control.hDir.bind("directionChange", function() {
    var head = snake.pieces[0];
    if (this.goingLeft() && head.speed.x == 0) {
      head.speed = {x: -1, y: 0 };
      snake.corners.push({pos: {x: head.pos.x, y: head.pos.y}, speed: {x: head.speed.x, y: head.speed.y}});
    }

    if (this.goingRight() && head.speed.x == 0) {
      head.speed = {x: 1, y: 0 };
      snake.corners.push({pos: {x: head.pos.x, y: head.pos.y}, speed: {x: head.speed.x, y: head.speed.y}});
    }
  });
  control.vDir.bind("directionChange", function() {
    var head = snake.pieces[0];
    if (this.goingUp() && head.speed.y == 0) {
      head.speed = {x: 0, y: -1 };
      snake.corners.push({pos: {x: head.pos.x, y: head.pos.y}, speed: {x: head.speed.x, y: head.speed.y}});
    }
    if (this.goingDown() && head.speed.y == 0) {
      head.speed = {x: 0, y: 1 };
      snake.corners.push({pos: {x: head.pos.x, y: head.pos.y}, speed: {x: head.speed.x, y: head.speed.y}});
    }
  });
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

