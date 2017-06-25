<?php

//User

$app->post("/users/:userId/reports", function ($userId) use ($app) {
    try {
        if ($userId) {

            $token = $app->request->headers->get("token");
            verifyToken($token, $userId);

            $reportedContent = json_decode($app->request->getBody());

            $db = new DbHandler();

            $reportedContent->reportDate = date("Y-m-d H:i:s");

            $result = $db->insertIntoTable($reportedContent, ["questionId", "videoId", "photoId", "noticeId", "eventId", "userId", "bandId", "profilePictureId", "reportDate"], "reports");

            $response["reportId"] = $result;
            echoResponse(201, $response);
        } else {
            $response["message"] = "Unauthorized. Missing header userId.";
            echoResponse(401, $response);
        }
    } catch (PDOException $e) {
        $response["message"] = "Error. " . $e->getMessage();
        echoResponse(500, $response);
    }
});

//Admin

$app->get("/admins/:adminId/reports", function ($adminId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $response = [];
        $response["reports"] = $db->getRecords("SELECT * FROM reports", 0, 1000);
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});