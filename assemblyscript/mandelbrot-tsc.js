const typeScriptMandelbrot = require('./mandelbrot.js');

const WIDTH  = 1200;
const HEIGHT = 800;

var imgData = null;

const { getData, mandelbrot } = typeScriptMandelbrot;

module.exports = () => Promise.resolve({
  render: (ctx, { iterations, x, y, d }) => {
    mandelbrot(iterations, x, y, d);

    if (!imgData) imgData = ctx.createImageData(WIDTH, HEIGHT);
    const linearMemory = getData();

    for (let i = 0, len = linearMemory.length; i < len; i++) {
      imgData.data[i] = linearMemory[i];
    }
    ctx.putImageData(imgData, 0, 0);
  },
  name: 'TypeScript',
  description: 'This implementation takes the TypeScript that is used by AssemblyScript to generate WebAssembly, but instead passes it through the TypeScript compiler to create JavaScript.'
});
