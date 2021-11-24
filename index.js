let canvas = document.querySelector("canvas");
let context = canvas.getContext('2d');

context.fillStyle = "royalBlue";
context.lineWidth = 4;

// // ! Doing 3 things at the same time 
// // creating a new shape, draw a shap and fill it
// context.fillRect(100, 100, 400, 400);

// // ! Explicit instructions
// // starting path
// context.beginPath();

// // draw a rectangle without filling it
// context.rect(100, 100, 400, 400);

// // fill or stroke
// context.stroke()


// // ! Arc
// context.beginPath();
// context.arc(300, 300, 100, 0, Math.PI * 2);
// context.stroke();

// ! Loops

const width = 60;
const height = 60;
const gap = 20;
const startX = 100;
const startY = 100;

let x = startX;
let y = startY;

for (let i = 0; i < 5; i++) {
  for(let j = 0; j < 5; j++) {
    x = startX + (width + gap) * i;
    y = startY + (width + gap) * j;
  
    context.beginPath();
    context.rect(x, y, width, height)
    context.stroke();

    // 50% chance
    if (Math.random() > 0.5) {
      context.beginPath();
      context.rect(x + 8, y + 8, width - 16, height - 16);
      context.stroke();
    }
  }
}

const gravity = 9.81;