var moveable = function(directions) {

  var moving = false, _dir = "", obj = {
    startMoving: function(to) {
      if (!moving) {
        this.trigger("startMoving", this);
        moving = true;
      }
    },
    endMoving: function(to) {
      if (moving) {
        _dir = "";
        this.trigger("endMoving", this);
        moving = false;
      }
    },
    isMoving: function() {
      return moving;
    }
  };
  _.extend(obj, Backbone.Events);

  _.each(directions, function(direction) {
    var camelDir = direction;
    camelDir = direction[0].toUpperCase() + direction.slice(1);
    obj["go" + camelDir] = function() {
      if (_dir != direction) {
        _dir = direction;
        this.startMoving();
        this.trigger("directionChange", this);
      }
    };
    obj["endGoing" + camelDir] = function() {
      if (_dir == direction) {
        _dir = "";
        this.endMoving();
      }
    };
    obj["going" + camelDir] = function() {
      return this.isMoving() && _dir == direction;
    };
  });

  return obj;
};

var horizontalDirection = function() { return moveable(["left", "right"]); };
var verticalDirecction = function() { return moveable(["up", "down"]); }

var Control = function() {
  this.vDir = verticalDirecction();
  this.hDir = horizontalDirection();
  this.reset();
};

Control.prototype.reset = function() {
  this.hDir.endMoving();
  this.vDir.endMoving();
};

var keyboardController = function() {
  var obj = new Control();

  obj.keyDown = function(keyCode) {
    this.reset();

    if (keyCode == 39) {
      this.hDir.goRight();
    } else if (keyCode == 37) {
      this.hDir.goLeft();
    }
    if (keyCode == 38) {
      this.vDir.goUp();
    } else if (keyCode == 40) {
      this.vDir.goDown();
    }
  };

  obj.keyUp = function(keyCode) {
    if (keyCode == 39) {
      this.hDir.endGoingRight();
    } else if (keyCode == 37) {
      this.hDir.endGoingLeft();
    }
    if (keyCode == 38) {
      this.vDir.endGoingUp();
    } else  if (keyCode == 40) {
      this.vDir.endGoingDown();
    }
  };
  return obj;
};
