<?php
require "db.php";

$data = $_POST;
if(isset($data['logIn'])){

  $errors = array();

  if(trim($data['login']) == ''){
  $errors[] = "Введите логин!";
}
  if($data['pass'] == ''){
  $errors[] = "Введите пароль!";
}
  if(empty($errors)){
    $user = R::findOne('users', 'login = ?', array($data['login']));

    if($user){
      //Есть логин
      if($data['pass'] == $user->password){
        //Вход
        $_SESSION['logged_user'] = $user;
        header('Location: /');
      }
      else{
        $errors[] = "Пароль неверный!";
        echo '<div class="notice" style="color: red;">'.array_shift($errors).'</div><hr><a class="to-home" href="/">На главную</a>';
      }
    }
    elseif($id == $lol){
      $errors[] = "Нет такого логина!";
      echo '<div class="notice" style="color: red;">'.array_shift($errors).'</div><hr><a class="to-home" href="/">На главную</a>';
    }
  }
  else{
    echo '<div class="notice" style="color: red;">'.array_shift($errors).'</div><hr><a class="to-home" href="/">На главную</a>';
  }
}
?>
<link rel="shortcut icon" href="img/food.png" type="image/png">
<link rel="stylesheet" href="/media/style.css">

<div class="box">
<h1>Войти</h1>
<form action="/login.php" method="post">
  <div class="input"><input type="text" class="form" name="login" value = "<?php echo @$data['login']; ?>" placeholder="Ваш логин"></div>
  <div class="input"><input type="password" class="form" name="pass" value = "<?php echo @$data['pass']; ?>" placeholder="Ваш пароль"></div>
  <div class="input"><input type="submit" class="form"  name="logIn"></div>
</form>
</div>
