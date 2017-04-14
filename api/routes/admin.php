<?php

//Admin

$app->get("/admins", function () use ($app) {
    $db = new DbHandler();
    $token = $app->request->headers->get("token");
    $adminId = $app->request->headers->get("adminId");
    if ($token && $adminId) {
        verifyToken($token, $adminId);
        $response = [];
        $response["admins"] = $db->getRecords("SELECT adminId, name, email FROM admins ORDER BY name", 0, 1000);
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token or adminId.";
        echoResponse(401, $response);
    }
});

$app->post("/admins", function () use ($app) {
    $db = new DbHandler();
    $token = $app->request->headers->get("token");
    $adminId = $app->request->headers->get("adminId");
    if ($token && $adminId) {
        verifyToken($token, $adminId);
        $admin = json_decode($app->request->getBody());
        $db->insertIntoTable($admin, ["name", "email", "password"], "admins");
        echoResponse(200, []);
    } else {
        $response["message"] = "Unauthorized. Missing token or adminId.";
        echoResponse(401, $response);
    }
});

$app->delete('/admins/:adminId', function ($adminId) use ($app) {
    $db = new DbHandler();
    $token = $app->request->headers->get("token");
    $admin = $app->request->headers->get("adminId");
    if ($token) {
        verifyToken($token, $admin);
        $where = 'adminId = '.$adminId;
        $db->removeByCriteria($where, "admins");
        echoResponse(204, []);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});