const WIDTH = 1200, HEIGHT = 800;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// let's make it all pretty and 'retina'
ctx.scale(2, 2);

// the 'seahorse tail' 
// https://commons.wikimedia.org/wiki/File:Mandel_zoom_04_seehorse_tail.jpg
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

const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));

const bootstrap = async() => {

  const renderers = [
    await require('wasm/mandelbrot.js')(),
    await require('js/mandelbrot.js')(),
    await require('emscripten/mandelbrot.js')(),
    await require('assemblyscript/mandelbrot-asc.js')(),
    await require('assemblyscript/mandelbrot-tsc.js')(),
    await require('asmjs/mandelbrot.js')(),
  ];

  renderers.forEach((renderer, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.innerHTML = renderer.name;
    document.getElementById('mode').appendChild(option);
  })

  document.getElementById('render')
    .addEventListener('click', async() => {
      const renderer = renderers[document.getElementById('mode').value];
      clearCanvas();
      await wait(0);
      console.log(timeExecution(() => renderer.render(ctx, config)));
    });
}

bootstrap();
