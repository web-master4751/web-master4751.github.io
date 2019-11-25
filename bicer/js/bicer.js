let color0 = document.getElementById('color');
let color = document.getElementById('color').value;
let docVersion = document.getElementsByClassName('docVersion')[0].textContent;
let bicer = document.getElementsByClassName('bicer');
let rangeTwo = document.querySelectorAll('.range.two');
let rangeLast = document.querySelector('.range.last:last-child');
let drawButton = document.getElementById('drawButton');
let clearButton = document.getElementById('clearButton');
let drawAllButton = document.getElementById('drawAllButton');
let colorView = document.getElementById('colorView');
let width = document.getElementById('width');
let bicerHoverColor, input, input2, div, count, recentPanel, recentColor;
let widthNormal = 7;
let colorBack = '';
let color1 = '';
let drawAccept = true;
let lineAccept = false;
let pipette = false;
let x = 0;
let colors = [];
colors[x] = {};
let z = 0;

function rgbToHexNums(nums){
  let str1 = String(nums.replace(/\d+/,""));
  let str2 = String(str1.replace(/\d+/,""));

  let r = +nums.match(/\d+/);
  let g = +str1.match(/\d+/);
  let b = +str2.match(/\d+/);

  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;

  return ('#' + r + g + b);
}

function rgbToHex(r, g, b){

  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;

  return ('#' + r + g + b);
}

function findNums(color){
  let str = color;

  let nums = String(str.match(/\d+/g)); //r, g, b

  return nums;
}

function changeWidth(){
  let widthValue = +document.getElementById('width').value;
  if(widthValue > widthNormal){
    if(widthValue < 27){
      //Увеличиваем
      for(let w = 0;w < widthValue-widthNormal;w++){
        for(let y = 0;y < rangeTwo.length;y++){
          input = document.createElement('input');
          input.type = "button";
          input.className = "bicer";
          rangeTwo[y].append(input);
        }

        div = document.createElement('div');
        div.className = "range last";

        for(let x = 0;x < z+8;x++){
          input2 = document.createElement('input');
          input2.type = "button";
          input2.className = "bicer";
          div.append(input2);
        }

        rangeLast = document.querySelector('.range.last:last-child');
        rangeLast.after(div);

        if(docVersion == 'bicer2'){
          div = div.cloneNode(div);
          rangeLast.after(div);
        }
        if(docVersion == 'bicer3'){
          div = div.cloneNode(div);
          rangeLast.after(div);
          div = div.cloneNode(div);
          rangeLast.after(div);
        }
        z++;
      }
      widthNormal = widthValue;
      //Перезапуск цикла
      start();
    }
    else{
      document.getElementById('width').value = 26;
    }
  }
  else if(widthValue < widthNormal){
    if(widthValue > 1){
      //Уменьшаем
      for(let i = 0;i < Math.abs(widthValue-widthNormal);i++){
        for(let y = 0;y < rangeTwo.length;y++){
          let rangeTwoLastBicer = document.querySelectorAll('.range.two > .bicer:last-child');
          rangeTwoLastBicer[y].remove();
        }
        rangeLast = document.querySelector('.range.last:last-child');
        rangeLast.remove();

        if(docVersion == 'bicer2'){
          rangeLast = document.querySelector('.range.last:last-child');
          rangeLast.remove();
        }
        if(docVersion == 'bicer3'){
          rangeLast = document.querySelector('.range.last:last-child');
          rangeLast.remove();
          rangeLast = document.querySelector('.range.last:last-child');
          rangeLast.remove();
        }
        z--;
      }
      widthNormal = widthValue;
      //Перезапуск цикла
      start();
    }
    else{
      document.getElementById('width').value = 2;
    }
  }
}

function setColor(){
  recentPanel = document.querySelector('.recentPanel');
  recentColor = document.createElement('input');

  recentColor.type = 'button';
  recentColor.className = 'recentColor';
  recentColor.style.backgroundColor = color;

  recentPanel.append(recentColor);

  recentColor.onmousedown = function(){
    color = window.getComputedStyle(recentColor).backgroundColor;
    let nums = findNums(color);
    color0.value = rgbToHexNums(nums);
    color = rgbToHexNums(nums);
  }
}

document.body.onmousemove = function(e){
  if(e.which == 0) lineAccept = false;
}

color0.onchange = function(){
  color = document.getElementById('color').value;
  drawAccept = true;
  pipette = false;
  x++;
  colors[x] = {};
}

drawButton.onclick = function(){
  drawAccept = true;
}

clearButton.onclick = function(){
  drawAccept = false;
}

colorView.onclick = function(){
  if(!pipette) {
    pipette = true;
    for (let i = 0;i < bicer.length;i++){
      bicer[i].style.cursor = "cell";
    }
  }
  else if(pipette) {
    pipette = false;
    for (let i = 0;i < bicer.length;i++){
      bicer[i].style.cursor = "crosshair";
    }
  }
}

drawAllButton.onclick = function(){
  for (let i = 0;i < bicer.length;i++){
    bicer[i].style.backgroundColor = color;
  }
  colorBack = color;
  color1 = color;
  pipette = false;
}

drawButton.oncontextmenu = function(){
  return false;
}
clearButton.oncontextmenu = function(){
  return false;
}
drawAllButton.oncontextmenu = function(){
  return false;
}
color0.oncontextmenu = function(){
  return false;
}
colorView.oncontextmenu = function(){
  return false;
}
width.oncontextmenu = function(){
  return false;
}


//Стартовый цикл
function start(){
  for (let i = 0;i < bicer.length;i++){
    bicer[i].onmousedown = function(e){
      if(drawAccept && e.which == 1 && pipette != true){
        this.style.backgroundColor = color;
        lineAccept = true;
        for (let q = 0;q < bicer.length;q++){
          if(q == i){
            colors[x][q] = color;
        }
      }
      }

      if(!drawAccept && e.which == 1 && pipette != true){
        this.style.backgroundColor = colorBack;
        lineAccept = true;
        for (let q = 0;q < bicer.length;q++){
          if(q == i && colorBack == color1){
            delete colors[x][q];
        }
      }
      }
      else if(pipette && bicerHoverColor != '#81e640'){
        color = window.getComputedStyle(bicer[i]).backgroundColor;
        let nums = findNums(color);
        color0.value = rgbToHexNums(nums);
        color = rgbToHexNums(nums);
        pipette = false;
        drawAccept = true;
      }
      else if(pipette){
        pipette = false;
        drawAccept = true;
      }
      if(!pipette && window.getComputedStyle(this).cursor == "cell"){
        bicer[i].style.cursor = "crosshair";
      }
    }

    bicer[i].onmouseover = function(){
      let numbers = findNums(window.getComputedStyle(this).backgroundColor);
      bicerHoverColor = rgbToHexNums(numbers);

      if(lineAccept && drawAccept && pipette != true){
        this.style.backgroundColor = color;
        for (let q = 0;q < bicer.length;q++){
          if(q == i){
            colors[x][q] = color;
        }
      }
      }
      else if(lineAccept && pipette != true){
        this.style.backgroundColor = colorBack;
        for (let q = 0;q < bicer.length;q++){
          if(q == i && colorBack == color1){
            delete colors[x][q];
        }
      }
      }
      else if(pipette && bicerHoverColor != '#81e640'){
        color = window.getComputedStyle(this).backgroundColor;
        let nums = findNums(color);
        color0.value = rgbToHexNums(nums);
        color = rgbToHexNums(nums);
      }
    }

    bicer[i].onmousemove = function(){
      if(!pipette && window.getComputedStyle(this).cursor == "cell"){
        for (let i = 0;i < bicer.length;i++){
          bicer[i].style.cursor = "crosshair";
        }
      }
    }

    bicer[i].onmouseup = function(){
      lineAccept = false;
      pipette = false;
      //console.log(colors);
      if(Object.keys(colors[x]).length != 0 && count != Object.keys(colors[x]).length){
        console.log(color + ' - ' + Object.keys(colors[x]).length);
        count = Object.keys(colors[x]).length;
      }
      else if(Object.keys(colors[x]).length == 0){
        console.log(color + ' - 0');
      }
    }

    bicer[i].oncontextmenu = function(){
      return false;
    }
    bicer[i].ondragstart = function(){
      return false;
    }
  }
}
//Смена ширины
width.onchange = changeWidth;
start();
changeWidth();
