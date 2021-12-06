const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true // if this is true, 60 frames per second the return function will be called
};

// beneath is what happens when animate : true
const animate = () => {
  console.log('animate function called');
  // this function is called every frame 
  requestAnimationFrame(animate);
  // and it will call this function next
}
// then, you need to call the function
// TODO : unref next line to see the result
// animate();
// now check the console log


const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const x = randomRange(0, width);
    const y = randomRange(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.position.getDistance(other.position);

        if (dist > 200) continue;

        // context.save();
        
        let lw = 600 / dist;
        
        if (lw > 20) lw = 20;
        context.lineWidth = lw;

        context.beginPath();
        context.moveTo(agent.position.x, agent.position.y);
        context.lineTo(other.position.x, other.position.y);
        context.stroke();

        // context.restore();

      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) { // other vector gets passed on
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(randomRange(-1, 1), randomRange(-1,1));
    this.radius = randomRange(4, 12);
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  bounce(width, height) {
    if (this.position.x <= 0 || this.position.x >= width) this.velocity.x *= -1;
    if (this.position.y <= 0 || this.position.y >= height) this.velocity.y *= -1;
  }

  draw(context) {
    context.save();
    context.translate(this.position.x, this.position.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill(); // default is white
    context.stroke(); // default is black

    context.restore();
  }
}