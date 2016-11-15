class GameView {
  constructor(game,ctx) {
    this.game = game;
    this.ctx = ctx;

  }

  start() {
    this.lastTime = 0;
    this.game.addSharks();
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
