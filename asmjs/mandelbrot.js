window.Module = {};

const asmjs = require('./a.out.asm.js');

const WIDTH  = 1200;
const HEIGHT = 800;

const buffer = new ArrayBuffer(WIDTH * HEIGHT * 4 + 16);
const { _mandelbrot, _getImage } = Module.asm(window, { abortStackOverflow: () => {}}, buffer);

let imgData = null;

module.exports = () => Promise.resolve({
  render: (ctx, { iterations, x, y, d }) => {
    _mandelbrot(iterations, x, y, d);

    if (!imgData) imgData = ctx.createImageData(WIDTH, HEIGHT);
    const offset  = _getImage();
    const linearMemory = new Uint8Array(buffer, offset);
    for (let i = 0, len = linearMemory.length; i < len; i++) {
      imgData.data[i] = linearMemory[i];
    }
    ctx.putImageData(imgData, 0, 0);
  },
  name: 'asm.js',
  description: 'This implementation uses EmScripten to compile a C mandelbrot into asm.js'
});
