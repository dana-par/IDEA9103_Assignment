// Basic SVG setup
const svg = document.getElementById("basesvg");
let width = 800;
let height = 800;

svg.setAttribute("width", width);
svg.setAttribute("height", height);

// This function is to generate a random RGB colors
// This code is referred from IDEA9103 Week5 Tutorial
// function makeRGB(redInput, greenInput, blueInput) {
//   let redOutput = redInput ?? randomNumber(255);
//   let greenOutput = greenInput ?? randomNumber(255);
//   let blueOutput = blueInput ?? randomNumber(255);

//   return `rgb(${redOutput}, ${greenOutput}, ${blueOutput})`;
// }


// Below section is to implement the Perlin noise algorithm
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

const scale = 0.05;

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const noiseValue = noise(x * scale, y * scale);

    // Determine the color based on the noise value
    const hue = Math.floor((noiseValue + 1) * 180);
    const saturation = '100%';
    const lightness = '50%';
    const color = `hsl(${hue}, ${saturation}, ${lightness})`;

    // Determine the size based on the noise value
    const radius = Math.abs(noiseValue) * 5;

    // Determine the opacity based on the noise value
    const opacity = Math.abs(noiseValue) * 0.8 + 0.2;

    const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttribute('cx', x);
    point.setAttribute('cy', y);
    point.setAttribute('r', radius);
    point.setAttribute('fill', color);
    point.setAttribute('opacity', opacity);

    svg.appendChild(point);
  }
}