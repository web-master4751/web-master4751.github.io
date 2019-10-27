let color0 = document.getElementById('color');
let color = document.getElementById('color').value;
let bicer = document.getElementsByClassName('bicer');
let drawButton = document.getElementById('drawButton');
let clearButton = document.getElementById('clearButton');
let drawAllButton = document.getElementById('drawAllButton');
let colorView = document.getElementById('colorView');
let exitLines = document.getElementsByClassName('exit');
let bicerHoverColor;
let colorBack = '';
let drawAccept = true;
let lineAccept = false;
let pipette = false;
let colors = {};
let count = 0;

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

color0.onchange = function(){
  color = document.getElementById('color').value;
  drawAccept = true;
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
    for (let i = 0;i <= bicer.length;i++){
      try {
        bicer[i].style.cursor = "cell";
      }
      catch (e) {}
    }
  }
  else if(pipette) {
    pipette = false;
    for (let i = 0;i <= bicer.length;i++){
      try {
        bicer[i].style.cursor = "crosshair";
      }
      catch (e) {}
    }
  }
}

drawAllButton.onclick = function(){
  for (let i = 0;i <= bicer.length;i++){
    try {
      bicer[i].style.backgroundColor = color;
      count[0]++;
      for (let q = 0;q <= bicer.length;q++){
        if(q == i){
          colors[q] = color;
          if(q == bicer.length - 1){
            for (let num in colors) {
              if(num == bicer.length - 1){
                colorBack = colors[num];
                num++;
                console.log('Всего - ' + num);
            }
            }
          }
      }
    }
  }
    catch (e) {}
}
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

//Стартовый цикл
for (let i = 0;i <= bicer.length;i++){
  bicer[i].onmousedown = function(e){
    if(drawAccept && e.which == 1 && pipette != true){
      this.style.backgroundColor = color;
      lineAccept = true;
      for (let q = 0;q <= bicer.length;q++){
        if(q == i){
          colors[q] = color;
      }
    }
    }

    if(!drawAccept && e.which == 1 && pipette != true){
      this.style.backgroundColor = colorBack;
      lineAccept = true;
      for (let q = 0;q <= bicer.length;q++){
        if(q == i && colorBack == ''){
          delete colors[q];
      }
    }
    }
    else if(pipette && bicerHoverColor != '#81e639'){
      color = window.getComputedStyle(bicer[i]).backgroundColor;
      let nums = findNums(color);
      color0.value = rgbToHexNums(nums);
      pipette = false;
    }
    else if(pipette) pipette = false;
    if(!pipette && window.getComputedStyle(this).cursor == "cell"){
        bicer[i].style.cursor = "crosshair";
    }
  }

  bicer[i].onmouseover = function(){
    let numbers = findNums(window.getComputedStyle(this).backgroundColor);
    bicerHoverColor = rgbToHexNums(numbers);

    if(lineAccept && drawAccept && pipette != true){
      this.style.backgroundColor = color;
      for (let q = 0;q <= bicer.length;q++){
        if(q == i){
          colors[q] = color;
      }
    }
    }
    else if(lineAccept && pipette != true){
      this.style.backgroundColor = colorBack;
      for (let q = 0;q <= bicer.length;q++){
        if(q == i && colorBack == ''){
          delete colors[q];
      }
    }
    }
    else if(pipette && bicerHoverColor != '#81e639'){
      color = window.getComputedStyle(bicer[i]).backgroundColor;
      let nums = findNums(color);
      color0.value = rgbToHexNums(nums);
    }
    if(!pipette && window.getComputedStyle(this).cursor == "cell"){
      for (let i = 0;i <= bicer.length;i++){
        try {
          bicer[i].style.cursor = "crosshair";
        }
        catch (e) {}
      }
    }
    try {
      for (let z = 0;z <= exitLines.length;z++){
        exitLines[z].onmouseover = function(){
          lineAccept = false;
        }
      }
    } catch (e) {}
  }

  bicer[i].onmouseup = function(){
    lineAccept = false;
    pipette = false;
    //console.log(colors); //тормозит память == уменьшает продуктивность
    if(Object.keys(colors).length != 0){
      for (let num in colors) {
        count++;
        if (Object.keys(colors).length == count){
          console.log('Всего - ' + count);
          count = 0;
        }
      }
    }
    else{
      console.log('Всего - 0');
    }
}

  bicer[i].oncontextmenu = function(){
      return false;
}
}
