class Shark {
  constructor(radius, speed, width, xPos, yPos, game) {
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.game = game;
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
      ctx.shadowColor = "gray";
      ctx.shadowBlur = "10";
      ctx.fill();
      ctx.save();
      let face = new Image();
      face.src = 'sharkface80px.png';
      ctx.drawImage(face,this.currentX-this.width,this.currentY-this.width);
    } else {
      this.counter += this.sign * this.speed;

      ctx.beginPath();
      if (this.game.paused === true) {
        ctx.arc(this.xPos,
        this.yPos,
        this.width,
        0,
        Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'rgb(185, 211, 238)';
        ctx.shadowColor = "gray";
        ctx.shadowBlur = "10";
        ctx.fill();
        ctx.save();
        let face = new Image();
        face.src = 'sharkface80px.png';
        ctx.drawImage(face,this.xPos-this.width,this.yPos-this.width);
      } else {
        ctx.arc(this.currentX,
        this.currentY,
        this.width,
        0,
        Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'rgb(185, 211, 238)';
        ctx.shadowColor = "gray";
        ctx.shadowBlur = "10";
        ctx.fill();
        ctx.save();
        let face = new Image();
        face.src = 'sharkface80px.png';
        ctx.drawImage(face,this.currentX-this.width,this.currentY-this.width);
      }
    }
  }

  registerClick(x,y) {
    let foundFirst;
    let soundEfx = document.getElementById("soundEfx");
    if (foundFirst !== true) {
      if ( (x >= (Math.round(this.currentX)-40) && x <= (Math.round(this.currentX)+40)) &&
      (y >= (Math.round(this.currentY)-40) && y <= (Math.round(this.currentY+40))) ) {
        if (this.isFed === true) {
          let loseModal = document.getElementById('loseModal');
          loseModal.style.display = "block";
          let playAgain = document.getElementById("playAgain");
          playAgain.onclick = (event) => {
            event.stopPropagation();
            loseModal.style.display = "none";};
          this.game.sharks = [];
          this.game.addSharks(3);
          this.game.paused = false;
          this.game.level = 1;
          this.game.levelCount();
          this.game.setRemainingStart();
        } else {
          this.feed();
          if (this.game.muted === false) {
            soundEfx.play();
          }
          this.game.clickCount();
          foundFirst = false;
          this.game.timer = 3;
          this.game.timerTick();
        }
      }
    }
  }

  feed() {
    this.isFed = true;
  }

  reset() {
    this.isFed = false;
  }



}

module.exports = Shark;
