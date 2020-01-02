const WIDTH  = 1200;
const HEIGHT = 800;

const data = new Uint8Array(WIDTH * HEIGHT * 4);

@inline
function colour(iteration: u32, offset: i32, scale: i32): u8 {
  iteration = (iteration * scale + offset) & 1023;
  if (iteration < 256) {
    return iteration as u8;
  } else if (iteration < 512) {
    return 255 - ((iteration as u8) - 255);
  }
  return 0;
}

function iterateEquation(x0: f64, y0: f64, maxiterations: u32): u32 {
  let a = 0.0, b = 0.0, rx = 0.0, ry = 0.0, ab: f64;
  let iterations: u32 = 0;
  while (iterations < maxiterations && (rx * rx + ry * ry <= 4)) {
    rx = a * a - b * b + x0;
    ab = a * b;
    ry = ab + ab + y0;
    a = rx;
    b = ry;
    iterations++;
  }
  return iterations;
}

@inline
function scale(domainStart: f64, domainLength: f64, screenLength: f64, step: f64): f64 {
  return domainStart + domainLength * (step * (1.0 / screenLength) - 1);
}

export function mandelbrot(maxIterations: u32, cx: f64, cy: f64, diameter: f64): void {
  let verticalDiameter = diameter * HEIGHT / WIDTH;
  for (let y = 0; y < HEIGHT; ++y) {
    for (let x = 0; x < WIDTH; ++x) {
      // convert from screen coordinates to mandelbrot coordinates
      let rx = scale(cx, diameter, WIDTH, x);
      let ry = scale(cy, verticalDiameter, HEIGHT, y);
      let iterations = iterateEquation(rx, ry, maxIterations);
      let outside = iterations == maxIterations;
      let idx = (x + y * WIDTH) << 2;

      unchecked(data[idx + 0] = outside ? 0 : colour(iterations, 0,   4));
      unchecked(data[idx + 1] = outside ? 0 : colour(iterations, 128, 4));
      unchecked(data[idx + 2] = outside ? 0 : colour(iterations, 356, 4));
      unchecked(data[idx + 3] = 255);
    }
  }
}

export function getData(): Uint8Array {
  return data;
}

export function getDataBuffer(): ArrayBuffer {
  return <ArrayBuffer>(data.buffer);
};
