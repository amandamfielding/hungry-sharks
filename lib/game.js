const Shark = require("./shark");

class Game {
  constructor() {
    this.sharks = [];
    this.canvas = document.getElementById("canvas");
    this.canvas.addEventListener("click", this.click.bind(this), false);
  }

  click(e) {
    for (let i = 0; i < this.sharks.length; i++) {
      let shark = this.sharks[i];
      shark.registerClick(e.x,e.y);
    }
    if (this.sharks.every(this.wonRound)) {
      alert("you win!");
      this.addSharks(1);
      this.sharks.forEach((shark) => {
        shark.isFed = false;
      });
    }
  }

  wonRound(shark) {
    if (shark.isFed === undefined) {
        return false;
      } else {
        return true;
      }
  }

  addSharks(num) {
    for (let i = 0; i < num; i++) {
      let radius = (30 + Math.random() * 100);
      let randomX = (-200 + Math.random() * 1000);
      let randomY = (-200 + Math.random() * 650);
      let speed = 0.3 + Math.random() * 2.3;


      if (randomX > 850) {
        randomX -= ((randomX - radius - 50) - (850));
      } else if (randomX < 100) {
        randomX += ((100 + radius + 50) - randomX);
      }

      if (randomY > 300) {
        randomY -= (radius*2);
      } else if (randomY < 100) {
        randomY += ((100 + radius + 50) - randomY);
      }

      let shark = new Shark(radius, speed, 40,randomX, randomY);
      this.sharks.push(shark);
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


}


Game.DIM_X = 900;
Game.DIM_Y = 400;

module.exports = Game;
