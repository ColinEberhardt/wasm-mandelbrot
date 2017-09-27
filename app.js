const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.scale(2, 2);

const config = {
  x: -0.7436447860,
  y: 0.1318252536,
  d: 0.00029336,
  iterations: 10000
};

const timeExecution = (fn) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
}

const clearCanvas = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

const loadWasmModule = async(filename, imports) => {
  const res = await fetch(filename);
  const buffer = await res.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const instance = new WebAssembly.Instance(module, imports);
  return instance;
}

const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));

const bootstrap = async() => {

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
  const wasmMandelbrot = await loadWasmModule('wasm/mandelbrot.wasm');
  const emscriptenMandelbrot = await loadWasmModule('emscripten/mandelbrot.wasm', imports);

  const renderJavaScript = () => {
    const imgData = ctx.createImageData(WIDTH, HEIGHT);
    const time = timeExecution(() =>
      mandelbrot(imgData.data, config.iterations, config.x, config.y, config.d)
    );
    ctx.putImageData(imgData, 0, 0);
    return time;
  }

  const renderWasm = () => {
    const imgData = ctx.createImageData(WIDTH, HEIGHT);

    const i32 = new Uint8Array(wasmMandelbrot.exports.memory.buffer);
    const time = timeExecution(() =>
      wasmMandelbrot.exports.mandelbrot(config.iterations, config.x, config.y, config.d)
    );

    // obtain the memory where the fractal was written
    const offset = wasmMandelbrot.exports.getImage();
    const colors = i32.slice(offset, offset + WIDTH * HEIGHT * 4);

    for(var i=0; i< i32.length; i++) {
      imgData.data[i] = colors[i];
    }
    ctx.putImageData(imgData, 0, 0);

    return time;
  }

  const renderEmscripten = () => {
    const imgData = ctx.createImageData(WIDTH, HEIGHT);

    const i32 = new Uint8Array(imports.env.memory.buffer);
    const time = timeExecution(() =>
      emscriptenMandelbrot.exports._mandelbrot(config.iterations, config.x, config.y, config.d)
    );

    // obtain the memory where the fractal was written
    const offset = emscriptenMandelbrot.exports._getImage();;
    const colors = i32.slice(offset, offset + WIDTH * HEIGHT * 4);

    for(var i=0; i< i32.length; i++) {
      imgData.data[i] = colors[i];
    }
    ctx.putImageData(imgData, 0, 0);

    return time;
  }

  document.getElementById('render')
    .addEventListener('click', async() => {
      clearCanvas();
      await wait(0);
      console.log(renderEmscripten());
    });
}

bootstrap();

// fetch('sample.wasm')
//   .then(res => res.arrayBuffer())
//   .then(buffer => WebAssembly.compile(buffer))
//   .then(module => {
//     const instance = new WebAssembly.Instance(module);
//
//     const imgData = ctx.createImageData(WIDTH, HEIGHT);
//
//     // obtain a reference to linear memory
//     const i32 = new Uint32Array(instance.exports.memory.buffer);
//
//     timeExecution(() => instance.exports.mandelbrot(10000, -0.7436447860, 0.1318252536, 0.00029336));
//     timeExecution(() => mandelbrot(imgData.data, 10000, -0.7436447860, 0.1318252536, 0.00029336));
//
//     // obtain the memory where the fractal was written
//     const offset = 8;
//     const colors = i32.slice(offset, offset + WIDTH * HEIGHT * 4);
//
//     for(var i=0; i< i32.length; i++) {
//       imgData.data[i] = colors[i];
//     }
//
//     ctx.putImageData(imgData, 0,0 );
//   });


// fetch('out.wasm')
//   .then(res => res.arrayBuffer())
//   .then(buffer => WebAssembly.compile(buffer))
//   .then(module => {
//     const imports = {
//       env: {
//         memoryBase: 0,
//         tableBase: 0,
//         memory: new WebAssembly.Memory({
//           initial: 512
//         }),
//         table: new WebAssembly.Table({
//           initial: 0,
//           element: 'anyfunc'
//         })
//       }
//     };
//
//     const instance = new WebAssembly.Instance(module, imports);
//
//     const imgData = ctx.createImageData(WIDTH, HEIGHT);
//
//     // obtain a reference to linear memory
//     const i32 = new Uint32Array(imports.env.memory.buffer);
//
//     timeExecution(() => instance.exports._mandelbrot(10000, -0.7436447860, 0.1318252536, 0.00029336));
//     timeExecution(() => mandelbrot(imgData.data, 10000, -0.7436447860, 0.1318252536, 0.00029336));
//
//     // obtain the memory where the fractal was written
//     const offset = instance.exports._getImage();
//     const colors = i32.slice(offset, offset + WIDTH * HEIGHT * 4);
//
//     for(var i=0; i< i32.length; i++) {
//       imgData.data[i] = colors[i];
//     }
//
//     ctx.putImageData(imgData, 0,0 );
//   });
