const typeScriptMandelbrot = require('./mandelbrot.js');

module.exports = () => Promise.resolve({
  render: (ctx, config) => {
    const WIDTH = 1200, HEIGHT = 800;
  
    typeScriptMandelbrot.mandelbrot(config.iterations, config.x, config.y, config.d);
  
    const imgData = ctx.createImageData(WIDTH, HEIGHT);
    const linearMemory = typeScriptMandelbrot.getData();
    for (let i = 0; i < linearMemory.length; i++) {
      imgData.data[i] = linearMemory[i];
    }
    ctx.putImageData(imgData, 0, 0);
  },
  name: 'TypeScript'
});