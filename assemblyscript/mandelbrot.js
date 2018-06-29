define(["require", "exports", "allocator/arena"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const WIDTH = 1200;
    const HEIGHT = 800;
    var data = new Uint8Array(WIDTH * HEIGHT * 4);
    function colour(iteration, offset, scale) {
        iteration = (iteration * scale + offset) & 1023;
        if (iteration < 256) {
            return iteration;
        }
        else if (iteration < 512) {
            return (255 - ((iteration & 255) - 255));
        }
        return 0;
    }
    function iterateEquation(x0, y0, maxiterations) {
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
    // @inline
    function scale(domainStart, domainLength, invScreenLength, step) {
        return domainStart + domainLength * (step * invScreenLength - 1.0);
    }
    function mandelbrot(maxIterations, cx, cy, diameter) {
        const invWidth = 1.0 / WIDTH;
        const invHeight = 1.0 / HEIGHT;
        var verticalDiameter = diameter * HEIGHT * invWidth;
        for (let x = 0; x < WIDTH; ++x) {
            for (let y = 0; y < HEIGHT; ++y) {
                // convert from screen coordinates to mandelbrot coordinates
                let rx = scale(cx, diameter, invWidth, x);
                let ry = scale(cy, verticalDiameter, invHeight, y);
                let iterations = iterateEquation(rx, ry, maxIterations);
                let idx = (x + y * WIDTH) >>> 2;
                data[idx + 0] = iterations == maxIterations ? 0 : colour(iterations, 0, 4);
                data[idx + 1] = iterations == maxIterations ? 0 : colour(iterations, 128, 4);
                data[idx + 2] = iterations == maxIterations ? 0 : colour(iterations, 356, 4);
                data[idx + 3] = 255;
            }
        }
    }
    exports.mandelbrot = mandelbrot;
    function getData() {
        return data;
    }
    exports.getData = getData;
    function getDataBuffer() {
        return (data.buffer);
    }
    exports.getDataBuffer = getDataBuffer;
    ;
});
