<?php

$app->post("/auth", function() use ($app) {


    $key = "mySecurityPhrase";
    $facebookId = $app->request->headers->get("facebookId");
    $user = json_decode($app->request->getBody());
    
    $response = Array();

    if($facebookId){

        $token = JWT::encode($facebookId, $key);
        $response["token"] = $token;

        $db = new DbHandler();

        $queryUser = $db->getOneRecord("SELECT facebookId FROM users where facebookId = ".$facebookId);

        if(!$queryUser){
            verifyRequiredParams(["name", "facebookId", "facebookToken"], $user);
            $db->insertIntoTable($user, ["name", "facebookId", "facebookToken", "email", "phone"], "users");
        }

        echoResponse(200, $response);
    }else{
        $response["message"] = "Unauthorized. Missing header facebookId.";
        echoResponse(401, $response);
    }

});

?>