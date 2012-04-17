
var Control = function() {
  this.reset();
};

Control.prototype.reset = function() {
  this.right = false;
  this.left = false;
  this.up = false;
  this.down = false;
};

Control.prototype.keyDown = function(keyCode) {
  this.reset();

  if (keyCode == 39) {
    this.right = true;
  } else if (keyCode == 37) {
    this.left = true;
  }
  if (keyCode == 38) {
    this.up = true;
  } else if (keyCode == 40) {
    this.down = true;
  }
};

Control.prototype.keyUp = function(keyCode) {
  if (keyCode == 39) {
    this.right = false;
  } else if (keyCode == 37) {
    this.left = false;
  }
  if (keyCode == 38) {
    this.up = false;
  } else  if (keyCode == 40) {
    this.down = false;
  }
};
