<?php

//User

$app->get('/users/:userId/bands/:bandId/notices', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $notices = $db->getRecords("SELECT * FROM notices where bandId = " . $bandId, 0, 1000);
        $size = count($notices);
        for ($i = 0; $i < $size; $i++) {
            $noticeId = $notices[$i]["noticeId"];
            $notices[$i]["likes"] = $db->getRecords("SELECT * FROM likes where noticeId = '$noticeId' AND unliked = 0", 0, 100);
        }
        $response["notices"] = $notices;
        echoResponse(200, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:userId/bands/:bandId/notices', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $notice = json_decode($app->request->getBody());
        $notice->bandId = $bandId;
        $notice->date = formatDate($notice->date);
        $notice->isDeleted = 0;
        $notice->isReported = 0;

        $result = $db->insertIntoTable($notice, ["bandId", "notice", "date", "isDeleted", "isReported"], "notices");

        if ($result) {
            $response["noticeId"] = $result;
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

$app->put('/users/:userId/bands/:bandId/notices/:noticeId', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $notice = json_decode($app->request->getBody());
        $notice->bandId = $bandId;
        $notice->date = formatDate($notice->date);

        $db->updateRecord($notice, "notices", $notice->noticeId, "noticeId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->get('/users/:userId/bands/:bandId/notices/:noticeId', function ($userId, $bandId, $noticeId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $notice = $db->getOneRecord("SELECT * FROM notices where noticeId = " . $noticeId);
        echoResponse(204, $notice);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

//Admin

$app->get("/admins/:adminId/notices/:noticeId", function ($adminId, $noticeId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $response = [];
        $response["notice"] = $db->getOneRecord("SELECT * FROM notices where noticeId = " . $noticeId);
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put("/admins/:adminId/notices/:noticeId", function ($adminId, $noticeId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $notice = json_decode($app->request->getBody());
        $db->execQuery("UPDATE notices SET isReported = $notice->isReported  where noticeId = " . $noticeId);
        echoResponse(200, []);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});