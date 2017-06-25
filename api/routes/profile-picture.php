<?php

$app->post('/users/:userId/bands/:bandId/profile-pictures', function ($userId, $bandId) use ($app) {
    try {
        $db = new DbHandler();

        $token = $app->request->headers->get("token");

        if ($token) {
            verifyToken($token, $userId);

            $tmp_name = $_FILES["file"]["tmp_name"];
            $name = $_FILES["file"]["name"];

            $photo = [];
            $photo["bandId"] = $bandId;
            $photo["path"] = "images/profile-band-pic/$bandId" . "_" . "$name";

            $query = $db->getOneRecord("SELECT * FROM profilePics where bandId = '" . $bandId . "'");

            if ($query) {
                $db->updateRecord($photo, "profilePics", $bandId, "bandId");
                move_uploaded_file($tmp_name, $photo["path"]);
                $response["photoId"] = $query["profilePicId"];
            } else {
                $result = $db->insertIntoTable($photo, ["bandId", "path"], "profilePics");
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

$app->put('/users/:userId/bands/:bandId/profile-pictures/:profile-pictureId', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $profilePicture = json_decode($app->request->getBody());
        $profilePicture->bandId = $bandId;

        $db->updateRecord($profilePicture, "profilePics", $profilePicture->profilePictureId, "profilePictureId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

//Admin

$app->get("/admins/:adminId/profile-pictures/:profilePictureId", function ($adminId, $profilePictureId) use ($app) {
    $db = new DbHandler();
    $token = $app->request->headers->get("token");
    if ($token) {
        verifyToken($token, $adminId);
        $response = [];
        $response["profilePicture"] = $db->getOneRecord("SELECT * FROM profilePics where profilePictureId = '" . $profilePictureId . "'");
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put("/admins/:adminId/profile-pictures/:profilePictureId", function ($adminId, $profilePictureId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $profilePicture = json_decode($app->request->getBody());
        $db->execQuery("UPDATE profilePics SET isReported = $profilePicture->isReported  where profilePictureId = '" . $profilePictureId . "'");
        echoResponse(200, []);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});