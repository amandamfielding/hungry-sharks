const Util = require("./util");

class Shark {
  constructor(radius, speed, width, xPos, yPos, begPos) {
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.counter = 0;
    this.startPos = null;
    this.hasPassedMid = false;

    let signHelper = Math.floor(Math.random() * 2);

     if (signHelper === 1) {
       this.sign = -1;
     } else {
       this.sign = 1;
     }
  }

  update(ctx) {
    let currentX = this.xPos + Math.cos(this.counter / 100) * this.radius;
    let currentY = this.yPos + Math.sin(this.counter / 100) * this.radius;

    if (this.startPos === null) {
      this.startPos = [Math.round(currentX),Math.round(currentY)];
    }
    if (Math.round(currentX)  === (this.startPos[0] - (2*this.startPos[1]))) {
      this.hasPassedMid = true;
    }

    if (
      (
      Math.round(this.startPos[0]) === Math.round(currentX) && Math.round(this.startPos[1]) === Math.round(currentY)
      )
      && this.hasPassedMid === true
      )
      {
      console.log("i'm here!");
      this.counter += this.sign * this.speed;
      ctx.beginPath();
      ctx.arc(currentX,
        currentY,
        this.width,
        Math.PI * 2,
        0,
        false);
        // console.log(currentX);
      ctx.closePath();
      // console.log(this.begPos);

      ctx.fillStyle = 'rgb(185, 211, 238)';
    //   ctx.fill();
    } else {
    this.counter += this.sign * this.speed;
    ctx.beginPath();
    ctx.arc(currentX,
      currentY,
      this.width,
      0,
      Math.PI * 2,
      false);
      // console.log(currentX);
    ctx.closePath();
    // console.log(this.begPos);

    ctx.fillStyle = 'rgb(185, 211, 238)';
    ctx.fill();
    }
  }


  feed() {
    this.isFed = true;
  }

}

module.exports = Shark;
