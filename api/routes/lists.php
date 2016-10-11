<?php
$app->get('/videos', function () use ($app) {
    $db = new DbHandler();

    $query = $db->getRecords("SELECT * FROM videos", 0, 100);
    $response = $query;
    echoResponse(200, $response);
});
?>