module.exports = async () => {

  const WIDTH  = 1200;
  const HEIGHT = 800;

  const result = await WebAssembly.instantiateStreaming(fetch('assemblyscript/mandelbrot.wasm'), {
    abort: (msg, file, line, column) => {
      console.error("abort called at mandelbrot.ts:" + line + ":" + column);
    }
  });

  return {
    render: (ctx, config) => {
      // console.log(result.instance.exports.structured());
      const { mandelbrot, getDataBuffer, memory } = result.instance.exports;
      mandelbrot(config.iterations, config.x, config.y, config.d);

      const imgData = ctx.createImageData(WIDTH, HEIGHT);
      const offset  = getDataBuffer();
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
