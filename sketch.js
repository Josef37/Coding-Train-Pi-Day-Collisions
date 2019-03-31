// Pi Day Collisions
// Josef Wittmann
// https://thecodingtrain.com/CodingChallenges/139-pi-collisions.html
// https://youtu.be/PoW8g67XNxA
// In all demos the computations only considered the beginning or the end of one frame. 
// This may work well for games, but it can get incorrect numerically pretty fast.
// (I was wondering that results stayed accurate, even if the squared overlapped by 1% of the big one for 7 digits) 
// This simulation wanted to preserve the aspect of a simulation, while considering collisions within one frame 
// instead of bumping up the computational steps within one frame or resetting positions. 
// The improvement shows a more realistic result and faster computation when there is a moderate amount of collisions.

let blockImg;
let block1;
let block2;
let clack;
// How much time passes within ones frame
const frameTime = 2;
// You have to remember, if the last collision was with the other block or a wall, 
// because the blocks can start to overlap in the size of machine epsilon and you would expect the wrong collision next
let isNextCollisionWithBlock = true;

let count = 0;
let digits = 5;
let countDiv;

function preload() {
  blockImg = loadImage('block.png');
  clack = loadSound('clack.wav');
}

function setup() {
  createCanvas(windowWidth, 200);
  block1 = new Block(100, 20, 1, 0, 0);
  const m2 = pow(100, digits - 1);
  block2 = new Block(300, 100, m2, -1, 20);
  countDiv = createDiv(count);
  countDiv.style('font-size', '48pt');
}

function draw() {
  background(200);

  let clackSound = false;
  let remainingFrameTime = frameTime;
  let doneStr = "";

  // Repeat as long as something collides in this frame
  while (true) {
    let timeToCollision = isNextCollisionWithBlock ?
      block1.timeToBlockCollision(block2) :
      block1.timeToWallCollision();
	  
    // There will be no more collision at all
    if (timeToCollision < 0) {
      doneStr = "Done! ";
      break;
    }
    // No more collision in this frame
    if (remainingFrameTime <= timeToCollision) {
      break;
    }

    block1.move(timeToCollision);
    block2.move(timeToCollision);

    // Block collision
    if (isNextCollisionWithBlock) {
      const v1 = block1.bounce(block2);
      const v2 = block2.bounce(block1);
      block1.v = v1;
      block2.v = v2;
      clackSound = true;
      count++;
    } // Wall collision
    else {
      block1.reverse();
      clackSound = true;
      count++;
    }

	// Update after collision
    isNextCollisionWithBlock = !isNextCollisionWithBlock;
    remainingFrameTime -= timeToCollision;
  }

  // Move the rest of the frame
  block1.move(remainingFrameTime);
  block2.move(remainingFrameTime);


  if (clackSound) {
    clack.play();
  }
  block1.show();
  block2.show();

  countDiv.html(doneStr + nf(count, digits));
}