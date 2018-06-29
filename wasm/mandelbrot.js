module.exports = async() => {
  const WIDTH = 1200, HEIGHT = 800;

  const res = await fetch('wasm/mandelbrot.wasm');
  const buffer = await res.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const instance = new WebAssembly.Instance(module);

  const { mandelbrot, getImage, memory } = instance.exports;

  let imgData = null;

  return {
    name: 'WebAssembly',
    render: (ctx, { iterations, x, y, d }) => {
      mandelbrot(iterations, x, y, d);

      if (!imgData) imgData = ctx.createImageData(WIDTH, HEIGHT);
      const offset = getImage();
      const linearMemory = new Uint8Array(memory.buffer, offset, WIDTH * HEIGHT * 4);
      for (let i = 0, len = linearMemory.length; i < len; i++) {
        imgData.data[i] = linearMemory[i];
      }
      ctx.putImageData(imgData, 0, 0);
    },
    description: 'This implementation creates a minimal wasm module by compiling C using clang / llc and the binaryen tools directly (as opposed to emscripten, that wraps up clang / llc together with its own framework code).'
  }
};
