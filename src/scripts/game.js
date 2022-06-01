import Ball from "./ball";
import Paddle from "./paddle";
import InputHandler from "./input";

import Pause from "./screens/pause";
import Menu from "./screens/menu";
import GameOver from "./screens/over";
import GameComplete from "./screens/complete";

import { buildLevel, level1 } from "./levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  COMPLETE: 4
}

export default class Game {
  constructor(gameWidth, gameHeigh) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeigh;

    this.gameState = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObjects = [];
    this.lives = 3;
    this.brickCount = 66;
    this.sound = document.getElementById('theme');
    this.sound.volume = 0.2;


    this.pause = new Pause(this);
    this.menu = new Menu(this);
    this.gameOver = new GameOver(this);
    this.gameComplete = new GameComplete(this);

    new InputHandler(this);
  }

  start() {
    let bricks = buildLevel(this, level1);
    this.gameObjects = [this.ball, this.paddle, ...bricks ];

    this.brickCount =  66;
    this.lives = 3;
    this.gameState = GAMESTATE.RUNNING;
    this.sound.play();
  }

  update(deltaTime) {
    if(this.gameState !== GAMESTATE.RUNNING) return

    if(this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;

    this.gameObjects.forEach(object => object.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);

    if(this.brickCount === 0) this.gameState = GAMESTATE.COMPLETE;
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx))

    if (this.gameState === GAMESTATE.PAUSED) {
      this.pause.draw(ctx);
    }

    if (this.gameState === GAMESTATE.MENU) {
      this.menu.draw(ctx);
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      this.gameOver.draw(ctx);
    }

    if (this.gameState === GAMESTATE.COMPLETE) {
      this.gameComplete.draw(ctx);
    }
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.sound.play()
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.sound.pause()
      this.gameState = GAMESTATE.PAUSED
    }
  }
}