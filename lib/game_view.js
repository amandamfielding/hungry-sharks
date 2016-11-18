class GameView {
  constructor(game,ctx) {
    this.game = game;
    this.ctx = ctx;
    this.game.addSharks(3);
    this.game.setRemainingStart();
    this.game.levelCount();
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
      this.game.paused = true;
    }
  }
}

module.exports = GameView;
