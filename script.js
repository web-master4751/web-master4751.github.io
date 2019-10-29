let btn = document.querySelectorAll('.arrow');
let div = document.querySelectorAll('.div_text');

for(let x = 0;x < btn.length;x++){
  btn[x].addEventListener('click', () => {
    if(btn[x].className == "arrow down"){
      for(let y = 0;y < btn.length;y++){
        if(x != y){
          btn[y].classList.add('down');
          div[y].style.display = 'none';
        }
      }
      btn[x].classList.remove('down');
      div[x].style.display = 'block';
    }
  });
}
