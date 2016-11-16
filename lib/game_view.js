class GameView {
  constructor(game,ctx) {
    this.game = game;
    this.ctx = ctx;
    this.game.addSharks(4);
  }

  start() {
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
