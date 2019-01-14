export function handleCanvas() {
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  
  //if mouse is not down don't do anything
  //if mouse is down draw 
  function draw(e) {
    console.log('in drawing');
    let ctx = document.getElementById("canvas").getContext("2d");
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = '#ecf0f1';
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
  
  function onMouseDown(e) {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    console.log('coords', lastX, ' | ', lastY);
  }
  
  //if (window.location.path !== '/videochat') return;
  let ctx = document.getElementById("canvas").getContext('2d');
  let video = document.getElementById("received-video");
  
  ctx.canvas.width = video.clientWidth;
  ctx.canvas.height = video.clientHeight;
  
  //invoke draw function when user is moving mouse on top of the canvas
  ctx.canvas.addEventListener('mousemove', draw);
  //set isDrawing variable
  ctx.canvas.addEventListener('mousedown', onMouseDown);
  ctx.canvas.addEventListener('mouseup', () => isDrawing = false);
  ctx.canvas.addEventListener('mouseout', () => isDrawing = false);

  window.addEventListener('resize', () => {
    let ctx = document.getElementById("canvas").getContext('2d');
    let video = document.getElementById("received-video");

    ctx.canvas.width = video.clientWidth;
    ctx.canvas.height = video.clientHeight;
  });
}

              /* export function handleCanvas() {
              
                let isDrawing = false;
                let lastX = 0;
                let lastY = 0;
              
                //if mouse is not down don't do anything
                //if mouse is down draw
                function draw(e) {
                  console.log('in drawing');
                  let ctx = document.getElementById("canvas").getContext("2d");
                  if (!isDrawing) return;
                  ctx.beginPath();
                  ctx.moveTo(lastX, lastY);
                  ctx.lineTo(e.offsetX, e.offsetY);
                  ctx.strokeStyle = '#ecf0f1';
                  ctx.stroke();
                  lastX = e.offsetX;
                  lastY = e.offsetY;
                }
              
                function onMouseDown(e) {
                  isDrawing = true;
                  lastX = e.offsetX;
                  lastY = e.offsetY;
                  console.log('coords', lastX, ' | ', lastY);
                }
              
                //set canvas size dinamically to the same width and length
                //of the received video when user resizes a page and at the very beginning
                window.addEventListener('resize', () => {
                  let ctx = document.getElementById("canvas").getContext('2d');
                  let video = document.getElementById("received-video");
              
                  ctx.canvas.width = video.clientWidth;
                  ctx.canvas.height = video.clientHeight;
                });
              
                window.onload = () => {
                  if (window.location.path !== '/videochat') return;
                  let ctx = document.getElementById("canvas").getContext('2d');
                  let video = document.getElementById("received-video");
              
                  ctx.canvas.width = video.clientWidth;
                  ctx.canvas.height = video.clientHeight;
              
                  //invoke draw function when user is moving mouse on top of the canvas
                  ctx.canvas.addEventListener('mousemove', draw);
                  //set isDrawing variable
                  ctx.canvas.addEventListener('mousedown', onMouseDown);
                  ctx.canvas.addEventListener('mouseup', () => isDrawing = false);
                  ctx.canvas.addEventListener('mouseout', () => isDrawing = false);
                };
              
              } */