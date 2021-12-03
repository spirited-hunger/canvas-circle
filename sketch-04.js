const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const columns = 100;
    let x;
    const angle = 60;


    for (let i = 1; i < columns; i++) {
      x = width / columns * i;

      // columns
      let piAngle = angle / 180 * Math.PI; 
      context.beginPath();
      
      context.lineWidth = randomRange(0.2, 0.5);
      context.strokeStyle = "black";
  
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();

      context.save();

      // angled rows
      x *= randomRange(1.49, 1.51);

      let startY = - x * Math.tan(piAngle);
      let endY = x / Math.tan(piAngle);

      context.rotate(piAngle);
      context.beginPath();
      
      context.lineWidth = randomRange(0.2, 0.5);
      context.strokeStyle = "black";
  
      context.moveTo(x, startY);
      context.lineTo(x, endY);
      context.stroke();


      context.restore();
    }

    // square with shading

    context.beginPath();
    context.rect(width / 2 - 100, height / 2 - 100, 200, 200);
    context.lineWidth = 3;
    context.stroke();



  };
};

canvasSketch(sketch, settings);
