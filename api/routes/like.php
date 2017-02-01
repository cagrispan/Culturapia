<?php

//Open

$app->get("/videos/:videoId/likes", function ($videoId) use ($app) {
    $db = new DbHandler();
    $response = [];
    $response["likes"] = $db->getRecords("SELECT * FROM likes where videoId = '" . $videoId . "' AND unliked = 0");
    echoResponse(200, $response);
});

$app->get("/photos/:photoId/likes", function ($photoId) use ($app) {
    $db = new DbHandler();
    $response = [];
    $response["likes"] = $db->getRecords("SELECT * FROM likes where photoId = " . $photoId . " AND unliked = 0");
    echoResponse(200, $response);
});

$app->get("/notices/:noticeId/likes", function ($noticeId) use ($app) {
    $db = new DbHandler();
    $response = [];
    $response["likes"] = $db->getRecords("SELECT * FROM likes where noticeId = " . $noticeId . " AND unliked = 0");
    echoResponse(200, $response);
});

// User

$app->post("/users/:userId/likes", function ($userId) use ($app) {
    if ($userId) {

        $token = $app->request->headers->get("token");
        verifyToken($token, $userId);

        $likedContent = json_decode($app->request->getBody());

        $db = new DbHandler();

        $query = $db->getOneRecord(
            "SELECT * FROM likes where userId = " . $userId .
            " AND photoId = " . $likedContent->photoId .
            " AND videoId = '" . $likedContent->videoId .
            "' AND audioId = " . $likedContent->audioId .
            " AND noticeId = " . $likedContent->noticeId);

        if (!$query) {
            $likedContent->likeDate = date("Y-m-d H:i:s");
            $likedContent->unliked = 0;

            $result = $db->insertIntoTable($likedContent, ["photoId", "videoId", "audioId", "noticeId", "userId", "bandId", "likeDate", "unliked", "city", "state", "neighborhood"], "likes");
        } else {
            if ($query["unliked"] == 0) {
                $likedContent->unliked = 1;
            } else {
                $likedContent->unliked = 0;
            }

            $db->updateRecord($likedContent, "likes", $query["likeId"], "likeId");
            $result = $query["likeId"];
        }

        $response["likeId"] = $result;
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

$app->get('/users/:userId/bands/:bandId/content-likes', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    $response = [];

    if ($token) {
        verifyToken($token, $userId);
        $response["contentLikes"] = $db->getRecords("SELECT * FROM likes where bandId = " . $bandId, 0, 1000);
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});