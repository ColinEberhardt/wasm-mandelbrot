import "allocator/arena";

const WIDTH:  i32 = 1200;
const HEIGHT: i32 = 800;

var data: Uint8Array = new Uint8Array(WIDTH * HEIGHT * 4);

function colour(iteration: i32, offset: i32, scale: i32): u8 {
  iteration = (iteration * scale + offset) & 1023;
  if (iteration < 256) {
    return <u8>iteration;
  } else if (iteration < 512) {
    return <u8>(255 - (iteration - 255));
  }
  return 0;
}

function iterateEquation(x0: f64, y0: f64, maxiterations: i32): i32 {
  let a = 0.0, b = 0.0, rx = 0.0, ry = 0.0;
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

@inline
function scale(domainStart: f64, domainLength: f64, invScreenLength: f64, step: f64): f64 {
  return domainStart + domainLength * (step * invScreenLength - 1.0);
}

export function mandelbrot(maxIterations: i32, cx: f64, cy: f64, diameter: f64): void {
  const invWidth  = 1.0 / WIDTH;
  const invHeight = 1.0 / HEIGHT;
  var verticalDiameter = diameter * HEIGHT * invWidth;
  for (let x = 0; x < WIDTH; ++x) {
    for (let y = 0; y < HEIGHT; ++y) {
      // convert from screen coordinates to mandelbrot coordinates
      let rx = scale(cx, diameter,         invWidth,  x);
      let ry = scale(cy, verticalDiameter, invHeight, y);
      let iterations = iterateEquation(rx, ry, maxIterations);
      let idx = (x + y * WIDTH) << 2;

      unchecked(data[idx + 0] = iterations == maxIterations ? 0 : colour(iterations, 0,   4));
      unchecked(data[idx + 1] = iterations == maxIterations ? 0 : colour(iterations, 128, 4));
      unchecked(data[idx + 2] = iterations == maxIterations ? 0 : colour(iterations, 356, 4));
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
