<?php

//Open

$app->get("/styles", function () use ($app) {
    $db = new DbHandler();
    $response = [];
    $response["styles"] = $db->getRecords("SELECT * FROM styles", 0, 1000);
    echoResponse(200, $response);
});

//Admin

$app->post("/admins/:adminId/styles", function ($adminId) use ($app) {
    $db = new DbHandler();
    $token = $app->request->headers->get("token");
    if ($token && $adminId) {
        verifyToken($token, $adminId);
        $style = json_decode($app->request->getBody());
        $db->insertIntoTable($style, ["style"], "styles");
        echoResponse(200, []);
    } else {
        $response["message"] = "Unauthorized. Missing token or adminId.";
        echoResponse(401, $response);
    }
});

$app->delete('/admins/:adminId/styles/:styleId', function ($adminId, $styleId) use ($app) {
    $db = new DbHandler();
    $token = $app->request->headers->get("token");
    if ($token && $adminId) {
        verifyToken($token, $adminId);
        $where = 'styleId = '.$styleId;
        $db->removeByCriteria($where, "styles");
        echoResponse(204, []);
    } else {
        $response["message"] = "Unauthorized. Missing token or adminId.";
        echoResponse(401, $response);
    }
});