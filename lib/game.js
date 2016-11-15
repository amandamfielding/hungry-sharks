const Shark = require("./shark");
const Util = require("./util");

class Game {
  constructor() {
    this.sharks = [];
  }

  addSharks() {
    for (let i = 0; i < 1; i++) {
      let radius = (-100 + Math.random() * 700);
      let randomX = (-200 + Math.random() * 700);
      let randomY = (-200 + Math.random() * 700);
      let speed = 0.4 + Math.random() * .8;

      let shark = new Shark(70, 0.5, 40, randomX, randomY,[randomX,randomY]);
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
