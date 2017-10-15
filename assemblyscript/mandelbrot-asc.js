module.exports = async() => {

  const WIDTH = 1200, HEIGHT = 800;

  const res = await fetch('assemblyscript/mandelbrot.wasm');
  const buffer = await res.arrayBuffer();
  const instance = await WebAssembly.instantiate(buffer, {});

  return {
    render: (ctx, config) => {
      instance.instance.exports.mandelbrot(config.iterations, config.x, config.y, config.d);

      const imgData = ctx.createImageData(WIDTH, HEIGHT);
      const offset = instance.instance.exports.getData();
      const linearMemory = new Uint8Array(instance.instance.exports.memory.buffer, offset, WIDTH * HEIGHT * 4);
      for (let i = 0; i < linearMemory.length; i++) {
        imgData.data[i] = linearMemory[i];
      }
      ctx.putImageData(imgData, 0, 0);
    },
    name: 'AssemblyScript',
    description: 'This implementation uses the AssemblyScript compiler to compile a TypeScript mandelbrot to WebAssembly.'
  }
};
