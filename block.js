class Block {
  constructor(x, w, m, v, xc) {
    this.x = x;
    this.y = height - w;
    this.w = w;
    this.v = v;
    this.m = m;
    this.xConstraint = xc;
  }

  timeToWallCollision() {
	  return - this.x / this.v;
  }
  
  // this is left, other is right
  timeToBlockCollision(other) {
	  let deltaX = other.x - (this.x + this.w);
	  let deltaV = this.v - other.v;
	  return deltaX / deltaV;
  }

  reverse() {
    this.v *= -1;
  }

  bounce(other) {
    let sumM = this.m + other.m;
    let newV = (this.m - other.m) / sumM * this.v;
    newV += (2 * other.m / sumM) * other.v;
    return newV;
  }

  move(deltaTime) {
    this.x += this.v * deltaTime;
  }

  show() {
    image(blockImg, this.x, this.y, this.w, this.w);
  }
}