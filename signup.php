<?php
require "db.php";

$data = $_POST;
if(isset($data['signup'])){
  $errors = array();
  $lol = R::count('users');

  for($id = 1; $id <= $lol; $id++){
  $log = R::load('users', $id);

  if(trim($data['login']) == $log->login){
    $errors[] = "Такой логин уже существует!";
    break;
  }
  if(trim($data['email']) == $log->email){
    $errors[] = "Такой email уже существует!";
    break;
  }
}
  if(trim($data['login']) == ''){
    $errors[] = "Введите логин!";
  }
  if(trim($data['email']) == ''){
    $errors[] = "Введите email!";
  }
  if($data['pass_1'] == ''){
    $errors[] = "Введите пароль!";
  }
  if($data['pass_2'] == ''){
    $errors[] = "Введите пароль еще раз!";
  }
  if($data['pass_2'] != $data['pass_1']){
    $errors[] = "Введенные пароли не совпадают!";
  }

  if(empty($errors)){
  $user = R::dispense('users');
  $user->login = $data['login'];
  $user->email = $data['email'];
  $user->password = $data['pass_1'];
  R::store($user);
  echo '<div class="notice" style="color: green;">Вы успешно зарегистрировались!</div><hr><a class="to-home" href="/">На главную</a>';
}
else{
  echo '<div class="notice" style="color: red;">'.array_shift($errors).'</div><hr><a class="to-home" href="/">На главную</a>';
}
}
?>
<link rel="shortcut icon" href="img/food.png" type="image/png">
<link rel="stylesheet" href="/media/style.css">

<div class="box">
<h1>Регистрация</h1>
<form action="/signup.php" method="post">
  <div class="input"><input type="text" class="form" name="login" value = "<?php echo @$data['login']; ?>" placeholder="Ваш логин"></div>
  <div class="input"><input type="email" class="form" name="email" value = "<?php echo @$data['email']; ?>" placeholder="Ваш email"></div>
  <div class="input"><input type="password" class="form" name="pass_1" value = "<?php echo @$data['pass_1']; ?>" placeholder="Ваш пароль"></div>
  <div class="input"><input type="password" class="form" name="pass_2" value = "<?php echo @$data['pass_2']; ?>" placeholder="Ваш пароль еще раз"></div>
  <div class="input"><input type="submit" class="form" name="signup"></div>
</form>
</div>
