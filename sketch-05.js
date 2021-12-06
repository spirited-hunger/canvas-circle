const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 30; i++) {
    const x = randomRange(0, width);
    const y = randomRange(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    agents.forEach(agent => {
      agent.draw(context);
    });

    const agentA = new Agent(800, 400);
    const agentB = new Agent(300, 700);


    agentA.draw(context);
    agentB.draw(context);
  };
};

canvasSketch(sketch, settings);


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.position = new Point(x, y);
    this.radius = 10;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
  }
}