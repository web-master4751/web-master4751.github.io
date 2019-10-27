let btn = document.querySelectorAll('.arrow.down');
let div = document.querySelectorAll('.div_text');

for(let x = 0;x < btn.length;x++){
  btn[x].addEventListener('click', () => {
    if(btn[x].className == "arrow down"){
      btn[x].classList.remove('down');

      let text = document.createElement('div');
      text.className = 'lorem_two';
      text.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nam non alias officia provident et commodi earum sint quia, rem sapiente at atque adipisci fuga. Adipisci illum ad eos voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nam non alias officia provident et commodi earum sint quia, rem sapiente at atque adipisci fuga. Adipisci illum ad eos voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nam non alias officia provident et commodi earum sint quia, rem sapiente at atque adipisci fuga. Adipisci illum ad eos voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nam non alias officia provident et commodi earum sint quia, rem sapiente at atque adipisci fuga. Adipisci illum ad eos voluptatem.';
      div[x].append(text);
    }
    else{
      btn[x].classList.add('down');

      let lorem = div[x].querySelector('.lorem_two');
      lore.remove();
    }
  });
}
