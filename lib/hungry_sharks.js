const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game,ctx);

  let modal = document.getElementById('myModal');
  modal.style.display = "block";
  gameView.start();
  let soundHello = document.getElementById("soundHello");
  if (game.muted === false) {
    soundHello.play();
  }
  let about = document.getElementById('about');
  about.onclick = () => {
    modal.style.display = "block";};
  let play = document.getElementById("play");
  play.onclick = (e) => {
    e.stopPropagation();
    modal.style.display = "none";};
  let pauseModal = document.getElementById('pauseModal');
  let pause = document.getElementById('pause');
  pause.onclick = () => {
    gameView.playPause();
    pauseModal.style.display = "block";};
  let backtogame = document.getElementById("backtogame");
  backtogame.onclick = (e) => {
    gameView.playPause();
    e.stopPropagation();
    pauseModal.style.display = "none";};
  let mute = document.getElementById('mute');
  mute.onclick = () => {
    game.mute();
  };
});
