<?php

//Open

$app->get('/events', function () use ($app) {
    $db = new DbHandler();
    $response = $db->getRecords("SELECT * FROM events", 0, 100);
    echoResponse(200, $response);
});

//User

$app->get('/users/:userId/bands/:bandId/events', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);
        $response["events"] = $db->getRecords("SELECT * FROM events where bandId = " . $bandId, 0, 1000);
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:userId/bands/:bandId/events', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $event = json_decode($app->request->getBody());
        $event->bandId = $bandId;
        $event->start = formatDate($event->start);

        $result = $db->insertIntoTable($event, ["bandId", "title", "description", "start", "local"], "events");

        if ($result) {
            $response["eventId"] = $result;
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

$app->put('/users/:userId/bands/:bandId/events/:eventId', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $event = json_decode($app->request->getBody());
        $event->bandId = $bandId;
        $event->start = formatDate($event->start);

        $db->updateRecord($event, "events", $event->id, "id");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->delete('/users/:userId/bands/:bandId/events/:eventId', function ($userId, $bandId, $eventId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $db->remove($eventId, "events");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->get('/users/:userId/bands/:bandId/events/:eventId', function ($userId, $bandId, $eventId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);
        $response = $db->getOneRecord("SELECT * FROM events WHERE id = ".$eventId);
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});