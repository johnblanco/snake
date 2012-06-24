var Snake = function() {
  this.width = 5;
  this.pieces = [];
  this.corners = [];

  var posX = 50;
  for (var i = 0; i <= 8; i++) {
    this.pieces[i] = new Piece(new Vector(posX, 50), new Vector(5, 0));
    posX -= 5;
  }

  this.getHead = function() {
    return this.pieces[0];
  };

  this.update = function(canvas_width, canvas_height, keyboardState) {
    this.checkCollisions(canvas_width, canvas_height);
    this.checkInputs(keyboardState);
    this.checkPieces();
  };


  this.checkCollisions = function(canvas_width, canvas_height) {
    var head = this.getHead();
    if (head.pos.x >= canvas_width - this.width || head.pos.x <= 0)
      head.speed.x = 0;
    if (head.pos.y <= 0 || head.pos.y >= canvas_height - this.width)
      head.speed.y = 0;
  };

  this.checkInputs = function(keyboardState) {
    var head = this.getHead();
    if (keyboardState.upDown && head.speed.y == 0) {
      head.speed = new Vector(0, -5);
      this.corners.push(new Corner(head.pos, head.speed));
    }
    if (keyboardState.downDown && head.speed.y == 0) {
      head.speed = new Vector(0, 5);
      this.corners.push(new Corner(head.pos, head.speed));
    }

    if (keyboardState.leftDown && head.speed.x == 0) {
      head.speed = new Vector(-5, 0);
      this.corners.push(new Corner(head.pos, head.speed));
    }

    if (keyboardState.rightDown && head.speed.x == 0) {
      head.speed = new Vector(5, 0);
      this.corners.push(new Corner(head.pos, head.speed));
    }
  };

  this.checkPieces = function() {
    var deleteLastCorner = false;
    var corners = this.corners;

    $.each(this.pieces, function(indexPiece, piece) {
      if (indexPiece != 0) {
        $.each(corners, function(indexCorner, corner) {
          if (piece.pos.x == corner.pos.x && piece.pos.y == corner.pos.y) {

            piece.speed.x = corner.speed.x;
            piece.speed.y = corner.speed.y;

            if (indexPiece == this.pieces.length - 1) {
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
        this.corners.shift();
      }
    });
  };

  this.draw = function(context) {
    $.each(this.pieces, function(index, value) {
      context.fillRect(value.pos.x, value.pos.y, this.width, this.width);
    });
  };

};

var Piece = function(posVector, speedVector) {
  this.pos = posVector;
  this.speed = speedVector;
};

var Corner = function(posVector, speedVector) {
  this.pos = posVector;
  this.speed = speedVector;
};


