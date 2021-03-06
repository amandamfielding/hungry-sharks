const Shark = require("./shark");

class Game {
  constructor() {
    this.sharks = [];
    this.canvas = document.getElementById("canvas");
    this.canvas.addEventListener("click", this.click.bind(this), false);
    this.ctx = this.canvas.getContext("2d");
    this.paused = false;
    this.level = 1;
    this.timer = 0;
    this.intervalId = null;
    this.muted = false;
  }

  mute() {
    if (this.muted === false) {
      this.muted = true;
    } else {
      this.muted = false;
    }
  }

  setRemainingStart() {
    let result = "Clicks Remaining:  ";
    for (var i = 0; i < this.sharks.length; i++) {
      result += '<img id="left-start" src="https://res.cloudinary.com/dbsxgncvx/image/upload/c_scale,h_100,w_100/v1479443933/61dA0iGRdCL_t5tf9m.png" />';
    }
    document.getElementById("remaining-clicks").innerHTML = result;
  }

  click(e) {
    if (this.timer <= 0) {
      for (let i = 0; i < this.sharks.length; i++) {
        let shark = this.sharks[i];
        shark.registerClick(e.pageX - e.path[0].offsetLeft,e.pageY - e.path[0].offsetTop);
      }
    }
    if (this.sharks.every(this.wonRound)) {
      let wonModal = document.getElementById('wonModal');
      wonModal.style.display = "block";
      let soundWon = document.getElementById("soundWon");
      if (this.muted === false) {
        soundWon.play();
      }
      let ok = document.getElementById("ok");
      ok.onclick = (event) => {
        event.stopPropagation();
        wonModal.style.display = "none";};
      this.sharks.forEach((shark) => {
        shark.reset();
        shark.glow = false;
      });
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
      let radius = (30 + Math.random() * 75);
      let randomX = (-200 + Math.random() * 1100);
      let randomY = (-100 + Math.random() * 500);
      let speed = 0.4 + Math.random() * 2;

      if (randomX > 800) {
        randomX -= (radius * 3);
      } else if (randomX < 80) {
        randomX += (radius * 3);
      } else if (randomX < 0) {
        randomX = (radius * 4);
      }

      if (randomY > 300) {
        randomY -= (radius * 3);
      } else if (randomY < 80) {
        randomY += (radius * 3);
      } else if (randomY < 0) {
        randomY = (radius * 2.5) + 60;
      }

      let shark = new Shark(radius, speed, 40,randomX, randomY, this);
      this.sharks.push(shark);
      this.remainingClicks = this.sharks.length;
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    let imageObj = new Image();
    imageObj.src = 'https://res.cloudinary.com/dbsxgncvx/image/upload/v1480906575/54cd0e70e6736e3a4a84790cb621e71c_ywjec1.jpg'
    ctx.drawImage(imageObj, 0,0, Game.DIM_X, Game.DIM_Y);

    for (let i = 0; i < this.sharks.length; i++) {
      let myShark = this.sharks[i];
      myShark.update(ctx);
    }
    if (this.intervalId && this.timer <= 0) {
      clearInterval(this.intervalId);
    }
  }

  clickCount() {
    this.remainingClicks -= 1;
    let result = "Clicks Remaining:  ";
    for (let i = 0; i < this.remainingClicks; i++) {
      result += '<img id="left" src="https://res.cloudinary.com/dbsxgncvx/image/upload/c_scale,h_100,w_100/v1479443933/61dA0iGRdCL_t5tf9m.png" />';
    }
    document.getElementById("remaining-clicks").innerHTML = result;
  }

  levelCount() {
    document.getElementById("level").innerHTML = "Level " + this.level;
  }

  timerTick() {
    let timerDiv = document.getElementById("timer")
    timerDiv.style.color = "red";
    timerDiv.innerHTML = this.timer;
    this.intervalId = setInterval(() => {
      if (this.timer <= 0) {
        return;
      } else {
        this.timer -= 1;
        document.getElementById("timer").innerHTML = this.timer;
        if (this.timer <= 0) {
          document.getElementById("timer").style.color = "green";
          timerDiv.innerHTML = "click!"
        }
      }
    }
    ,1000);
  }
}

Game.DIM_X = 900;
Game.DIM_Y = 400;

module.exports = Game;
