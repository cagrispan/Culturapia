<?php


$app->get('/likes/:id', function ($id) use ($app) {
    $db = new DbHandler();

    $query = $db->getRecords("SELECT * FROM likes where (videoId = '".$id."' OR photoId = '".$id."' OR noticeId = '".$id."') AND unliked = 0", 0, 100);

    $response = $query;
    echoResponse(200, $response);
});
?>