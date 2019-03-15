const WIDTH = 1200, HEIGHT = 800;

const colour = (iteration, offset, scale) => {
  iteration = ((iteration * scale) + offset) % 1024;
  if (iteration < 256) {
    return iteration;
  } else if (iteration < 512) {
    return 255 - (iteration - 255);
  } else {
    return 0;
  }
}

const iterateEquation = (x0, y0, maxiterations) => {
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

const scale = (domainStart, domainLength, screenLength, step) =>
  domainStart + domainLength * ((step - screenLength) / screenLength);

const mandelbrot = (data, maxIterations, cx, cy, diameter) => {
  const verticalDiameter = diameter * HEIGHT / WIDTH;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // convert from screen coordinates to mandelbrot coordinates
      const rx = scale(cx, diameter, WIDTH, x);
      const ry = scale(cy, verticalDiameter, HEIGHT, y);
      const iterations = iterateEquation(rx, ry, maxIterations);
      const idx = (x + y * WIDTH) << 2;
      const outside = iterations === maxIterations;
      data[idx + 0] = outside ? 0 : colour(iterations, 0,   4);
      data[idx + 1] = outside ? 0 : colour(iterations, 128, 4);
      data[idx + 2] = outside ? 0 : colour(iterations, 356, 4);
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
