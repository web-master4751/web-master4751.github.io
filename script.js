let btn = document.querySelectorAll('.arrow.down');
let div = document.querySelectorAll('.div_text');

for(let x = 0;x < btn.length;x++){
  btn[x].addEventListener('click', () => {
    if(btn[x].className == "arrow down"){
      btn[x].classList.remove('down');
      div[x].style.display = 'block';
    }
    else{
      btn[x].classList.add('down');
      div[x].style.display = 'none';
    }
  });
}
