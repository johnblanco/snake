var Snake = function() {
  this.width = 5;
  this.framesToMove = 1; //si lo cambias, actualizalo tambien en linea 26
  this.collisioned = false;
  this.pieces = [];
  this.corners = [];

  var posX = 50;
  for (var i = 0; i <= 8; i++) {
    this.pieces[i] = new Piece(new Vector(posX, 49), new Vector(5, 0));
    posX -= 5;
  }

  this.getHead = function() {
    return this.pieces[0];
  };

  this.update = function(canvas_width, canvas_height, level, keyboardState) {
    var currentLevel = level;

    this.checkCollisions(canvas_width, canvas_height, currentLevel);
    this.checkInputs(keyboardState);

    if(this.framesToMove === 0){
      this.updatePiecesPosition();
      this.framesToMove = 1;
    }
    else{
      this.framesToMove -- ;
    }
  };

  this.checkCollisions = function(canvas_width, canvas_height, level) {
    var head = this.getHead();
    var collisionOcurred = false;
    var self = this;

    //choca los bordes de la pantalla?
    if (head.pos.x >= canvas_width - this.width || head.pos.x <= 0 || head.pos.y <= 0 || head.pos.y >= canvas_height - this.width)
      self.collisioned = true;

    //se choca contra si misma?
    $.each(this.pieces, function(indexPiece, piece) {
      if(piece.pos.equals(head.pos) && (indexPiece !== 0)){
        self.collisioned = true;
      }
    });

    //choca obstaculos?
    var snakeWidth = this.width;
    $.each(level.obstacles, function(index, obstacle){
      if(rectanglesCollide(head.pos, snakeWidth, snakeWidth, obstacle.position, obstacle.width, obstacle.height)){
        self.collisioned = true;
      }
    });

    console.log('collisioned!');
    //come comida?
    //asumo que la comida es un rectangulo (asi es mas facil :P)
    if(rectanglesCollide(head.pos, this.width, this.width, level.getCurrentFood(), level.foodDiameter, level.foodDiameter)){
      level.moveNextFood();
      this.grow();
    }

  };

  this.checkInputs = function(keyboardState) {
    var head = this.getHead();
    if (keyboardState.upDown && head.speed.y === 0) {
      head.speed = new Vector(0, -5);
      this.corners.push(new Corner(head.pos, head.speed));
    }
    if (keyboardState.downDown && head.speed.y === 0) {
      head.speed = new Vector(0, 5);
      this.corners.push(new Corner(head.pos, head.speed));
    }

    if (keyboardState.leftDown && head.speed.x === 0) {
      head.speed = new Vector(-5, 0);
      this.corners.push(new Corner(head.pos, head.speed));
    }

    if (keyboardState.rightDown && head.speed.x === 0) {
      head.speed = new Vector(5, 0);
      this.corners.push(new Corner(head.pos, head.speed));
    }
  };

  this.updatePiecesPosition = function() {
    var deleteLastCorner = false;
    var corners = this.corners;
    var pieces = this.pieces;

    $.each(pieces, function(indexPiece, piece) {
      if (indexPiece !== 0) {
        $.each(corners, function(indexCorner, corner) {
          if (piece.pos.x == corner.pos.x && piece.pos.y == corner.pos.y) {

            piece.speed.x = corner.speed.x;
            piece.speed.y = corner.speed.y;

            if (indexPiece == pieces.length - 1) {
              //es la ultima pieza que doblo en la esquina
              //esta esquina no sirve mas
              deleteLastCorner = true;
            }
          }
        });
      }

      piece.pos.x += piece.speed.x;
      piece.pos.y += piece.speed.y;

      if(deleteLastCorner){
        corners.shift();
      }
    });
  };

  this.draw = function(context) {
    context.fillStyle = "rgb(200,0,0)";
    var width= this.width;
    $.each(this.pieces, function(index, value) {
      context.fillRect(value.pos.x, value.pos.y, width, width);
    });
  };

  this.grow = function(){
    var lastIndex = this.pieces.length -1;
    var lastPiece = this.pieces[lastIndex];

    //si la ultima era 10,10 5,0
    //la proxima sera 5,10 5,0
    this.pieces[lastIndex + 1] = new Piece(new Vector(lastPiece.pos.x - lastPiece.speed.x, lastPiece.pos.y - lastPiece.speed.y),
                                  new Vector(lastPiece.speed.x, lastPiece.speed.y));

    this.pieces[lastIndex + 2] = new Piece(new Vector(lastPiece.pos.x - 2* lastPiece.speed.x, lastPiece.pos.y - 2* lastPiece.speed.y),
                                  new Vector(lastPiece.speed.x, lastPiece.speed.y));

  };

};

var Piece = function(posVector, speedVector) {
  this.pos = posVector;
  this.speed = speedVector;
};

var Corner = function(posVector, speedVector) {
  this.pos = new Vector(posVector.x,posVector.y);
  this.speed = new Vector(speedVector.x, speedVector.y);
};


