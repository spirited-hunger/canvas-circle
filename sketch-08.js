// * GLYPH FILL

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'times new roman';
let fontStyle = 'normal'; // or normal

// making an imaginary canvas tag to extract rgba values
const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  // below will be read when rendered.
  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, width, height);

    fontSize = cols;

    typeContext.fillStyle = "white";
    typeContext.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
    // default is alphabetic
    typeContext.textBaseline = 'top';
    // typeContext.textAlign = 'center'; // default is left

    // why do we do this? because just aligning baseline and textalign properties doesn't guarantee that you can have the text aligned around the glyph exactly where you want
    const metrics = typeContext.measureText(text);
    // this reads current text in the argument
    console.log(metrics);
    // check the console to test

    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);

    // ! to see the outline of the glyph
    // typeContext.beginPath();
    // typeContext.rect(mx, my, mw, mh);
    // typeContext.stroke();
    
    typeContext.fillText(text, 0, 0);
    
    typeContext.restore();

    // now draw it on the actual canvas

    // ! getImageData() to get all rgba values of all pixels of the typeContext
    const typeData = typeContext.getImageData(0, 0, cols, rows).data;
    // console.log(typeData);

    // ? changing background
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'center';

    for (let pixel = 0; pixel < numCells; pixel++) {
      const col = pixel % cols;
      const row = Math.floor(pixel / cols);
      
      const x = col * cell;
      const y = row * cell;

      const r = typeData[pixel * 4 + 0];
      const g = typeData[pixel * 4 + 1];
      const b = typeData[pixel * 4 + 2];
      const a = typeData[pixel * 4 + 3];

      const glyph = getGlyph(r, text);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`
      
      // context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.fillStyle = `white`;

      context.save();
      context.translate(x, y);
      
      // ? Rectangle pixels
      // context.fillRect(0, 0, cell, cell);

      // ? Circle pixels
      // context.translate(cell * 0.5, cell * 0.5);
      // context.beginPath();
      // context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      // context.fill();

      // ? filling text
      context.fillText(glyph, 0, 0);

      context.restore();
    }

    // context.drawImage(typeCanvas, 0, 0);
  };
};

const onKeyUp = (e) => {
  text = e.key[0].toUpperCase();
  manager.render(); // this renders the sketch again
}

const getGlyph = (v, text) => {
  if (v < 50) return '';
  if (v < 100) return '.';
  if (v < 150) return '-';
  if (v < 200) return '+';

  const glyphs = `_= /${text.toLowerCase()}`.split('');

  return random.pick(glyphs);
}

document.addEventListener('keyup', onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
}

// canvasSketch(sketch, settings);
// this is an asynchronous function. and it returns a promise with something called sketchmanager. to control it we need to get manager instance

start();