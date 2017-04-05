<?php

//Open

$app->get("/questions/:questionId/responses", function ($questionId) use ($app) {
    $db = new DbHandler();
    $response = [];
    $response["responses"] = $db->getRecords("SELECT * FROM userResponses where questionId = '" . $questionId . "'");
    echoResponse(200, $response);
});

// User

$app->post("/users/:userId/responses", function ($userId) use ($app) {
    if ($userId) {

        $token = $app->request->headers->get("token");
        verifyToken($token, $userId);

        $userResponse = json_decode($app->request->getBody());

        $db = new DbHandler();

        $query = $db->getOneRecord(
            "SELECT * FROM userResponses where userId = " . $userId .
            " AND questionId = " . $userResponse->questionId);

        if (!$query) {
            $result = $db->insertIntoTable($userResponse, ["userId", "questionId", "alternativeId"], "userResponses");
        } else {
            $db->updateRecord($userResponse, "userResponses", $query["responseId"], "responseId");
            $result = $query["responseId"];
        }

        $response["responseId"] = $result;
        echoResponse(201, $response);
    } else {
        $response["message"] = "Unauthorized. Missing header userId.";
        echoResponse(401, $response);
    }
});

$app->get('/users/:userId/bands/:bandId/likes', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    $response = [];

    if ($token) {
        verifyToken($token, $userId);
        $response["likes"] = $db->getRecords("SELECT * FROM likes where videoId='-1' AND photoId='-1' AND noticeId='-1' AND audioId='-1' AND unliked = 0 AND bandId = " . $bandId, 0, 1000);
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});