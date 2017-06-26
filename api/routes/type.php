<?php

//User
$app->put("/admins/:adminId/types", function ($adminId) use ($app) {
    try {
        if ($adminId) {

            $token = $app->request->headers->get("token");
            verifyToken($token, $adminId);

            $types = json_decode($app->request->getBody());

            $free = $types->free;
            $premium = $types->premium;
            $vip = $types->vip;

            $db = new DbHandler();

            $db->execQuery("UPDATE bandTypes SET audio = $free->audio, video = $free->video, photo = $free->photo, calendar = $free->calendar, quiz = $free->quiz  where typeId = 1");
            $db->execQuery("UPDATE bandTypes SET audio = $premium->audio, video = $premium->video, photo = $premium->photo, calendar = $premium->calendar, quiz = $premium->quiz  where typeId = 2");
            $db->execQuery("UPDATE bandTypes SET audio = $vip->audio, video = $vip->video, photo = $vip->photo, calendar = $vip->calendar, quiz = $vip->quiz  where typeId = 3");

            echoResponse(204, []);
        } else {
            $response["message"] = "Unauthorized. Missing header adminId.";
            echoResponse(401, $response);
        }
    } catch (PDOException $e) {
        $response["message"] = "Error. " . $e->getMessage();
        echoResponse(500, $response);
    }
});

//Admin

$app->get("/admins/:adminId/types", function ($adminId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $response = [];
        $types = $db->getRecords("SELECT * FROM bandTypes", 0, 1000);
        $response["types"]["free"] = $types[0];
        $response["types"]["premium"] = $types[1];
        $response["types"]["vip"] = $types[2];
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});