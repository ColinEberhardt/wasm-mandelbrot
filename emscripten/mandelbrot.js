module.exports = async () => {

  const WIDTH     = 1200;
  const HEIGHT    = 800;
  const PAGE_SIZE = 65536;

  function allocateMemory() {
    const initial = Math.floor(WIDTH * HEIGHT * 4 / PAGE_SIZE) + 1;
    return new WebAssembly.Memory({ initial });
  }

  const imports = {
    env: {
      memoryBase: 0,
      tableBase: 0,
      memory: allocateMemory(),
      table: new WebAssembly.Table({
        initial: 0,
        element: 'anyfunc'
      })
    }
  };

  const res      = await fetch('emscripten/mandelbrot.wasm');
  const buffer   = await res.arrayBuffer();
  const module   = await WebAssembly.compile(buffer);
  const instance = new WebAssembly.Instance(module, imports);

  const { _mandelbrot, _getImage } = instance.exports;
  let imgData = null;

  return {
    render: (ctx, { iterations, x, y, d }) => {
      _mandelbrot(iterations, x, y, d);

      if (!imgData) imgData = ctx.createImageData(WIDTH, HEIGHT);
      const offset = _getImage();
      const linearMemory = new Uint8Array(imports.env.memory.buffer, offset, WIDTH * HEIGHT * 4);
      for (let i = 0, len = linearMemory.length; i < len; i++) {
        imgData.data[i] = linearMemory[i];
      }
      ctx.putImageData(imgData, 0, 0);
    },
    name: 'Emscripten',
    description: 'This implementation uses Emscripten to compile the C version of the mandelbrot to wasm. The SIDE_MODULE option is used to minimise the amount of framework code added to the module.'
  };
};
