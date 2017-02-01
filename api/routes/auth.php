<?php

//Open

$app->post("/auth", function () use ($app) {
    $resultId = null;

    $type = $app->request->headers->get("type");

    $user = json_decode($app->request->getBody());

    $db = new DbHandler();


    //FACEBOOK LOGIN
    if ($type == 'facebook') {

        //Should be verifying if this facebookId is valid;
        $result = $db->getOneRecord("SELECT * FROM users where facebookId = '" . $user->facebookId . "'");

        if (!$result) {
            $resultId = $db->insertIntoTable($user, ["name", "facebookId", "facebookToken"], "users");
            $result = $db->getOneRecord("SELECT * FROM users where userId = " . $resultId);
        }

        if ($result) {
            sendToken($result);
        }

        //REGULAR LOGIN
    } else if ($type == 'user') {

        $result = $db->getOneRecord("SELECT * FROM users where email = '" . $user->email . "'");

        if ($result) {
            if ($result["password"] == $user->password) {
                sendToken($result);
            } else {
                sendError(401, "Usuário ou senha incorretos.");
            }
        } else {
            sendError(401, "Usuário ou senha incorretos.");
        }

    } else if ($type == 'admin') {

        $result = $db->getOneRecord("SELECT * FROM admins where email = '" . $user->email . "'");

        if ($result) {
            if ($result["password"] == $user->password) {
                $response["name"] = $result["name"];
                $response["email"] = $result["email"];
                $response["adminId"] = $result["adminId"];
                $response["token"] = JWT::encode($result["adminId"], "mySecurityPhrase");
                echoResponse(200, $response);
            } else {
                sendError(401, "Usuário ou senha incorretos.");
            }
        } else {
            sendError(401, "Usuário ou senha incorretos.");
        }

    } else {
        sendError(401, "Não autorizado. Contate o administrador do sistema.");
    }
});

function sendToken($user)
{
    $user["token"] = JWT::encode($user["userId"], "mySecurityPhrase");
    echoResponse(200, $user);
}

function sendError($code, $message)
{
    $response = Array();
    $response["message"] = $message;
    echoResponse($code, $response);
}

?>