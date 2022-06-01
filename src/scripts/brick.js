import { detectCollision, detectSideCollision } from "./collisions";

export default class Brick {
  constructor(game, position) {
    this.gameWidth = game.gameWidth;
    this.game = game

    this.sound = document.getElementById('block');
    this.sound.volume = 0.1;

    this.width = 50;
    this.height = 20;

    this.position = position;

    this.markedForDeletion = false;
  }


  draw(ctx) {
    // Isso não está sendo usado, os brics são carregados pelo build level
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.sound.pause();
      this.sound.play();

      this.game.brickCount--;

      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }

    // if (detectSideCollision(this.game.ball, this)) {
    //   this.sound.pause()
    //   this.sound.play()
    //   this.game.ball.speed.x = -this.game.ball.speed.x;
    //   this.markedForDeletion = true;
    // }

  }
}
