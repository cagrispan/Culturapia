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

    $result['userId'] = $db->insertIntoTable($user, ["name", "email", "password"], "users");
    echoResponse(201, $result);
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