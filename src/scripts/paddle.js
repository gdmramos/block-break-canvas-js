export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    
    this.width = 150;
    this.height = 30;

    this.speed = 0;
    this.maxSpeed = 8;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = "rgb(0,255,0)"
    ctx.shadowColor = "#ff00de";
    ctx.shadowBlur = 6;
  }

  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
  }
}
