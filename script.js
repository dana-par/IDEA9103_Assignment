let yOffset = 0.0;
let waveColor;
let numWaveLines;
let lastChangeTime = 0;
const changeInterval = 3000; // Change every 3 seconds

function setup() {
  const canvasContainer = document.getElementById('canvas-container');
  const canvas = createCanvas(800, 800);
  waveColor = color(0, 100, 200, 50); // Light blue with transparency
  noFill();
  
  numWaveLines = Math.floor(random(1, 8)); // Randomly select the initial number of wave lines
  lastChangeTime = millis(); // Set the initial time of the last change
}

function draw() {
  background(0, 30); // Fade the background slightly each frame

  const smallerSize = min(width, height);
  const constraints = [smallerSize * 0.05, smallerSize * 0.95];

  // Draw wave-like lines
  stroke(waveColor);
  strokeWeight(2);

  for (let i = 0; i < numWaveLines; i++) {
    beginShape();
    const yOff = yOffset + i * 0.1;
    let xOffset = 0.00;
    const step = 20;

    for (let x = constraints[0]; x < constraints[1] + step / 2; x += step) {
      const y = map(noise(xOffset, yOff), 0, 1, constraints[0], constraints[1]);
      vertex(x, y);
      xOffset += 0.05;
    }

    endShape();
  }

  // Draw foam-like dots
  stroke(255);
  strokeWeight(2);
  const foamCount = 1;
  for (let i = 0; i < foamCount; i++) {
    const x = random(constraints[0], constraints[1]);
    const y = random(constraints[0], constraints[1]);
    const foamSize = random(2, 6);
    point(x, y, foamSize);
  }

  yOffset += 0.005;

  // Check if it's time to change the number of wave lines
  if (millis() - lastChangeTime >= changeInterval) {
    numWaveLines = Math.floor(random(1, 11)); // Randomly select a new number of wave lines
    lastChangeTime = millis(); // Update the time of the last change
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
