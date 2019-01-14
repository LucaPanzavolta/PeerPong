let video = document.getElementById("received_video");
let ctx = document.getElementById("canvas").getContext('2d');
let header = document.getElementById("header");
let isCanvasEnabled = false;

let mouseX, mouseY;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

//if mouse is not down don't do anything
//if mouse is down draw 
function draw(e) {
  if (!isDrawing || !isCanvasEnabled) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = '#ecf0f1';
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
}

//set canvas size dinamically to the same width and length
//of the received video when user resizes a page and at the very beginning
window.addEventListener('resize', () => {
  ctx.canvas.width = video.clientWidth;
  ctx.canvas.height = video.clientHeight;
});

window.onload = () => {
  ctx.canvas.width = video.clientWidth;
  ctx.canvas.height = video.clientHeight;
};

//invoke draw function when user is moving mouse on top of the canvas
ctx.canvas.addEventListener('mousemove', draw);
//set isDrawing variable
ctx.canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
  console.log('coords', lastX, ' | ', lastY);
});
ctx.canvas.addEventListener('mouseup', () => isDrawing = false);
ctx.canvas.addEventListener('mouseout', () => isDrawing = false);


