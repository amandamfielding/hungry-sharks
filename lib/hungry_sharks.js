const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game,ctx);
  gameView.start();
  let soundHello = document.getElementById("soundHello");
  if (game.muted === false) {
    soundHello.play();
  }

  let modal = document.getElementById('myModal');
  let about = document.getElementById('about');
  about.onclick = () => {
    modal.style.display = "block";};
  let span = document.getElementById("close");
  span.onclick = (e) => {
    e.stopPropagation();
    modal.style.display = "none";};
  let pauseModal = document.getElementById('pauseModal');
  let pause = document.getElementById('pause');
  pause.onclick = () => {
    gameView.playPause();
    pauseModal.style.display = "block";};
  let play = document.getElementById("play");
  play.onclick = (e) => {
    gameView.playPause();
    e.stopPropagation();
    pauseModal.style.display = "none";};
  let mute = document.getElementById('mute');
  mute.onclick = () => {
    game.mute();
  };
});
