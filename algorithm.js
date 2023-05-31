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
  
