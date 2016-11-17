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
	  }
	
	  click(e) {
	    for (let i = 0; i < this.sharks.length; i++) {
	      let shark = this.sharks[i];
	      shark.registerClick(e.pageX - e.path[0].offsetLeft,e.pageY - e.path[0].offsetTop);
	    }
	    if (this.sharks.every(this.wonRound)) {
	      alert("You win! Click OK to start the next level.");
	      this.sharks.forEach((shark) => shark.reset());
	      this.addSharks(1);
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
	      let radius = (45 + Math.random() * 95);
	      let randomX = (-200 + Math.random() * 1000);
	      let randomY = (-200 + Math.random() * 600);
	      let speed = 0.3 + Math.random() * 2;
	
	
	      if (randomX > 850) {
	        randomX -= ((randomX - radius - 50) - (850));
	      } else if (randomX < 50) {
	        randomX += ((70 + (2 * radius)) - randomX);
	      }
	
	      if (randomY > 350) {
	        randomY -= (radius*2);
	      } else if (randomY < 50) {
	        randomY += ((50 + radius + 50) - randomY);
	      }
	
	      let shark = new Shark(radius, speed, 40,randomX, randomY,this);
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
	    this.ctx = null;
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
	      ctx.fill();
	    } else {
	      this.counter += this.sign * this.speed;
	      ctx.beginPath();
	      if (this.game.paused === true) {
	        ctx.arc(this.xPos,
	        this.yPos,
	        this.width,
	        0,
	        Math.PI * 2);
	      } else {
	        ctx.arc(this.currentX,
	        this.currentY,
	        this.width,
	        0,
	        Math.PI * 2);
	      }
	    ctx.closePath();
	    ctx.fillStyle = 'rgb(185, 211, 238)';
	    ctx.fill();
	    if (this.isFed) {
	      ctx.shadowColor = "green";
	      ctx.shadowOffsetX = "10";
	      ctx.shadowYOffsetY = "20";
	      ctx.shadowBlur = "20";
	    }
	    }
	  }
	
	  registerClick(x,y) {
	    let foundFirst;
	    if (foundFirst !== true) {
	      if ( (x >= (Math.round(this.currentX)-40) && x <= (Math.round(this.currentX)+40)) &&
	      (y >= (Math.round(this.currentY)-40) && y <= (Math.round(this.currentY+40))) ) {
	        this.feed();
	        foundFirst = true;
	        console.log(this);
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
	      this.game.paused = true;
	    }
	  }
	}
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map