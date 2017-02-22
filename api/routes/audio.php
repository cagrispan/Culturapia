<?php

//Open

$app->get('/audios', function () use ($app) {
    $db = new DbHandler();
    $response["audios"] = $db->getRecords("SELECT * FROM audios", 0, 1000);
    echoResponse(201, $response);
});

//User

$app->get('/users/:userId/bands/:bandId/audios', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);
        $response["audios"] = $db->getRecords("SELECT * FROM audios where bandId = " . $bandId, 0, 1000);
        echoResponse(201, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }

});

$app->post('/users/:userId/bands/:bandId/audios', function ($userId, $bandId) use ($app) {
    try {
        $db = new DbHandler();

        $token = $app->request->headers->get("token");

        if ($token) {
            verifyToken($token, $userId);

            $tmp_name = $_FILES["file"]["tmp_name"];
            $fileName = $_FILES["file"]["name"];
            $size = $_FILES["file"]["size"];

            $musicName = $_POST["name"];

            $audio = [];
            $audio["bandId"] = $bandId;
            $audio["name"] = $musicName;
            $audio["path"] = "audios/$bandId" . "_" . $size . "_" . basename($fileName);
            $audio["isDeleted"] = 0;

            $query = $db->getOneRecord("SELECT * FROM audios where path = '" . $audio["path"] . "'");

            if ($query) {
                $db->updateRecord($audio, "audios", $audio["path"], "path");
                $response = $query;
            } else {
                $result = $db->insertIntoTable($audio, ["bandId", "name", "path", "isDeleted"], "audios");

                move_uploaded_file($tmp_name, $audio["path"]);
                $response["audioId"] = $result;
            }

            echoResponse(201, $response);

        } else {
            $response["message"] = "Unauthorized. Missing token.";
            echoResponse(401, $response);
        }
    } catch (PDOException $e) {
        $response["message"] = "Error. " . $e->getMessage();
        echoResponse(500, $response);
    }
});

$app->put('/users/:userId/bands/:bandId/audios/:audioId', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $audio = json_decode($app->request->getBody());
        $audio->bandId = $bandId;

        $db->updateRecord($audio, "audios", $audio->audioId, "audioId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});