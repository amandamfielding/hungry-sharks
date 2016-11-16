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
	const GameView = __webpack_require__(4);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementById("canvas");
	  canvas.width = Game.DIM_X;
	  canvas.height = Game.DIM_Y;
	
	  const ctx = canvas.getContext("2d");
	  const game = new Game();
	  new GameView(game,ctx).start();
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
	  }
	
	  click(e) {
	    for (let i = 0; i < this.sharks.length; i++) {
	      let shark = this.sharks[i];
	      shark.registerClick(e.x,e.y);
	    }
	    if (this.sharks.every(this.wonRound)) {
	      alert("you win!");
	      this.addSharks(1);
	      this.sharks.forEach((shark) => {
	        shark.isFed = false;
	      });
	    }
	  }
	
	  wonRound(shark) {
	    if (shark.isFed === undefined) {
	        return false;
	      } else {
	        return true;
	      }
	  }
	
	  addSharks(num) {
	    for (let i = 0; i < num; i++) {
	      let radius = (30 + Math.random() * 100);
	      let randomX = (-200 + Math.random() * 1000);
	      let randomY = (-200 + Math.random() * 650);
	      let speed = 0.3 + Math.random() * 2.3;
	
	
	      if (randomX > 850) {
	        randomX -= ((randomX - radius - 50) - (850));
	      } else if (randomX < 100) {
	        randomX += ((100 + radius + 50) - randomX);
	      }
	
	      if (randomY > 300) {
	        randomY -= (radius*2);
	      } else if (randomY < 100) {
	        randomY += ((100 + radius + 50) - randomY);
	      }
	
	      let shark = new Shark(radius, speed, 40,randomX, randomY);
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
	  constructor(radius, speed, width, xPos, yPos) {
	    this.radius = radius;
	    this.speed = speed;
	    this.width = width;
	    this.xPos = xPos;
	    this.yPos = yPos;
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
	    ctx.arc(this.currentX,
	      this.currentY,
	      this.width,
	      0,
	      Math.PI * 2);
	    ctx.closePath();
	    ctx.fillStyle = 'rgb(185, 211, 238)';
	    ctx.fill();
	    if (this.isFed) {
	      ctx.shadowColor = "green";
	      ctx.shadowOffsetX = "10";
	      ctx.shadowYOffsetY = "20";
	    }
	    }
	  }
	
	  registerClick(x,y) {
	    console.log(Math.round(this.currentX),Math.round(this.currentY));
	    console.log(x,y);
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
	
	}
	
	module.exports = Shark;


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map