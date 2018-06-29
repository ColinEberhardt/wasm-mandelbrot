const WIDTH  = 1200;
const HEIGHT = 800;

function colour(iteration, offset, scale) {
  iteration = (iteration * scale + offset) & 1023;
  if (iteration < 256) {
    return iteration;
  } else if (iteration < 512) {
    return 255 - ((iteration & 255) - 255);
  }
  return 0;
}

function iterateEquation(x0, y0, maxiterations) {
  let a = 0, b = 0, rx = 0, ry = 0;
  let iterations = 0;
  while (iterations < maxiterations && (rx * rx + ry * ry <= 4)) {
    rx = a * a - b * b + x0;
    ry = 2 * a * b + y0;
    a = rx;
    b = ry;
    iterations++;
  }
  return iterations;
}

function scale(domainStart, domainLength, invScreenLength, step) {
  domainStart + domainLength * (step * invScreenLength - 1);
}

function mandelbrot(data, maxIterations, cx, cy, diameter) {
  const invWidth  = 1.0 / WIDTH;
  const invHeight = 1.0 / HEIGHT;
  const verticalDiameter = diameter * HEIGHT * invWidth;
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      // convert from screen coordinates to mandelbrot coordinates
      const rx = scale(cx, diameter,         invWidth,  x);
      const ry = scale(cy, verticalDiameter, invHeight, y);
      const iterations = iterateEquation(rx, ry, maxIterations);
      const idx = (x + y * WIDTH) << 2;
      data[idx + 0] = iterations === maxIterations ? 0 : colour(iterations, 0,   4);
      data[idx + 1] = iterations === maxIterations ? 0 : colour(iterations, 128, 4);
      data[idx + 2] = iterations === maxIterations ? 0 : colour(iterations, 356, 4);
      data[idx + 3] = 255;
    }
  }
}

const javascriptMandelbrot = (ctx, config) => {
  const imgData = ctx.createImageData(WIDTH, HEIGHT);
  mandelbrot(imgData.data, config.iterations, config.x, config.y, config.d)
  ctx.putImageData(imgData, 0, 0);
}

module.exports = () => Promise.resolve({
  render: javascriptMandelbrot,
  name: 'JavaScript',
  description: 'This a vanilla-JavaScript implementation of the Mandelbrot set.'
});
