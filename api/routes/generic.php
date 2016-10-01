<?php
$app->options('/.*', function() {

    $response = array();
    echoResponse(200, $response);
});

$app->get('/', function() {

    $response["status"] = "online";
    echoResponse(200, $response);

});
?>