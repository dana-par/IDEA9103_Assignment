
function generateGradientVectors(size) {
  const vectors = [];
  for (let i = 0; i < size; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    vectors.push([x, y]);
  }
  return vectors;
}

function dotProduct(gradient, dx, dy) {
  return gradient[0] * dx + gradient[1] * dy;
}

function smooth(t) {
  return t * t * (3 - 2 * t);
}


function perlinNoise(x, y, gradientVectors, gridSize) {
  const cellX = Math.floor(x);
  const cellY = Math.floor(y);

  const topLeftGradient = gradientVectors[cellY % gridSize][cellX % gridSize];
  const topRightGradient = gradientVectors[cellY % gridSize][(cellX + 1) % gridSize];
  const bottomLeftGradient = gradientVectors[(cellY + 1) % gridSize][cellX % gridSize];
  const bottomRightGradient = gradientVectors[(cellY + 1) % gridSize][(cellX + 1) % gridSize];

  const dx = x - cellX;
  const dy = y - cellY;

  const topLeftDotProduct = dotProduct(topLeftGradient, dx, dy);
  const topRightDotProduct = dotProduct(topRightGradient, dx - 1, dy);
  const bottomLeftDotProduct = dotProduct(bottomLeftGradient, dx, dy - 1);
  const bottomRightDotProduct = dotProduct(bottomRightGradient, dx - 1, dy - 1);

  const smoothedDx = smooth(dx);
  const smoothedDy = smooth(dy);

  const topInterpolation = lerp(topLeftDotProduct, topRightDotProduct, smoothedDx);
  const bottomInterpolation = lerp(bottomLeftDotProduct, bottomRightDotProduct, smoothedDx);
  const finalInterpolation = lerp(topInterpolation, bottomInterpolation, smoothedDy);

  return finalInterpolation;
}


function lerp(a, b, t) {
  return a + t * (b - a);
}

const svg = document.getElementById('basesvg');

const gridSize = 50; // Adjust this value to control the grid size
const scale = 0.05; // Adjust this value to control the noise scale

const width = 800; // SVG width
const height = 600; // SVG height

svg.setAttribute('width', width);
svg.setAttribute('height', height);

for (let x = 0; x < width; x += gridSize) {
  for (let y = 0; y < height; y += gridSize) {
    const finalInterpolation = perlinNoise(x * scale, y * scale);

    // Determine the circle radius based on the noise value
    const radius = Math.abs(finalInterpolation) * (gridSize / 2);

    // Determine the circle color based on the noise value
    const hue = Math.floor((finalInterpolation + 1) * 180);
    const saturation = '100%';
    const lightness = '50%';
    const color = `hsl(${hue}, ${saturation}, ${lightness})`;

    // Create a circle element and set its attributes
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x + (gridSize / 2));
    circle.setAttribute('cy', y + (gridSize / 2));
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', color);

    // Append the circle to the SVG element
    svg.appendChild(circle);
  }
}
