define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var WIDTH = 1200, HEIGHT = 800;
    var data = new Uint8Array(1200 * 800 * 4);
    function colour(iteration, offset, scale) {
        iteration = ((iteration * scale) + offset) % 1024;
        if (iteration < 256) {
            return iteration;
        }
        else if (iteration < 512) {
            return 255 - (iteration - 255);
        }
        else {
            return 0;
        }
    }
    function iterateEquation(x0, y0, maxiterations) {
        var a = 0, b = 0, rx = 0, ry = 0;
        var iterations = 0;
        while (iterations < maxiterations && (rx * rx + ry * ry <= 4)) {
            rx = a * a - b * b + x0;
            ry = 2 * a * b + y0;
            a = rx;
            b = ry;
            iterations++;
        }
        return iterations;
    }
    function scale(domainStart, domainLength, screenLength, step) {
        return domainStart + domainLength * ((step - screenLength) / screenLength);
    }
    function mandelbrot(maxIterations, cx, cy, diameter) {
        var verticalDiameter = diameter * HEIGHT / WIDTH;
        for (var x = 0; x < WIDTH; x++) {
            for (var y = 0; y < HEIGHT; y++) {
                // convert from screen coordinates to mandelbrot coordinates
                var rx = scale(cx, diameter, WIDTH, x);
                var ry = scale(cy, verticalDiameter, HEIGHT, y);
                var iterations = iterateEquation(rx, ry, maxIterations);
                var idx = ((x + y * WIDTH) * 4);
                data[idx] = iterations == maxIterations ? 0 : colour(iterations, 0, 4);
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
    ;
});
