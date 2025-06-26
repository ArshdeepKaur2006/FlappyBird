const bird = document.querySelector('.bird');
const pillars = document.querySelectorAll('.pillar');
const pillarTop = document.querySelector('.pillar1');
const pillarBottom = document.querySelector('.pillar2');
const gameOverText = document.querySelector('.gameOver');
const scoreElement = document.querySelector('.score');

let score = 0;
let isGameOver = false;

// Bird movement variables
let birdY = bird.offsetTop;
let birdVelocity = 0;
const gravity = 0.5;
const jumpStrength = -10;

// Pillar variables
let pillarX = window.innerWidth;
const pillarSpeed = 3;
const pillarGap = 200;

// Set initial pillar position
pillarTop.style.left = `${pillarX}px`;
pillarBottom.style.left = `${pillarX}px`;

// Bird jump
document.addEventListener('keydown', function (e) {
  if (e.code === 'Space' && !isGameOver) {
    birdVelocity = jumpStrength;
  }

  if (e.code === 'Enter' && isGameOver) {
    location.reload(); // quick reset
  }
});

// Touch support for mobile
document.addEventListener('touchstart', function () {
  if (!isGameOver) {
    birdVelocity = jumpStrength;
  }
});

// Game loop
function gameLoop() {
  if (isGameOver) return;

  // Update bird position
  birdVelocity += gravity;
  birdY += birdVelocity;
  bird.style.top = `${birdY}px`;

  // Keep bird within screen
  if (birdY < 0) {
    birdY = 0;
    birdVelocity = 0;
  }
  if (birdY > window.innerHeight - bird.offsetHeight) {
    birdY = window.innerHeight - bird.offsetHeight;
    birdVelocity = 0;
    gameOver();
  }

  // Move pillars
  pillarX -= pillarSpeed;
  if (pillarX < -60) {
    pillarX = window.innerWidth;

    // Generate new gap
    const minGapTop = 100;
    const maxGapTop = window.innerHeight - pillarGap - 100;
    const gapTop = Math.floor(Math.random() * (maxGapTop - minGapTop) + minGapTop);

    pillarTop.style.height = `${gapTop}px`;
    pillarBottom.style.height = `${window.innerHeight - gapTop - pillarGap}px`;

    score++;
    scoreElement.textContent = `Score: ${score}`;
  }

  pillarTop.style.left = `${pillarX}px`;
  pillarBottom.style.left = `${pillarX}px`;

  // Collision detection
  const birdRect = bird.getBoundingClientRect();
  const topRect = pillarTop.getBoundingClientRect();
  const bottomRect = pillarBottom.getBoundingClientRect();

  if (
    (birdRect.right > topRect.left &&
     birdRect.left < topRect.right &&
     birdRect.top < topRect.bottom) ||

    (birdRect.right > bottomRect.left &&
     birdRect.left < bottomRect.right &&
     birdRect.bottom > bottomRect.top)
  ) {
    gameOver();
  }

  requestAnimationFrame(gameLoop);
}

// Game over function
function gameOver() {
  isGameOver = true;
  gameOverText.style.visibility = 'visible';
}

// Start the game
gameLoop();
