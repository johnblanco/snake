var Snake = function(){
  this.width = 5;
  this.pieces = [];
  this.corners = [];

  var posX = 50;
  for(var i=0; i<=8 ; i++){
    this.pieces[i] = new Piece(new Vector(posX, 50), new Vector(5,0));
    posX -= 5;
  }
};

var Piece = function(posVector, speedVector){
  this.pos = posVector;
  this.speed = speedVector;
};