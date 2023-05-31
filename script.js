let yOffset = 0.0;

let waveColor;


function setup() {
  const canvasContainer = document.getElementById('canvas-container')
  const canvas = createCanvas(800, 800);
  waveColor = color(0, 100, 200, 50); // Light blue with transparency
  noFill();

}

function draw() {
  background(0, 30); // Fade the background slightly each frame

  const smallerSize = min(width, height);
  const constraints = [smallerSize * 0.05, smallerSize * 0.95];

  // Draw wave-like lines
  stroke(waveColor);
  strokeWeight(2);
  
  for (let i = 0; i < 4; i++) {
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
  strokeWeight(1);
  const foamCount = 1;
  for (let i = 0; i < foamCount; i++) {
    const x = random(constraints[0], constraints[1]);
    const y = random(constraints[0], constraints[1]);
    const foamSize = random(2, 6);
    point(x, y, foamSize);
  }

  yOffset += 0.005;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}