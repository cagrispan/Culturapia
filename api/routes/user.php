<?php

$app->get("/users", function () use ($app) {
    $db = new DbHandler();
    $queryUser = $db->getRecords("SELECT userId, name, city, state FROM users", 0, 1000);
    $response = $queryUser;
    echoResponse(200, $response);
});

$app->post("/users", function () use ($app) {
    $db = new DbHandler();

    $user = json_decode($app->request->getBody());

    $result = $db->getOneRecord("SELECT * FROM users where email = '" . $user->email . "'");

    $response = [];


    if ($result) {
        $response["message"] = "Email já cadastrado.";
        echoResponse(409, $response);
    } else {
        $user->accepted = date('Y-m-d H:i:s', time());
        $result['userId'] = $db->insertIntoTable($user, ["name", "email", "password", "accepted"], "users");
        echoResponse(201, $result);
    }

});

$app->get("/users/:userId", function ($userId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $queryUser = $db->getOneRecord("SELECT userId, facebookId, name, phone, email, birthday, cep, address, number, complement, neighborhood, city, state FROM users where userId = " . $userId);
        $response = $queryUser;

        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put("/users/:userId", function ($userId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);
        $user = json_decode($app->request->getBody());

        if($user->accepted === true){
            $user->accepted = date('Y-m-d H:i:s', time());
        }

        foreach ($user as $key => $value) {
            if ($value == null) {
                unset($user->$key);
            }
        }

        $db->updateRecord($user, "users", $userId, "userId");
        echoResponse(204, "");
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }

});

$app->post("/users/:userId/password", function ($userId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);
        $userPasswords = json_decode($app->request->getBody());
        $obj = [];
        $obj["password"] = $userPasswords->newPassword;

        $user = [];
        $user["userId"] = $userId;

        $result = $db->getOneRecord("SELECT * FROM users where userId = '" . $userId . "'");

        if ($result) {
            if ($result["password"] == $userPasswords->oldPassword || $result["password"] == "") {

                $db->execQuery("UPDATE users SET password = '" . $userPasswords->newPassword . "' WHERE userId = '" . $userId . "'");

                echoResponse(204, null);

            } else {
                sendError(401, "Usuário ou senha incorretos.");
            }
        } else {
            sendError(401, "Usuário ou senha incorretos.");
        }

        $db->updateRecord($user, "users", $userId, "userId");
        echoResponse(204, "");
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }

});