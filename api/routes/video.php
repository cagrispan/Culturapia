<?php

//Open

$app->get('/videos', function () use ($app) {
    $db = new DbHandler();

    $query = $db->getRecords("select videos.*, liked.likeCount from bands, videos join (select videoId, count(*) as likeCount from likes where unliked = 0 group by videoId) as liked on videos.videoId = liked.videoId where bands.bandId = videos.bandId AND bands.isDeleted = 0 order by liked.likeCount desc", 0, 1000);

    $size = count($query);

    for($i=0; $i<$size; $i++){
        $videoId = $query[$i]["videoId"];
        $query[$i]["likes"] = $db->getRecords("SELECT * FROM likes where videoId = '$videoId' AND unliked = 0", 0, 100);
    }

    $response["videos"] = $query;
    echoResponse(200, $response);
});

//User

$app->get('/users/:userId/bands/:bandId/videos', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    $response = [];

    if ($token) {
        verifyToken($token, $userId);
        $videos = $db->getRecords("SELECT * FROM videos where bandId = " . $bandId, 0, 1000);
        $size = count($videos);
        for ($i = 0; $i < $size; $i++) {
            $videoId = $videos[$i]["videoId"];
            $videos[$i]["likes"] = $db->getRecords("SELECT * FROM likes where videoId = '$videoId' AND unliked = 0", 0, 100);
        }
        $response["videos"] = $videos;
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:userId/bands/:bandId/videos', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $video = json_decode($app->request->getBody());
        $video->isDeleted = 0;
        $video->isReported = 0;

        $query = $db->getOneRecord("SELECT * FROM videos where videoId = '" . $video->videoId . "'");

        if ($query) {
            $db->updateRecord($video, "videos", $video->videoId, "videoId");
            $response["videoId"] = $video->videoId;
        } else {
            $result = $db->insertIntoTable($video, ["bandId", "videoId", "title", "description", "band", "city", "state", "style", "isDeleted"], "videos");
            $response["videoId"] = $result;
        }

        echoResponse(201, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->get('/users/:userId/bands/:bandId/videos/:videoId', function ($userId, $videoId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);
        $video = $db->getOneRecord("SELECT * FROM videos where videoId = '" . $videoId . "'");
        $video["likes"] = $db->getRecords("SELECT * FROM likes where videoId = '$videoId' AND unliked = 0", 0, 100);
        echoResponse(204, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put('/users/:userId/bands/:bandId/videos/:videoId', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $video = json_decode($app->request->getBody());
        $video->bandId = $bandId;

        $db->updateRecord($video, "videos", $video->videoId, "videoId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

//Admin

$app->get("/admins/:adminId/videos/:videoId", function ($adminId, $videoId) use ($app) {
    $db = new DbHandler();
    $token = $app->request->headers->get("token");
    if ($token) {
        verifyToken($token, $adminId);
        $response = [];
        $response["video"] = $db->getOneRecord("SELECT * FROM videos where videoId = '" . $videoId . "'");
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put("/admins/:adminId/videos/:videoId", function ($adminId, $videoId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $video = json_decode($app->request->getBody());
        $db->execQuery("UPDATE videos SET isReported = $video->isReported  where videoId = '" . $videoId . "'");
        echoResponse(200, []);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});