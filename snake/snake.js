const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
let scoreSpan = document.querySelector('.span');
let box = 20;
let level = 50;
let score = 0;
let dir;

canvas.width  = 1020;
canvas.height = 1020;

//яблоко
let apple = {
  x: (Math.floor(Math.random() * 51)) * box,
  y: (Math.floor(Math.random() * 51)) * box
}
let apple1 = {
  x: (Math.floor(Math.random() * 51)) * box,
  y: (Math.floor(Math.random() * 51)) * box
}
let apple2 = {
  x: (Math.floor(Math.random() * 51)) * box,
  y: (Math.floor(Math.random() * 51)) * box
}

//змейка
let snake = [];
snake[0] = {
  x: 25 * box,
  y: 25 * box
}

//клавиши
document.addEventListener('keydown', directions);
function directions(e){
  if(e.code == 'KeyW' && dir != 'down' && dir != 'up'){
    dir = 'up';
  }
  else if(e.code == 'KeyA' && dir != 'right' && dir != 'left'){
    dir = 'left';
  }
  else if(e.code == 'KeyS' && dir != 'up' && dir != 'down'){
    dir = 'down';
  }
  else if(e.code == 'KeyD' && dir != 'left' && dir != 'right'){
    dir = 'right';
  }
}

//начало
let start = setInterval(draw, level);
draw();

//score
scoreSpan.innerHTML = score;

/////MAIN FUNCTION/////
function draw(){
  //квадрат 1000х1000
  ctx.fillStyle = '#8da2c4';
  ctx.fillRect(0, 0, box*51, box*51);

  //сетка
  for(let i = 0;i < 51; i++){
    for(let j = 0;j < 51; j++){
      ctx.strokeRect(i*box, j*box, box, box);
    }
  }

  //голова змейки
  for(let i = 0;i < snake.length; i++){
    ctx.fillStyle = 'green';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    if(snake.length == 1){
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.arc(snake[0].x, snake[0].y, 5, 0, 2 * Math.PI);
      ctx.arc(snake[0].x + box, snake[0].y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  //яблоко
  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x, apple.y, box, box);
  ctx.fillRect(apple1.x, apple1.y, box, box);
  ctx.fillRect(apple2.x, apple2.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX == apple.x && snakeY == apple.y){
    apple = {
      x: (Math.floor(Math.random() * 51)) * box,
      y: (Math.floor(Math.random() * 51)) * box
    }
    //score
    score++;
    scoreSpan.innerHTML = score;
  }
  else if(snakeX == apple1.x && snakeY == apple1.y){
    apple1 = {
      x: (Math.floor(Math.random() * 51)) * box,
      y: (Math.floor(Math.random() * 51)) * box
    }
    //score
    score++;
    scoreSpan.innerHTML = score;
  }
  else if(snakeX == apple2.x && snakeY == apple2.y){
    apple2 = {
      x: (Math.floor(Math.random() * 51)) * box,
      y: (Math.floor(Math.random() * 51)) * box
    }
    //score
    score++;
    scoreSpan.innerHTML = score;
  }
  else{
    snake.pop();
  }

  //передвижения
  if(dir == 'left') snakeX -= box;
  if(dir == 'right') snakeX += box;
  if(dir == 'up') snakeY -= box;
  if(dir == 'down') snakeY += box;

  //границы
  if(snakeX == 51 * box){
    snakeX = 0;
  }
  else if(snakeX == -box){
    snakeX = 51 * box;
  }
  if(snakeY == 51 * box){
    snakeY = 0;
  }
  else if(snakeY == -box){
    snakeY = 51 * box;
  }

  let newSnake = {
    x: snakeX,
    y: snakeY
  }
  snake.unshift(newSnake);
}
