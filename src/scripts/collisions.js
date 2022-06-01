export function detectCollision(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.radius;
  let topOfBall = ball.position.y;

  let topOfGameObject = gameObject.position.y;
  let bottomOfGameObject = gameObject.position.y + gameObject.height;
  let leftSideOfGameObject = gameObject.position.x;
  let rightSideOfGameObject = gameObject.position.x + gameObject.width;
  
  if (
    bottomOfBall >= topOfGameObject &&
    topOfBall <= bottomOfGameObject &&
    ball.position.x >= leftSideOfGameObject &&
    ball.position.x + ball.radius <= rightSideOfGameObject
  ) {
    return true
  } else {
    return false
  }
}

// export function detectSideCollision(ball, gameObject) {
//   let rightSideOfBall = ball.position.x + (ball.radius * 2);
//   let leftSideOfBall = ball.position.x;

//   let leftSideOfGameObject = gameObject.position.x;
//   let rightSideOfGameObject = gameObject.position.x + gameObject.width;

//   if (
//     rightSideOfBall >= leftSideOfGameObject &&
//     leftSideOfBall <= rightSideOfGameObject
//   ) {
//     return true
//   } else {
//     return false
//   }
// }