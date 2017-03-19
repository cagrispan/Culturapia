<?php

//User

$app->get('/users/:userId/bands/:bandId/photos', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $photos = $db->getRecords("SELECT * FROM photos where bandId = " . $bandId, 0, 1000);
        $size = count($photos);
        for ($i = 0; $i < $size; $i++) {
            $photoId = $photos[$i]["photoId"];
            $photos[$i]["likes"] = $db->getRecords("SELECT * FROM likes where photoId = '$photoId' AND unliked = 0", 0, 100);
        }
        $response["photos"] = $photos;
        echoResponse(201, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:userId/bands/:bandId/photos', function ($userId, $bandId) use ($app) {
    try {
        $db = new DbHandler();

        $token = $app->request->headers->get("token");

        if ($token) {
            verifyToken($token, $userId);

            $tmp_name = $_FILES["file"]["tmp_name"];
            $name = $_FILES["file"]["name"];
            $size = $_FILES["file"]["size"];

            $photo = [];
            $photo["bandId"] = $bandId;
            $photo["path"] = "images/$bandId" . "_" . "$name" . "_" . "$size";
            $photo["isDeleted"] = 0;

            $photo["description"] = $_POST["description"];

            $query = $db->getOneRecord("SELECT * FROM photos where path = '" . $photo["path"] . "'");

            if ($query) {
                $db->updateRecord($photo, "photos", $photo["path"], "path");
                $response = $query;
            } else {
                $result = $db->insertIntoTable($photo, ["bandId", "path", "isDeleted", "description"], "photos");
                move_uploaded_file($tmp_name, $photo["path"]);
                $response["photoId"] = $result;
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

$app->put('/users/:userId/bands/:bandId/photos/:photoId', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $photo = json_decode($app->request->getBody());
        $photo->bandId = $bandId;

        $db->updateRecord($photo, "photos", $photo->photoId, "photoId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->get('/users/:userId/bands/:bandId/photos/:photoId', function ($userId, $bandId, $photoId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $photo = $db->getOneRecord("SELECT * FROM photos where photoId = " . $photoId);
        echoResponse(204, $photo);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

//Admin

$app->get("/admins/:adminId/photos/:photoId", function ($adminId, $photoId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $response = [];
        $response["photo"] = $db->getOneRecord("SELECT * FROM photos where photoId = " . $photoId);
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put("/admins/:adminId/photos/:photoId", function ($adminId, $photoId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $photo = json_decode($app->request->getBody());
        $db->execQuery("UPDATE photos SET isReported = $photo->isReported  where photoId = " . $photoId);
        echoResponse(200, []);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});