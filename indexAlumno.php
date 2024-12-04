<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Login</title>
</head>
<body>
    <div class="login-page">
        <div class="form">
          <form action="loginAlumno.php" method="POST" class="login-form">
            <input type="text" name="usuario" placeholder="Usuario" required />
            <input type="password" name="contapass" placeholder="Contraseña" required />
            <button type="submit">Ingresar</button>
          </form>
        </div>
    </div>
</body>
</html>