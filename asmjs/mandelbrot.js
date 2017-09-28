window.Module = {};

const asmjs = require('./a.out.asm.js');

module.exports = () => Promise.resolve({
  render: (ctx, config) => {
    
    const WIDTH = 1200, HEIGHT = 800;
  
    const buffer = new ArrayBuffer(WIDTH * HEIGHT * 4 + 16);
    const asm = Module.asm(window, { abortStackOverflow: () => { }}, buffer)
  
    asm._mandelbrot(config.iterations, config.x, config.y, config.d);
  
    const imgData = ctx.createImageData(WIDTH, HEIGHT);
    const offset = asm._getImage();
    const linearMemory = new Uint8Array(buffer, offset);
    for (let i = 0; i < linearMemory.length; i++) {
      imgData.data[i] = linearMemory[i];
    }
    ctx.putImageData(imgData, 0, 0);
  },
  name: 'asm.js'
}); 