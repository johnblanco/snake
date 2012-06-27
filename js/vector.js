var Vector = function(x, y){
  this.x = x;
  this.y = y;

  this.equals = function(other){
    return this.x == other.x && this.y == other.y;
  }
};