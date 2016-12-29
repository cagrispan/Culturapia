<?php

$app->get("/users/:userId", function ($userId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $queryUser = $db->getOneRecord("SELECT * FROM users where userId = " . $userId);
        $response = $queryUser;

        unset($response["userId"]);

        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }


});

$app->put("/users/:userId", function ($userId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);
        $user = json_decode($app->request->getBody());
        verifyRequiredParams(array("name", "facebookToken", "userId"), $user);

        $user->birthday = formatDate($user->birthday);

        $db->updateRecord($user, "users", $userId, "userId");
        echoResponse(204, "");
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }

});

$app->get("/users/:userId/likes", function ($userId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);

        $queryUser = $db->getOneRecord("SELECT * FROM users where userId = " . $userId);
        $response = $queryUser;

        unset($response["userId"]);

        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }


});

$app->post("/users/:userId/likes", function ($userId) use ($app) {
    try {
        if ($userId) {

            $token = $app->request->headers->get("token");
            verifyToken($token, $userId);

            $likedContent = json_decode($app->request->getBody());

            $db = new DbHandler();

            $query = $db->getOneRecord(
                "SELECT * FROM likes where userId = " . $userId .
                " AND photoId = " . $likedContent->photoId .
                " AND videoId = '" . $likedContent->videoId .
                "' AND audioId = " . $likedContent->audioId .
                " AND noticeId = " . $likedContent->noticeId);

            if (!$query) {
                $likedContent->likeDate = date("Y-m-d H:i:s");
                $likedContent->unliked = 0;

                $result = $db->insertIntoTable($likedContent, ["photoId", "videoId", "audioId", "noticeId", "userId", "likeDate", "unliked"], "likes");
            } else {
                if ($query["unliked"] == 0) {
                    $likedContent->unliked = 1;
                } else {
                    $likedContent->unliked = 0;
                }

                $db->updateRecord($likedContent, "likes", $query["likeId"], "likeId");
                $result = $query["likeId"];
            }

            $response["likeId"] = $result;
            echoResponse(201, $response);
        } else {
            $response["message"] = "Unauthorized. Missing header userId.";
            echoResponse(401, $response);
        }
    } catch (PDOException $e) {
        $response["message"] = "Error. " . $e->getMessage();
        echoResponse(500, $response);
    }

});

?>