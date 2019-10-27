<?php require "db.php"?>

<link rel="shortcut icon" href="img/food.png" type="image/png">
<link rel="stylesheet" href="/media/style.css">

<?php if(isset($_SESSION['logged_user'])) : ?>
  <div>Привет, <?php  echo $_SESSION['logged_user']->login; ?>!<hr></div>

  <a href="/logout.php">Выйти</a>

<?php elseif(!isset($_SESSION['logged_user'])) : ?>
<a class="main" href="/login.php">Войти</a>
<br>
<a class="main" href="/signup.php">Регистрация</a>
<?php endif; ?>
