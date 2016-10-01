<?php

header("Access-Control-Allow-Origin: http://local.culturapia.com.br:9000");
header('Access-Control-Allow-Methods: GET, PUT, DELETE, POST, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, token, facebookId");
date_default_timezone_set("America/Sao_Paulo");

require_once 'dbHandler.php';
require 'libs/Slim/Slim.php';
require_once 'vendor/firebase/php-jwt/Firebase/PHP-JWT/Authentication/JWT.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

require_once 'routes/generic.php';
require_once 'routes/auth.php';
require_once 'routes/user.php';
require_once 'routes/band.php';


/**
 * Verifying required params posted or not
 */
function verifyRequiredParams($required_fields,$request_params) {
    $error = false;
    $error_fields = "";
    foreach ($required_fields as $field) {
        if (!isset($request_params->$field) || strlen(trim($request_params->$field)) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["status"] = "error";
        $response["message"] = 'Campo(s) obrigatório(s): ' . substr($error_fields, 0, -2) . ' estão faltando ou estão vazios';
        echoResponse(400, $response);
        $app->stop();
    }
}

function verifyToken($token, $facebookId) {

    $decoded = JWT::decode($token, "mySecurityPhrase", Array("HS256"));

    if ($decoded != $facebookId) {
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["message"] = "Unauthorized. Invalid token.";
        echoResponse(401, $response);
        $app->stop();
    }
}

function formatDate($date){
    $date = str_replace("T", " ", $date);
    $date = substr_replace($date, "", 19);
    return $date;
}


function echoResponse($status_code, $response) {
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);

    // setting response content type to json
    $app->contentType('application/json');

    echo json_encode($response);
    $app->stop();
}

$app->run();
?>