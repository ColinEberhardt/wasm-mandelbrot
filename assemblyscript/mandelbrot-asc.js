module.exports = async () => {

  const WIDTH  = 1200;
  const HEIGHT = 800;

  let imgData = null;

  const result = await WebAssembly.instantiateStreaming(fetch('assemblyscript/mandelbrot.wasm'), {});
  const { mandelbrot, getDataBuffer, memory } = result.instance.exports;

  return {
    render: (ctx, { iterations, x, y, d }) => {
      mandelbrot(iterations, x, y, d);

      if (!imgData) imgData = ctx.createImageData(WIDTH, HEIGHT);
      const offset = getDataBuffer();
      const linearMemory = new Uint8Array(memory.buffer, offset, WIDTH * HEIGHT * 4);
      for (let i = 0, len = linearMemory.length; i < len; i++) {
        imgData.data[i] = linearMemory[i];
      }
      ctx.putImageData(imgData, 0, 0);
    },
    name: 'AssemblyScript',
    description: 'This implementation uses the AssemblyScript compiler to compile a TypeScript mandelbrot to WebAssembly.'
  };
};
