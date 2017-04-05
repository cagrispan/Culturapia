<?php

//User

$app->get('/users/:userId/bands/:bandId/questions/:questionId/alternatives', function ($userId, $bandId, $questionId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $alternatives = $db->getRecords("SELECT * FROM alternatives where questionId = " . $questionId, 0, 1000);
        $response["alternatives"] = $alternatives;
        echoResponse(200, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:userId/bands/:bandId/questions/:questionId/alternatives', function ($userId, $bandId, $questionId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $alternative = json_decode($app->request->getBody());
        $alternative->bandId = $bandId;
        $alternative->questionId = $questionId;
        $alternative->isDeleted = 0;

        $result = $db->insertIntoTable($alternative, ["bandId", "questionId", "description", "isDeleted"], "alternatives");

        if ($result) {
            $response["alternativeId"] = $result;
            echoResponse(201, $response);
        } else {
            $response["code"] = "error";
            $response["message"] = "Não foi possível inserir a notícia. Tente novamente.";
            echoResponse(500, $response);
        }

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put('/users/:userId/bands/:bandId/questions/:questionId/alternatives/:alternativeId', function ($userId, $bandId, $questionId, $alternativeId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $alternative = json_decode($app->request->getBody());
        $alternative->bandId = $bandId;
        $alternative->bandId = $questionId;

        $db->updateRecord($alternative, "alternatives", $alternative->alternativeId, "alternativeId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});