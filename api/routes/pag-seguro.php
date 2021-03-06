<?php

\PagSeguro\Library::initialize();

//User
$app->post("/users/:userId/sessions", function ($userId) use ($app) {
    try {
        if ($userId) {
            $token = $app->request->headers->get("token");
            verifyToken($token, $userId);

            try {
                $curl = curl_init("https://ws.sandbox.pagseguro.uol.com.br/sessions?email=fabcaron@hotmail.com&token=1FE047B1351643078742E68D7674DB4A");

                curl_setopt($curl, CURLOPT_POSTFIELDS, $app->request->getBody());
                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_POST, true);
                curl_setopt($curl, CURLOPT_MAXREDIRS, 10);
                curl_setopt($curl, CURLOPT_TIMEOUT, 30);
                curl_setopt($curl, CURLOPT_HTTPHEADER,
                    array(
                        'Accept: application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
                        'Content-Type: application/xml;charset=ISO-8859-1'
                    )
                );
                curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

                $contents = curl_exec($curl);
                $session = simplexml_load_string($contents);
                $err = curl_error($curl);
                curl_close($curl);

                echoResponse(201, $session);
            } catch (Exception $e) {
                    // die($e->getMessage());
                }
        } else {
            $response["message"] = "Unauthorized. Missing header userId.";
            echoResponse(401, $response);
        }
    } catch (PDOException $e) {
        $response["message"] = "Error. " . $e->getMessage();
        echoResponse(500, $response);
    }
});

$app->post("/users/:userId/get-premium", function ($userId) use ($app) {
    try {
        if ($userId) {
            $token = $app->request->headers->get("token");
            verifyToken($token, $userId);

            try {
                $curl = curl_init("https://ws.sandbox.pagseguro.uol.com.br/pre-approvals?email=fabcaron@hotmail.com&token=1FE047B1351643078742E68D7674DB4A");

                $test = $app->request->getBody();
                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($curl, CURLOPT_POSTFIELDS, $test);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_POST, true);
                curl_setopt($curl, CURLOPT_HTTPHEADER,
                    array(
                        'Content-Type: application/json;charset=ISO-8859-1',
                        'Accept: application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1'
                    )
                );
                curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
                $response = curl_exec($curl);
                $err = curl_error($curl);
                curl_close($curl);

                echoResponse(201, $response);
            } catch (PDOException $e) {
                $response["message"] = "Error. " . $e->getMessage();
                echoResponse(500, $response);
            }
        } else {
            $response["message"] = "Unauthorized. Missing header userId.";
            echoResponse(401, $response);
        }
    } catch (PDOException $e) {
        $response["message"] = "Error. " . $e->getMessage();
        echoResponse(500, $response);
    }
});

$app->post("/users/:userId/bands/:bandId/cancel-premium", function ($userId, $bandId) use ($app) {
    try {
        if ($userId) {
            $token = $app->request->headers->get("token");
            verifyToken($token, $userId);
            $db = new DbHandler();
            $band = $db->getOneRecord("SELECT * FROM bands where bandId = " . $bandId);

            try {
                $curl = curl_init("https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/".$band["preApprovalCode"] . $band->preApprovalCode ."/cancel?email=fabcaron@hotmail.com&token=1FE047B1351643078742E68D7674DB4A");

                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_PUT, true);
                curl_setopt($curl, CURLOPT_MAXREDIRS, 10);
                curl_setopt($curl, CURLOPT_TIMEOUT, 30);
                curl_setopt($curl, CURLOPT_HTTPHEADER,
                    array(
                        'Accept: application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1',
                        'Content-Type: application/json;charset=ISO-8859-1'
                    )
                );
                curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

                $response = curl_exec($curl);
                $err = curl_error($curl);
                curl_close($curl);

                echoResponse(201, $response);
            } catch (PDOException $e) {
                $response["message"] = "Error. " . $e->getMessage();
                echoResponse(500, $response);
            }
        } else {
            $response["message"] = "Unauthorized. Missing header userId.";
            echoResponse(401, $response);
        }
    } catch (PDOException $e) {
        $response["message"] = "Error. " . $e->getMessage();
        echoResponse(500, $response);
    }
});

$app->post("/notifications", function () use ($app) {
    try {

        $post = $app->request->getBody();
        $strings = explode("=", $post);

        $object = [];
        $object["notificationCode"] = substr($strings[1],0,39);
        $object["notificationCode"] = str_replace("-", "", $object["notificationCode"]);
        $object["notificationType"] = $strings[2];

        if($object["notificationType"] == "preApproval"){
            try {
                $url = "https://ws.sandbox.pagseguro.uol.com.br/v2/pre-approvals/notifications/"
                . $object["notificationCode"] .
                "?email=fabcaron@hotmail.com&token=1FE047B1351643078742E68D7674DB4A";
                $contents = curl_get_contents($url);
                $notification = simplexml_load_string($contents);

                $status = $notification->status == "ACTIVE" ? 2 : 1;
                $bandId = explode("_", $notification->reference)[1];
                $code = $notification->code;

                $db = new DbHandler();

                $db->execQuery("UPDATE bands SET type = " . intval($status) . ", preApprovalCode = '" . $code . "' WHERE bandId = " . intval($bandId));

                echo $notification->status;
            } catch (PDOException $e) {
                $response["message"] = "Error. " . $e->getMessage();
                echoResponse(500, $response);
            }
        }

        echo $object["notificationType"];
    } catch (PDOException $e) {
        $response["message"] = "Error. " . $e->getMessage();
        echoResponse(500, $response);
    }
});

function curl_get_contents($url) {
    $ch = curl_init();
    $timeout = 5;

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);

    $data = curl_exec($ch);

    curl_close($ch);

    return $data;
}


