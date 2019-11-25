let time = document.querySelector('.time');
let color = document.querySelector('.color');
let stop = document.querySelector('.stop');
let start = setInterval(returnTime, 1000);
let call = true;

function returnTime(){
  let timeNow = new Date();

  let hh = timeNow.getHours();
  if(hh < 10) hh = '0' + hh;

  let mm = timeNow.getMinutes();
  if(mm < 10) mm = '0' + mm;

  let ss = timeNow.getSeconds();
  if(ss < 10) ss = '0' + ss;

  let time0 =  hh + ':' + mm + ':' + ss;
  let color0 =  '#' + hh + mm + ss;
  let color1 = '#' + ss + ss + ss;

  time.textContent = time0;
  color.textContent = color0;

  document.body.style.backgroundColor = color0;
  stop.style.backgroundColor = color1;
  stop.style.color = '#fff';
}

function stopTime(){
  if(call == false) {
    call = true;
    start = setInterval(returnTime, 1000);
    returnTime();
  }
  else if(call == true) {
    call = false;
    clearInterval(start);
    stop.style.color = 'red';
  }
}
stop.addEventListener('mousedown', stopTime);

returnTime();
