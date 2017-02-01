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