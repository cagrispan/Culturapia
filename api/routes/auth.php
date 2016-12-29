<?php

$app->post("/auth", function () use ($app) {
    try {

        $resultId = null;

        $user = json_decode($app->request->getBody());

        $db = new DbHandler();


        //FACEBOOK LOGIN
        if (property_exists($user, 'facebookId')) {

            //Should be verifying if this facebookId is valid;
            $result = $db->getOneRecord("SELECT * FROM users where facebookId = '" . $user->facebookId . "'");

            if (!$result) {
                $resultId = $db->insertIntoTable($user, ["name", "facebookId", "facebookToken"], "users");
                $result = $db->getOneRecord("SELECT * FROM users where userId = " . $resultId);
            }

            if ($result) {
                sendToken($result);
            }

        //REGULAR LOGIN
        } else if (property_exists($user, 'email') && property_exists($user, 'password')) {

            $result = $db->getOneRecord("SELECT * FROM users where email = '" . $user->email . "'");

            if ($result) {
                if ($result["password"] == $user->password) {
                    sendToken($result);
                } else {
                    sendError(401, "Wrong Password.");
                }
            } else {
                sendError(401, "User not found.");
            }

        } else {
            sendError(401, "Unauthorized.");
        }
    } catch (PDOException $e) {
        sendError(500, "Error. " . $e->getMessage());
    }
});

function sendToken($user)
{
    $user["token"] = JWT::encode($user["userId"], "mySecurityPhrase");;
    echoResponse(200, $user);
}

function sendError($code, $message)
{
    $response = Array();
    $response["message"] = $message;
    echoResponse($code, $response);
}

?>