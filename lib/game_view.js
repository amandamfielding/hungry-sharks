class GameView {
  constructor(game,ctx) {
    this.game = game;
    this.ctx = ctx;
    this.game.addSharks(2);
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }

  playPause() {
    if (this.game.paused === true) {
      this.game.paused = false;
    } else {
      console.log("cancelling");
      this.game.paused = true;
    }
  }
}

module.exports = GameView;
