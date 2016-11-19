/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(3);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Shark = __webpack_require__(2);
	
	class Game {
	  constructor() {
	    this.sharks = [];
	    this.canvas = document.getElementById("canvas");
	    this.canvas.addEventListener("click", this.click.bind(this), false);
	    this.ctx = this.canvas.getContext("2d");
	    this.paused = false;
	    this.level = 1;
	    this.timer = 0;
	    this.intervalId = null;
	    this.muted = false;
	  }
	
	  mute() {
	    if (this.muted === false) {
	      this.muted = true;
	    } else {
	      this.muted = false;
	    }
	  }
	
	  setRemainingStart() {
	    let result = "Clicks Remaining:  ";
	    for (var i = 0; i < this.sharks.length; i++) {
	      result += '<img id="left-start" src="http://res.cloudinary.com/dbsxgncvx/image/upload/c_scale,h_100,w_100/v1479443933/61dA0iGRdCL_t5tf9m.png" />';
	    }
	    document.getElementById("remaining-clicks").innerHTML = result;
	  }
	
	  click(e) {
	    if (this.timer <= 0) {
	      for (let i = 0; i < this.sharks.length; i++) {
	        let shark = this.sharks[i];
	        shark.registerClick(e.pageX - e.path[0].offsetLeft,e.pageY - e.path[0].offsetTop);
	      }
	    }
	    if (this.sharks.every(this.wonRound)) {
	      let wonModal = document.getElementById('wonModal');
	      wonModal.style.display = "block";
	      let soundWon = document.getElementById("soundWon");
	      if (this.muted === false) {
	        soundWon.play();
	      }
	      let ok = document.getElementById("ok");
	      ok.onclick = (event) => {
	        event.stopPropagation();
	        wonModal.style.display = "none";};
	      this.sharks.forEach((shark) => shark.reset());
	      this.addSharks(1);
	      this.remainingClicks = this.sharks.length;
	      this.setRemainingStart();
	      this.level += 1;
	      this.levelCount();
	    }
	  }
	
	  wonRound(shark) {
	    if (shark.isFed === undefined || shark.isFed === false) {
	        return false;
	      } else {
	        return true;
	      }
	  }
	
	  addSharks(num) {
	    for (let i = 0; i < num; i++) {
	      let radius = (30 + Math.random() * 85);
	      let randomX = (-200 + Math.random() * 1000);
	      let randomY = (-100 + Math.random() * 500);
	      let speed = 0.3 + Math.random() * 2.2;
	
	      if (randomX > 800) {
	        randomX -= (radius * 3);
	      } else if (randomX < 80) {
	        randomX += (radius * 3);
	      } else if (randomX < 0) {
	        randomX = (radius * 3)+ 70;
	      }
	
	      if (randomY > 300) {
	        randomY -= (radius * 3);
	      } else if (randomY < 80) {
	        randomY += (radius * 3);
	      } else if (randomY < 0) {
	        randomY = (radius * 2.5) + 70;
	      }
	
	      let shark = new Shark(radius, speed, 40,randomX, randomY, this);
	      this.sharks.push(shark);
	      this.remainingClicks = this.sharks.length;
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
	    if (this.intervalId && this.timer <= 0) {
	      clearInterval(this.intervalId);
	    }
	  }
	
	  clickCount() {
	    this.remainingClicks -= 1;
	    let result = "Clicks Remaining:  ";
	    for (let i = 0; i < this.remainingClicks; i++) {
	      result += '<img id="left" src="http://res.cloudinary.com/dbsxgncvx/image/upload/c_scale,h_100,w_100/v1479443933/61dA0iGRdCL_t5tf9m.png" />';
	    }
	    document.getElementById("remaining-clicks").innerHTML = result;
	  }
	
	  levelCount() {
	    document.getElementById("level").innerHTML = "Level " + this.level;
	  }
	
	  timerTick() {
	    document.getElementById("timer").innerHTML = this.timer;
	    this.intervalId = setInterval(() => {
	      if (this.timer < 0) { return;}
	      this.timer -= 1;
	      document.getElementById("timer").innerHTML = this.timer;
	    }
	    ,1000);
	  }
	}
	
	Game.DIM_X = 900;
	Game.DIM_Y = 400;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Shark {
	  constructor(radius, speed, width, xPos, yPos, game) {
	    this.radius = radius;
	    this.speed = speed;
	    this.width = width;
	    this.xPos = xPos;
	    this.yPos = yPos;
	    this.game = game;
	    this.counter = 0;
	    this.startPos = null;
	    this.hasPassedMid = false;
	    let signHelper = Math.floor(Math.random() * 2);
	
	     if (signHelper === 1) {
	       this.sign = -1;
	     } else {
	       this.sign = 1;
	     }
	    this.currentX = null;
	    this.currentY = null;
	  }
	
	  update(ctx) {
	
	    this.currentX = this.xPos + Math.cos(this.counter / 100) * this.radius;
	    this.currentY = this.yPos + Math.sin(this.counter / 100) * this.radius;
	
	    if (this.startPos === null) {
	      this.startPos = [Math.round(this.currentX),Math.round(this.currentY)];
	    }
	    if (Math.round(this.currentX)  === (this.startPos[0] - (2*this.startPos[1]))) {
	      this.hasPassedMid = true;
	    }
	
	    if (
	      (
	      Math.round(this.startPos[0]) === Math.round(this.currentX) && Math.round(this.startPos[1]) === Math.round(this.currentY)
	      )
	      && this.hasPassedMid === true
	      )
	      {
	      console.log("i'm here!");
	      this.counter += this.sign * this.speed;
	      ctx.beginPath();
	      ctx.arc(this.currentX,
	        this.currentY,
	        this.width,
	        Math.PI * 2,
	        0,
	        false);
	      ctx.closePath();
	      ctx.fillStyle = 'rgb(185, 211, 238)';
	      ctx.shadowColor = "gray";
	      ctx.shadowBlur = "10";
	      ctx.fill();
	      ctx.save();
	      let face = new Image();
	      face.src = 'img/sharkface80px.png';
	      ctx.drawImage(face,this.currentX-this.width,this.currentY-this.width);
	    } else {
	      this.counter += this.sign * this.speed;
	
	      ctx.beginPath();
	      if (this.game.paused === true) {
	        ctx.arc(this.xPos,
	        this.yPos,
	        this.width,
	        0,
	        Math.PI * 2);
	        ctx.closePath();
	        ctx.fillStyle = 'rgb(185, 211, 238)';
	        ctx.shadowColor = "gray";
	        ctx.shadowBlur = "10";
	        ctx.fill();
	        ctx.save();
	        let face = new Image();
	        face.src = 'img/sharkface80px.png';
	        ctx.drawImage(face,this.xPos-this.width,this.yPos-this.width);
	      } else {
	        ctx.arc(this.currentX,
	        this.currentY,
	        this.width,
	        0,
	        Math.PI * 2);
	        ctx.closePath();
	        ctx.fillStyle = 'rgb(185, 211, 238)';
	        ctx.shadowColor = "gray";
	        ctx.shadowBlur = "10";
	        ctx.fill();
	        ctx.save();
	        let face = new Image();
	        face.src = 'img/sharkface80px.png';
	        ctx.drawImage(face,this.currentX-this.width,this.currentY-this.width);
	      }
	    }
	  }
	
	  registerClick(x,y) {
	    let foundFirst;
	    let soundEfx = document.getElementById("soundEfx");
	    if (foundFirst !== true) {
	      if ( (x >= (Math.round(this.currentX)-40) && x <= (Math.round(this.currentX)+40)) &&
	      (y >= (Math.round(this.currentY)-40) && y <= (Math.round(this.currentY+40))) ) {
	        if (this.isFed === true) {
	          let loseModal = document.getElementById('loseModal');
	          loseModal.style.display = "block";
	          let playAgain = document.getElementById("playAgain");
	          playAgain.onclick = (event) => {
	            event.stopPropagation();
	            loseModal.style.display = "none";};
	          this.game.sharks = [];
	          this.game.addSharks(3);
	          this.game.paused = false;
	          this.game.level = 1;
	          this.game.levelCount();
	          this.game.setRemainingStart();
	        } else {
	          this.feed();
	          if (this.game.muted === false) {
	            soundEfx.play();
	          }
	          this.game.clickCount();
	          foundFirst = false;
	          this.game.timer = 3;
	          this.game.timerTick();
	        }
	      }
	    }
	  }
	
	  feed() {
	    this.isFed = true;
	  }
	
	  reset() {
	    this.isFed = false;
	  }
	
	
	
	}
	
	module.exports = Shark;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map