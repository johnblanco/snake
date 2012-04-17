var Map = function($obj, width, height) {
  this.width = $obj.attr("width");
  this.height = $obj.attr("height");
  this.ctx = $('#canvas')[0].getContext("2d");
};

Map.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
};

Map.prototype.draw = function() {
  this.clear();

  this.ctx.fillStyle = "rgb(200,0,0)";
  this.ctx.fillRect(0, 0, this.width, 2);
  this.ctx.fillRect(0, 0, 2, this.height);
  this.ctx.fillRect(0, this.height - 2, this.width, 2);
  this.ctx.fillRect(this.width - 2, 0, 2, this.height);
};
