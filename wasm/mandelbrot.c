const int WIDTH = 1200;
const int HEIGHT = 800;
unsigned char image[WIDTH * HEIGHT * 4];

unsigned char colour(int iteration, int offset, int scale) {
  iteration = (iteration * scale + offset) & 1023;
  if (iteration < 256) {
    return iteration;
  } else if (iteration < 512) {
    return 255 - ((iteration & 255) - 255);
  }
  return 0;
}

int iterateEquation(double x0, double y0, int maxiterations) {
  double a = 0.0, b = 0.0, rx = 0.0, ry = 0.0;
  int iterations = 0;
  while (iterations < maxiterations && (rx * rx + ry * ry <= 4.0)) {
    rx = a * a - b * b + x0;
    ry = 2.0 * a * b + y0;
    a = rx;
    b = ry;
    iterations++;
  }
  return iterations;
}

inline double scale(double domainStart, double domainLength, double invScreenLength, int step) {
  return domainStart + domainLength * (step * invScreenLength - 1.0);
}

void mandelbrot(int maxIterations, double cx, double cy, double diameter) {
  double invWidth  = 1.0 / (double)WIDTH;
  double invHeight = 1.0 / (double)HEIGHT;
  double verticalDiameter = diameter * HEIGHT * invWidth;
  for(int x = 0; x < WIDTH; x++) {
    for(int y = 0; y < HEIGHT; y++) {
      // map to mandelbrot coordinates
      double rx = scale(cx, diameter,         invWidth,  x);
      double ry = scale(cy, verticalDiameter, invHeight, y);
      int iterations = iterateEquation(rx, ry, maxIterations);
      int idx = (x + y * WIDTH) << 2;
      // set the red and alpha components
      image[idx + 0] = iterations == maxIterations ? 0 : colour(iterations, 0,   4);
      image[idx + 1] = iterations == maxIterations ? 0 : colour(iterations, 128, 4);
      image[idx + 2] = iterations == maxIterations ? 0 : colour(iterations, 356, 4);
      image[idx + 3] = 255;
    }
  }
}

unsigned char* getImage() {
  return &image[0];
}
