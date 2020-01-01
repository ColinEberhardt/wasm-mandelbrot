module.exports = async() => {

  const WIDTH = 1200, HEIGHT = 800;

  const res = await fetch('emscripten/mandelbrot.wasm');
  const buffer = await res.arrayBuffer();
  const module = await WebAssembly.compile(buffer);

  const imports = {
    env: {
      memoryBase: 0,
      tableBase: 0,
      memory: new WebAssembly.Memory({
        initial: 512
      }),
      table: new WebAssembly.Table({
        initial: 0,
        element: 'anyfunc'
      })
    }
  };

  const instance = new WebAssembly.Instance(module, imports);

  return {
    render: (ctx, config) => {
      instance.exports._mandelbrot(config.iterations, config.x, config.y, config.d);

      const imgData = ctx.createImageData(WIDTH, HEIGHT);
      const offset = instance.exports._getImage();
      const linearMemory = new Uint8Array(imports.env.memory.buffer, offset, WIDTH * HEIGHT * 4);
      imgData.data.set(linearMemory);
      ctx.putImageData(imgData, 0, 0);
    },
    name: 'Emscripten',
    description: 'This implementation uses Emscripten to compile the C version of the mandelbrot to wasm. The SIDE_MODULE option is used to minimise the amount of framework code added to the module.'
  };
};
