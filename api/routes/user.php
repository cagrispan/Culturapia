<?php

$app->get("/users/:facebook_id", function($facebookId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if($token){
        verifyToken($token, $facebookId);

        $queryUser = $db->getOneRecord("SELECT * FROM users where facebookId = ".$facebookId);
        $response = $queryUser;

        unset($response["userId"]);

        echoResponse(200, $response);
    }else{
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }


});

$app->put("/users/:facebookId", function($facebookId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if($token) {
        verifyToken($token, $facebookId);
        $user = json_decode($app->request->getBody());
        verifyRequiredParams(array("name", "facebookToken", "facebookId"), $user);

        $db->updateRecord($user, "users", $facebookId, "facebookId");
        echoResponse(204, "");
    }else{
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }

});

?>