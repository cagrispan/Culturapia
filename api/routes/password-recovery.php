<?php
/* Definir Usuário e Senha do Gmail de onde partirá os emails*/
define('GUSER', 'recuperarsenha@culturapia.com.br');
define('GPWD', 'vidalouca73');

function smtpmailer($user, $password)
{

    $line1 = 'Olá, ' . $user["name"] . '!';
    $line2 = 'Sua nova senha é: <b>' . $password . '</b>';


    $mail = new PHPMailer();

    $mail->isSMTP();
    $mail->Host = 'smtp.culturapia.com.br';
    $mail->SMTPAuth = true;
    $mail->Username = GUSER;
    $mail->Password = GPWD;
    $mail->SMTPSecure = false;
    $mail->SMTPAutoTLS = false;
    $mail->Port = 587;
    $mail->setFrom(GUSER, 'Culturapia');
    $mail->addAddress($user["email"]);
    $mail->isHTML(true);
    $mail->ContentType = "text/html";
    $mail->CharSet = "UTF-8";
    $mail->SMTPDebug = 2;

    $mail->Subject = 'Nova senha - Culturapia';
    $mail->Body = '<p>' . $line1 . '</p><br><p>' . $line2 . '</p>';

    if (!$mail->send()) {
        echoResponse(500, 'Mailer Error: ' . $mail->ErrorInfo);
    } else {
        echoResponse(200, 'Message has been sent');
    }
}

$app->post("/recover", function () use ($app) {
    $db = new DbHandler();

    $user = json_decode($app->request->getBody());

    $password = substr(md5(microtime()),rand(0,26),5);

    if (isset($user->email)) {
        $query = $db->getOneRecord("SELECT * FROM users WHERE email = '" . $user->email . "'");

        $response["message"] = "Email não cadastrado";

        if (!$query) {
            echoResponse(400, $response);
        } else {
            $query["password"] = md5($password);
            $db->updateRecord($query, "users", $query["userId"], "userId");
            smtpmailer($query, $password);
        }
    }

});

