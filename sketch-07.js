const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

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
    context.textBaseline = 'top';
    // context.textAlign = 'center';

    // why do we do this? because just aligning baseline and textalign properties doesn't guarantee that you can have the text aligned around the gliph exactly where you want
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

    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();
    
    context.fillText(text, 0, 0);
    
    context.restore();
  };
};

// const onKeyUp = (e) => {
//   console.log(e.key);
// }

// document.addEventListener('keyup', onKeyUp);

// canvasSketch(sketch, settings);
