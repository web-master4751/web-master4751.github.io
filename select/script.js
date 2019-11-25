let box = document.querySelector(".box");
let ctx = box.getContext("2d");

box.width = window.innerWidth;
box.height =  window.innerHeight;

let drag = false;
let coordStart, coordEnd, width, height;

box.addEventListener('mousedown', mouseDown);
box.addEventListener('mousemove', mouseMove);
box.addEventListener('mouseup', mouseUp);

function mouseDown(e){
  if(e.which == 1){
    drag = true;
    coordStart = {
      x: e.clientX,
      y: e.clientY
    }
  }
}
function mouseUp(e){
  if(e.which == 1){
    drag = false;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
function mouseMove(e){
  if(drag){
    coordEnd = {
      x: e.clientX,
      y: e.clientY
    };
    width = coordEnd.x - coordStart.x;
    height = coordEnd.y - coordStart.y;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(152, 224, 250, 0.5)';
    ctx.rect(coordStart.x, coordStart.y, width, height);
    ctx.fill();
  }
}
