import { detectCollision, detectSideCollision } from "./collisions";

export default class Ball {
  constructor(game) {
    this.game = game

    this.sound = document.getElementById('collision');
    this.sound.volume = 0.1;

    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;

    this.radius = 10;
    this.resetBall();
  }

  resetBall() {
    this.position = {
      x: this.game.gameWidth / 2 - this.radius / 2,
      y: this.game.gameHeight - this.radius - 40
    };
    this.speed = {
      x: 4,
      y: -4
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "yellow"
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // Walls colision
    if(this.position.x + this.radius > this.gameWidth || this.position.x - this.radius < 0) {
      this.sound.play()
      this.speed.x = -this.speed.x;
    }
    if(this.position.y + this.radius > this.gameHeight || this.position.y - this.radius < 0) {
      this.sound.play()
      this.speed.y = -this.speed.y;
    }
    if (this.position.y + this.radius > this.gameHeight) {
      this.game.lives--;
      this.resetBall();
    }

    if (detectCollision(this, this.game.paddle)) {
      this.sound.play()
      this.speed.y = -this.speed.y;
      if (this.speed.y < 7 && this.speed.y > -7) {
        this.speed.y *= 1.1
        this.speed.x *= 1.1
      }
      this.position.y = this.game.paddle.position.y - this.radius;
    }

    // if (detectSideCollision(this, this.game.paddle)) {
    //   this.sound.play()
    //   this.speed.x = -this.speed.x;
    //   this.position.x = this.game.paddle.position.x - this.radius;
    // }
  }
}