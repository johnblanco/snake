var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.at = function(x, y) {
  return new Point(x, y);
};


var Snake = function(position, length, control) {
  this.width = 1;
  this.corners = [];
  this.pieces = [];
  this.snakeLength = length;
  var snake = this;
  
  while(this.snakeLength > 0) {
    this.pieces.push({pos: {x: position.x + this.snakeLength, y: position.y}, speed: {x: 1, y: 0}});
    this.snakeLength--;
  }

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

Snake.prototype.checkCollisions = function(object) {
  var head = this.pieces[0];
  var collision = false;
  var pixel = this.map.ctx.getImageData(head.pos.x + head.speed.x, head.pos.y + head.speed.y, 1, 1).data; 
  var hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);

  if (this.map.ctx.fillStyle == hex && hex != '#000000') {
    collision = true;
  }

  if (head.pos.x >= this.map.width - this.width || head.pos.x <= 0) {
    head.speed.x = 0;
    collision = true;
  }
  if (head.pos.y <= 0 || head.pos.y >= this.map.height - this.width) {
    head.speed.y = 0;
    collision = true;
  }

  if (collision) {
    this.trigger("collision", object);
  }

  return collision;
};

Snake.prototype.assignMap = function(map) {
  this.map = map;
};

Snake.prototype.draw = function() {
  var snake = this;
  _.each(this.pieces, function(value) {
    snake.map.ctx.fillRect(value.pos.x, value.pos.y, snake.width, snake.width);
  });
};

Snake.prototype.moveForward = function() {
  var snake = this;

  _.each(this.pieces, function(piece, indexPiece) {
    _.each(snake.corners,function(corner) {
      if (piece.pos.x == corner.pos.x && piece.pos.y == corner.pos.y) {
        piece.speed.x = corner.speed.x;
        piece.speed.y = corner.speed.y;

        if (indexPiece == snake.pieces.length - 1) {
          //es la ultima pieza que doblo en la esquina
          //esta esquina no sirve mas
          //snake.corners.shift();

          //BUG: cuando la vibora tiene varias esquinas para hacer
          //la ultima pieza se va quedando atras
        }
      }
    });
    piece.pos.x += piece.speed.x;
    piece.pos.y += piece.speed.y;
  });

  this.draw();
};

_.extend(Snake.prototype, Backbone.Events);
