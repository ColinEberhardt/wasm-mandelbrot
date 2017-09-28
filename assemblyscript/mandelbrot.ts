const WIDTH: f64 = 1200, HEIGHT: f64 = 800;
const data: Uint8Array = new Uint8Array(1200 * 800 * 4);

function colour(iteration: i32, offset: i32, scale: i32): u8 {
  iteration = ((iteration * scale) + offset) % 1024;
  if (iteration < 256) {
    return iteration as u8;
  } else if (iteration < 512) {
    return 255 - ((iteration as u8) - 255);
  } else {
    return 0;
  }
}

function iterateEquation(x0: f64, y0: f64, maxiterations: i32): i32 {
  let a: f64 = 0, b: f64 = 0, rx: f64 = 0, ry: f64 = 0;
  let iterations: i32 = 0;
  while (iterations < maxiterations && (rx * rx + ry * ry <= 4)) {
    rx = a * a - b * b + x0;
    ry = 2 * a * b + y0;
    a = rx;
    b = ry;
    iterations++;
  }
  return iterations;
}

function scale(domainStart: f64, domainLength: f64, screenLength: f64, step: f64): f64 {
  return domainStart + domainLength * ((step - screenLength) / screenLength);
}

export function mandelbrot(maxIterations: i32, cx: f64, cy: f64, diameter: f64): void {
  const verticalDiameter: f64 = diameter * HEIGHT / WIDTH;
  for (var x: f64 = 0; x < WIDTH; x++) {
    for (var y: f64 = 0; y < HEIGHT; y++) {
      // convert from screen coordinates to mandelbrot coordinates
      const rx: f64 = scale(cx, diameter, WIDTH, x);
      const ry: f64 = scale(cy, verticalDiameter, HEIGHT, y);
      const iterations: i32 = iterateEquation(rx, ry, maxIterations);
      const idx: i32 = ((x + y * (WIDTH as f64)) * 4) as i32;
      data[idx] = iterations == maxIterations ? 0 : colour(iterations, 0, 4);
      data[idx + 1] = iterations == maxIterations ? 0 : colour(iterations, 128, 4);
      data[idx + 2] = iterations == maxIterations ? 0 : colour(iterations, 356, 4);
      data[idx+3] = 255;
    }
  }
}

export function getData(): Uint8Array {
  return data;
};
