const Util = require("./util");
const MovingObject = require("./moving_object");
const createjs = require('preload-js');


class Shark {
  constructor() {
    this.isFed = false;
  }

  draw(ctx) {

  }

  feed() {
    this.isFed = true;
  }
}

module.exports = Shark;
