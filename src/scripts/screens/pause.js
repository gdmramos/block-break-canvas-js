export default class Pause {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.position = {
      x: 0,
      y: 0
    };
  }

  draw(ctx) {
    ctx.rect(this.position.x, this.position.y, this.gameWidth, this.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
  }
}
