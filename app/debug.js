var Debug = function($container) {
  this.$container = $container;
};
Debug.prototype.print = function(string) {
  this.$container.html(this.$container.html() + string + "<br />");
};
Debug.prototype.showInfo = function(snake) {
  debug.print("---PIECES---");

  $.each(snake.pieces,function(index,value){
    debug.print(value.pos.x + " , " + value.pos.y);
  });

  debug.print("---SPEED---");
  debug.print(snake.pieces[0].speed.x + " , " + snake.pieces[0].speed.y);

  debug.print("---CORNERS---");
  $.each(snake.corners,function(index,value){
    debug.print(value.pos.x + " , " + value.pos.y + " " +
      value.speed.x + " , " + value.speed.y);
  });
};

