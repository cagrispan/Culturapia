<?php
$app->get('/videos', function () use ($app) {
    $db = new DbHandler();

    $query = $db->getRecords("SELECT * FROM videos", 0, 100);

    $size = count($query);

    for($i=0; $i<$size; $i++){
        $videoId = $query[$i]["videoId"];
        $query[$i]["likes"] = $db->getRecords("SELECT * FROM likes where videoId = '$videoId' AND unliked = 0", 0, 100);
    }

    $response = $query;
    echoResponse(200, $response);
});
?>