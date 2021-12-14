const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  columns: 10,
  rows: 10,
  minscale: 1,
  maxscale: 30,
  frequency: 0.001,
  amplitude: 0.2,
  animate: true,
  frame: 0,
  lineCap : 'butt'
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.columns;
    const rows = params.rows;

    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    // margins
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const f = params.animate ? frame : params.frame;

      const n = random.noise3D(x, y, f * 10, params.frequency)
      // const n = random.noise2D(x, y + frame * 10, frequency = 0.001);
      // noise2D returns random number -1 to 1 (too big -> add frequency -> now equivalent affect to multiply 0.001 to x and y)
      // ? random.noise2D(x * 0.001, y * 0.001);
      // controlled Perlin noise
      // check out -> http://web.archive.org/web/20160530124230/http://freespace.virgin.net/hugo.elias/models/m_perlin.htm

      const angle = n * Math.PI * params.amplitude;
      // angle is -0.2 * 180 to 0.2 * 180

      const scale = math.mapRange(n, -1, 1, params.minscale, params.maxscale )
      // 0 to 1 not -1 to 1

      context.save();

      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);

      // context.moveTo(0, h * -0.5);
      // context.lineTo(0, h * 0.5);

      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Grid' });
  folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' }});
  folder.addInput(params, 'columns', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'minscale', { min: 1, max: 100 });
  folder.addInput(params, 'maxscale', { min: 1, max: 100 });

  folder = pane.addFolder({ title: 'Noise' });
  folder.addInput(params, 'frequency', { min: -0.01, max: 0.01 });
  folder.addInput(params, 'amplitude', { min: 0, max: 1 });

  folder.addInput(params, 'animate'); // tweakpane alread understand this to be a true of false parameter.

  folder.addInput(params, 'frame', { min: 0, max: 999 })

  
}
createPane();
canvasSketch(sketch, settings);
