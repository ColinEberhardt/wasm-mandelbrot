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

  const modeSelect = document.getElementById('mode');
  clearCanvas();

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
    modeSelect.appendChild(option);
  });

  const selectedRenderer = window.location.hash ? window.location.hash.slice(1) : renderers[0].name;
  modeSelect.selectedIndex = Array.apply(null, modeSelect.options).findIndex(o => o.text === selectedRenderer);

  const render = async(iterations = 1) => {
    const renderer = renderers[modeSelect.value];
    window.location.hash = '#' + renderer.name;
    document.getElementById('description').innerHTML = renderer.description;
    clearCanvas();
    await wait(10);
    const executionTime = timeExecution(() => {
      for (let i = 0; i < iterations; i++) {
        renderer.render(ctx, config);
      }
    });
    document.getElementById('execution').innerHTML = (executionTime / iterations).toFixed(2);
  }

  document.getElementById('render')
    .addEventListener('click', () => render());

  document.getElementById('renderPerf')
    .addEventListener('click', () => render(10));

  modeSelect
    .addEventListener('change', () => render());

  render();
}

bootstrap();
