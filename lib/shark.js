class Shark {
  constructor(radius, speed, width, xPos, yPos) {
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
    this.currentX = null;
    this.currentY = null;
    this.ctx = null;
  }

  update(ctx) {

    this.currentX = this.xPos + Math.cos(this.counter / 100) * this.radius;
    this.currentY = this.yPos + Math.sin(this.counter / 100) * this.radius;

    if (this.startPos === null) {
      this.startPos = [Math.round(this.currentX),Math.round(this.currentY)];
    }
    if (Math.round(this.currentX)  === (this.startPos[0] - (2*this.startPos[1]))) {
      this.hasPassedMid = true;
    }

    if (
      (
      Math.round(this.startPos[0]) === Math.round(this.currentX) && Math.round(this.startPos[1]) === Math.round(this.currentY)
      )
      && this.hasPassedMid === true
      )
      {
      console.log("i'm here!");
      this.counter += this.sign * this.speed;
      ctx.beginPath();
      ctx.arc(this.currentX,
        this.currentY,
        this.width,
        Math.PI * 2,
        0,
        false);
      ctx.closePath();
      ctx.fillStyle = 'rgb(185, 211, 238)';
      ctx.fill();
    } else {
    this.counter += this.sign * this.speed;
    ctx.beginPath();
    ctx.arc(this.currentX,
      this.currentY,
      this.width,
      0,
      Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'rgb(185, 211, 238)';
    ctx.fill();
    if (this.isFed) {
      ctx.shadowColor = "green";
      ctx.shadowOffsetX = "10";
      ctx.shadowYOffsetY = "20";
    }
    }
  }

  registerClick(x,y) {
    console.log(Math.round(this.currentX),Math.round(this.currentY));
    console.log(x,y);
    let foundFirst;
    if (foundFirst !== true) {
      if ( (x >= (Math.round(this.currentX)-40) && x <= (Math.round(this.currentX)+40)) &&
      (y >= (Math.round(this.currentY)-40) && y <= (Math.round(this.currentY+40))) ) {
        this.feed();
        foundFirst = true;
        console.log(this);
      }
    }
  }

  feed() {
    this.isFed = true;
  }

}

module.exports = Shark;
