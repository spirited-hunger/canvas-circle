const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'times new roman';
let fontStyle = 'normal'; // or normal

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
    // default is alphabetic
    context.textBaseline = 'top';
    // context.textAlign = 'center'; // default is left

    // why do we do this? because just aligning baseline and textalign properties doesn't guarantee that you can have the text aligned around the glyph exactly where you want
    const metrics = context.measureText(text);
    // this reads current text in the argument
    console.log(metrics);
    // check the console to test

    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (width - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;

    context.save();
    context.translate(x, y);

    // ! to see the outline of the glyph
    // context.rect(mx, my, mw, mh);
    // context.stroke();

    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();
    
    context.fillText(text, 0, 0);
    
    context.restore();
  };
};

const onKeyUp = (e) => {
  text = e.key[0].toUpperCase();
  manager.render(); // this renders the sketch again
}

document.addEventListener('keyup', onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
}

// canvasSketch(sketch, settings);
// this is an asynchronous function. and it returns a promise with something called sketchmanager. to control it we need to get manager instance

start();