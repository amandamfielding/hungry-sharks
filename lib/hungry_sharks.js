const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  window.game = game;
  const gameView = new GameView(game,ctx);
  window.gameView = gameView;
  gameView.start();
  let modal = document.getElementById('myModal');
  let about = document.getElementById('about');
  about.onclick = () => {
    modal.style.display = "block";};
  let span = document.getElementById("close");
  span.onclick = () => {
    console.log("here");
    modal.style.display = "none";};
});
