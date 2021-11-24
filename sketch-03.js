const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

// degree to radius
const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
};

// random number maker
const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'whitesmoke';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;

    const num = 22;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      
      context.save();

      context.translate(x, y);
      context.rotate(-angle);
      context.scale(randomRange(0.1, 2), randomRange(0.2, 0.5))
      
      context.fillStyle = "black";
      context.beginPath();
      context.rect(-w * 0.5, randomRange(0, -h * 0.5), w, h);
      context.fill();
      
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = randomRange(5, 20);

      context.beginPath();
      context.arc(0, 0, radius * randomRange(0.7, 1.3), slice * randomRange(0, -5), randomRange(0, 5));
      context.stroke();
      context.restore();

    }
    
  };
};

canvasSketch(sketch, settings);

