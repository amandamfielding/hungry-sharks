const Shark = require("./shark");

class Game {
  constructor() {
    this.sharks = [];
    this.canvas = document.getElementById("canvas");
    this.canvas.addEventListener("click", this.click.bind(this), false);
    this.ctx = this.canvas.getContext("2d");
    this.paused = false;
    this.level = 1;
    this.timer = 3;
  }

  setRemainingStart() {
    let result = "Clicks Remaining: ";
    for (var i = 0; i < this.sharks.length; i++) {
      result += '<img id="left-start" src="http://res.cloudinary.com/dbsxgncvx/image/upload/v1479404182/1211811462_zscfzj.png" />';
    }
    document.getElementById("remaining-clicks").innerHTML = result;
  }

  click(e) {
    for (let i = 0; i < this.sharks.length; i++) {
      let shark = this.sharks[i];
      shark.registerClick(e.pageX - e.path[0].offsetLeft,e.pageY - e.path[0].offsetTop);
    }
    if (this.sharks.every(this.wonRound)) {
      alert("You win! Click OK to start the next level.");
      this.sharks.forEach((shark) => shark.reset());
      this.addSharks(1);
      this.remainingClicks = this.sharks.length;
      this.setRemainingStart();
      this.level += 1;
      this.levelCount();
    }
  }

  wonRound(shark) {
    if (shark.isFed === undefined || shark.isFed === false) {
        return false;
      } else {
        return true;
      }
  }

  addSharks(num) {
    for (let i = 0; i < num; i++) {
      let radius = (45 + Math.random() * 95);
      let randomX = (-200 + Math.random() * 1000);
      let randomY = (-200 + Math.random() * 600);
      let speed = 0.3 + Math.random() * 2;

      if (randomX > 850) {
        randomX -= ((randomX - radius - 50) - (850));
      } else if (randomX < 50) {
        randomX += ((70 + (2 * radius)) - randomX);
      }

      if (randomY > 350) {
        randomY -= (radius*2);
      } else if (randomY < 50) {
        randomY += ((50 + radius + 50) - randomY);
      }

      let shark = new Shark(radius, speed, 40,randomX, randomY, this);
      this.sharks.push(shark);
      this.remainingClicks = this.sharks.length;
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    const grd = ctx.createLinearGradient(0,450,0,0);
    grd.addColorStop(0,"#3595e0");
    grd.addColorStop(1,"#b9f2f4");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    for (let i = 0; i < this.sharks.length; i++) {
      let myShark = this.sharks[i];
      myShark.update(ctx);
    }
  }

  clickCount() {
    this.remainingClicks -= 1;
    let result = "Clicks Remaining: ";
    for (var i = 0; i < this.remainingClicks; i++) {
      result += '<img id="left" src="http://res.cloudinary.com/dbsxgncvx/image/upload/v1479404182/1211811462_zscfzj.png" />';
    }
    document.getElementById("remaining-clicks").innerHTML = result;
  }

  levelCount() {
    document.getElementById("level").innerHTML = "Level " + this.level;
  }

  timerTick() {
    this.timer = 3;
    setInterval(() => {
      if (this.timer >= 0) {
        document.getElementById("timer").innerHTML = this.timer;
        this.timer -= 1;
      }
    }
    ,1000);
  }
}

Game.DIM_X = 900;
Game.DIM_Y = 400;

module.exports = Game;
