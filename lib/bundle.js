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
	const GameView = __webpack_require__(2);
	
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

	const Shark = __webpack_require__(3);
	const Util = __webpack_require__(5);
	
	class Game {
	  constructor() {
	    this.sharks = [];
	  }
	
	  addSharks() {
	    for (let i = 0; i < 1; i++) {
	      let radius = (-100 + Math.random() * 700);
	      let randomX = (-200 + Math.random() * 700);
	      let randomY = (-200 + Math.random() * 700);
	      let speed = 0.4 + Math.random() * .8;
	
	      let shark = new Shark(70, 0.5, 40, randomX, randomY,[randomX,randomY]);
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(5);
	
	class Shark {
	  constructor(radius, speed, width, xPos, yPos, begPos) {
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
	  }
	
	  update(ctx) {
	    let currentX = this.xPos + Math.cos(this.counter / 100) * this.radius;
	    let currentY = this.yPos + Math.sin(this.counter / 100) * this.radius;
	
	    if (this.startPos === null) {
	      this.startPos = [Math.round(currentX),Math.round(currentY)];
	    }
	    if (Math.round(currentX)  === (this.startPos[0] - (2*this.startPos[1]))) {
	      this.hasPassedMid = true;
	    }
	
	    if (
	      (
	      Math.round(this.startPos[0]) === Math.round(currentX) && Math.round(this.startPos[1]) === Math.round(currentY)
	      )
	      && this.hasPassedMid === true
	      )
	      {
	      console.log("i'm here!");
	      this.counter += this.sign * this.speed;
	      ctx.beginPath();
	      ctx.arc(currentX,
	        currentY,
	        this.width,
	        Math.PI * 2,
	        0,
	        false);
	        // console.log(currentX);
	      ctx.closePath();
	      // console.log(this.begPos);
	
	      ctx.fillStyle = 'rgb(185, 211, 238)';
	    //   ctx.fill();
	    } else {
	    this.counter += this.sign * this.speed;
	    ctx.beginPath();
	    ctx.arc(currentX,
	      currentY,
	      this.width,
	      0,
	      Math.PI * 2,
	      false);
	      // console.log(currentX);
	    ctx.closePath();
	    // console.log(this.begPos);
	
	    ctx.fillStyle = 'rgb(185, 211, 238)';
	    ctx.fill();
	    }
	  }
	
	
	  feed() {
	    this.isFed = true;
	  }
	
	}
	
	module.exports = Shark;


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	
	const Util = {
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir (vec) {
	    const norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  // Find distance between two points.
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  norm (vec) {
	    return Util.dist([0, 0], vec);
	  },
	  // Return a randomly oriented vector with the given length.
	
	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	   }
	
	  // wrap (coord, max) {
	  //   if (coord < 0) {
	  //     return max - (coord % max);
	  //   } else if (coord > max) {
	  //     return coord % max;
	  //   } else {
	  //     return coord;
	  //   }
	  // }
	};
	
	module.exports = Util;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map