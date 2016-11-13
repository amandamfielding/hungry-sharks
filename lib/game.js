const Shark = require("./shark");
const Util = require("./util");

class Game {
  constructor() {
    this.sharks = [];
    this.addShark();
  }

  addShark() {
    const shark = new Shark({
      pos: this.randomPosition(),
      game: this
    });
    this.sharks.push(shark);
    return shark;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    const grd = ctx.createLinearGradient(0,450,0,0);
    grd.addColorStop(0,"#3595e0");
    grd.addColorStop(1,"#b9f2f4");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.sharks.forEach((shark) => {
      shark.draw(ctx);
    });
  }

  step(delta) {
    // this.sharks.forEach((shark) => {
    //   shark.move(delta);
    // });
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }
}


Game.DIM_X = 900;
Game.DIM_Y = 400;

module.exports = Game;
