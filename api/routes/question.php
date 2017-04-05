<?php

//User

$app->get('/users/:userId/bands/:bandId/questions', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $questions = $db->getRecords("SELECT * FROM questions where bandId = " . $bandId, 0, 1000);
        $size = count($questions);
        for ($i = 0; $i < $size; $i++) {
            $questionId = $questions[$i]["questionId"];
            $questions[$i]["responses"] = $db->getRecords("SELECT * FROM userResponses where questionId = '$questionId'", 0, 1000);
        }
        $response["questions"] = $questions;
        echoResponse(200, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:userId/bands/:bandId/questions', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $question = json_decode($app->request->getBody());
        $question->bandId = $bandId;
        $question->isDeleted = 0;
        $question->isReported = 0;

        $result = $db->insertIntoTable($question, ["bandId", "description", "isDeleted", "isReported"], "questions");

        if ($result) {
            $response["questionId"] = $result;
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

$app->put('/users/:userId/bands/:bandId/questions/:questionId', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $question = json_decode($app->request->getBody());
        $question->bandId = $bandId;

        $db->updateRecord($question, "questions", $question->questionId, "questionId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->get('/users/:userId/bands/:bandId/questions/:questionId', function ($userId, $bandId, $questionId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $question = $db->getOneRecord("SELECT * FROM questions where questionId = " . $questionId);
        echoResponse(204, $question);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

//Admin

$app->get("/admins/:adminId/questions/:questionId", function ($adminId, $questionId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $response = [];
        $response["question"] = $db->getOneRecord("SELECT * FROM questions where questionId = " . $questionId);
        $response["question"]["alternatives"] = $db->getRecords("SELECT * FROM alternatives where questionId = '$questionId'", 0, 100);
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put("/admins/:adminId/questions/:questionId", function ($adminId, $questionId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $question = json_decode($app->request->getBody());
        $db->execQuery("UPDATE questions SET isReported = $question->isReported  where questionId = " . $questionId);
        echoResponse(200, []);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});