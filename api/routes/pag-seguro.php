<?php

\PagSeguro\Library::initialize();

//User
$app->post("/users/:userId/sessions", function ($userId) use ($app) {
    try {
        if ($userId) {
            $token = $app->request->headers->get("token");
            verifyToken($token, $userId);

            try {
                $sessionCode = \PagSeguro\Services\Session::create(
                    \PagSeguro\Configuration\Configure::getApplicationCredentials()
                    ->setAuthorizationCode("E3BEFF71C66C4E79B4E8071F4BDE1A38")
                    );
                echoResponse(201, $sessionCode->getResult());
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

//User
$app->post("/users/:userId/get-premium", function ($userId) use ($app) {
    try {
        if ($userId) {
            $token = $app->request->headers->get("token");
            verifyToken($token, $userId);

            try {
                $curl = curl_init("https://ws.sandbox.pagseguro.uol.com.br/pre-approvals?appId=app7712712939&appKey=2A2B69CAB6B6E2CEE41DAF802151290&authorizationCode=E3BEFF71C66C4E79B4E8071F4BDE1A38");

                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_POST, true);
                curl_setopt($curl, CURLOPT_MAXREDIRS, 10);
                curl_setopt($curl, CURLOPT_TIMEOUT, 30);
                curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                'Accept : application/vnd.pagseguro.com.br.v3+json; charset=ISO-8859-1',
                'Content-Type: application/json; charset=ISO-8859-1',
                )
                );
                curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
                curl_setopt($curl, CURLOPT_POSTFIELDS, $app->request->getBody() );

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
