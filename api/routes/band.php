<?php
$app->get('/users/:facebookId/bands', function ($facebookId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $facebookId);
        $query = $db->getRecords("SELECT * FROM bands where bandId in (SELECT bandId FROM usersbands where userId =" . $facebookId . ")", 0, 1000);
        $response = $query;
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:facebookId/bands', function ($facebookId) use ($app) {

    $response = Array();

    if ($facebookId) {

        $token = $app->request->headers->get("token");
        verifyToken($token, $facebookId);

        $band = json_decode($app->request->getBody());

        $band->foundation = formatDate($band->foundation);

        $db = new DbHandler();

        verifyRequiredParams(["name", "about", "foundation", "city", "state", "phone", "email"], $band);
        $result = $db->insertIntoTable($band, ["name", "about", "foundation", "city", "state", "phone", "email"], "bands");

        if ($result) {

            foreach ($band->members as $member) {
                $insert = [];
                $insert["bandId"] = $result;
                $insert["member"] = $member;
                $db->insertIntoTable($insert, ["bandId", "member"], "members");
            }

            foreach ($band->styles as $style) {
                $insert = [];
                $insert["bandId"] = $result;
                $insert["style"] = $style;
                $db->insertIntoTable($insert, ["bandId", "style"], "styles");
            }

            foreach ($band->influences as $influences) {
                $insert = [];
                $insert["bandId"] = $result;
                $insert["influence"] = $influences;
                $db->insertIntoTable($insert, ["bandId", "influence"], "influences");
            }

            $relation = [];
            $relation["userId"] = $facebookId;
            $relation["bandId"] = $result;
            $db->insertIntoTable($relation, ["userId", "bandId"], "usersbands");

            $response["bandId"] = $result;
            echoResponse(201, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Erro ao cadastrar. Tente novamente";
            echoResponse(500, $response);
        }
    } else {
        $response["message"] = "Unauthorized. Missing header facebookId.";
        echoResponse(401, $response);
    }
});

$app->put('/users/:facebookId/bands/:bandId', function ($facebookId) use ($app) {

    $response = Array();

    if ($facebookId) {

        $token = $app->request->headers->get("token");
        verifyToken($token, $facebookId);

        $band = json_decode($app->request->getBody());

        $band->foundation = formatDate($band->foundation);

        $db = new DbHandler();

        verifyRequiredParams(["name", "about", "foundation", "city", "state", "phone", "email"], $band);

        $band->foundation = formatDate($band->foundation);

        $db->removeByCriteria("bandId = " . $band->bandId, "members");
        foreach ($band->members as $member) {
            $insert = [];
            $insert["bandId"] = $band->bandId;
            $insert["member"] = $member;
            $db->insertIntoTable($insert, ["bandId", "member"], "members");
        }

        $db->removeByCriteria("bandId = " . $band->bandId, "styles");
        foreach ($band->styles as $style) {
            $insert = [];
            $insert["bandId"] = $band->bandId;
            $insert["style"] = $style;
            $db->insertIntoTable($insert, ["bandId", "style"], "styles");
        }

        $db->removeByCriteria("bandId = " . $band->bandId, "influences");
        foreach ($band->influences as $influences) {
            $insert = [];
            $insert["bandId"] = $band->bandId;
            $insert["influence"] = $influences;
            $db->insertIntoTable($insert, ["bandId", "influence"], "influences");
        }

        unset($band->members);
        unset($band->styles);
        unset($band->influences);

        $db->updateRecord($band, "bands", $band->bandId, "bandId");

        $response = [];
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing header facebookId.";
        echoResponse(401, $response);
    }
});

$app->get('/users/:facebookId/bands/:bandId', function ($facebookId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $facebookId);
        $query = $db->getOneRecord("SELECT * FROM bands where bandId = " . $bandId);
        $members = $db->getRecords("SELECT member FROM members where bandId = " . $bandId, 0, 1000);
        $influences = $db->getRecords("SELECT influence FROM influences where bandId = " . $bandId, 0, 1000);
        $styles = $db->getRecords("SELECT style FROM styles where bandId = " . $bandId, 0, 1000);

        $query["members"] = [];
        $query["influences"] = [];
        $query["styles"] = [];

        foreach ($members as $member) {
            array_push($query["members"], $member["member"]);
        }
        foreach ($influences as $influence) {
            array_push($query["influences"], $influence["influence"]);
        }
        foreach ($styles as $style) {
            array_push($query["styles"], $style["style"]);
        }

        $query["photos"] = $db->getRecords("SELECT * FROM photos where bandId = " . $bandId, 0, 1000);
        $query["audios"] = $db->getRecords("SELECT * FROM audios where bandId = " . $bandId, 0, 1000);
        $query["notices"] = $db->getRecords("SELECT * FROM notices where bandId = " . $bandId, 0, 1000);
        $query["videos"] = $db->getRecords("SELECT * FROM videos where bandId = " . $bandId, 0, 1000);

        $response = $query;
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:facebookId/bands/:bandId/notices', function ($facebookId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $facebookId);

        $notice = json_decode($app->request->getBody());
        $notice->bandId = $bandId;
        $notice->date = formatDate($notice->date);
        $notice->isDeleted = 0;

        $result = $db->insertIntoTable($notice, ["bandId", "notice", "date", "isDeleted"], "notices");

        if ($result) {
            $response["noticeId"] = $result;
            echoResponse(201, $response);
        } else {
            $response["code"] = "error";
            $response["message"] = "Não foi possível inserir a notícia. Tente novamente.";
            echoResponse(500, $response);
        }

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put('/users/:facebookId/bands/:bandId/notices/:noticeId', function ($facebookId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $facebookId);

        $notice = json_decode($app->request->getBody());
        $notice->bandId = $bandId;
        $notice->date = formatDate($notice->date);

        $db->updateRecord($notice, "notices", $notice->noticeId, "noticeId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:facebookId/bands/:bandId/videos', function ($facebookId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $facebookId);

        $video = json_decode($app->request->getBody());
        $video->bandId = $bandId;
        $video->isDeleted = 0;

        $query = $db->getOneRecord("SELECT * FROM videos where videoId = '" . $video->videoId ."'");

        if ($query) {
            $db->updateRecord($video, "videos", $video->videoId, "videoId");
            $response["videoId"] = $video->videoId;
        } else {
            $result = $db->insertIntoTable($video, ["bandId", "videoId", "title",  "band", "city", "state", "style", "isDeleted"], "videos");
            $response["videoId"] = $result;
        }

        echoResponse(201, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put('/users/:facebookId/bands/:bandId/videos/:videoId', function ($facebookId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $facebookId);

        $video = json_decode($app->request->getBody());
        $video->bandId = $bandId;

        $db->updateRecord($video, "videos", $video->videoId, "videoId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->get('/bands', function () {
    $db = new DbHandler();

    $query = $db->getRecords("SELECT * FROM band", 0, 1000);
    $response = $query;
    echoResponse(200, $response);
});

$app->get('/bands/:bandId', function ($bandId) {
    $db = new DbHandler();

    $queryUser = $db->getOneRecord("SELECT * FROM bands where bandId = " . $bandId);
    $response = $queryUser;

    echoResponse(200, $response);
});

$app->put('/band/:id', function ($id) use ($app) {
    $db = new DbHandler();

    $response = array();
    $user = json_decode($app->request->getBody());
    verifyRequiredParams(array('nome', 'id'), $user);

    $query = $db->updateRecord($user, 'user', $id);
    $response["status"] = "success";
    $response["message"] = "Usuário alterado com Sucesso";

    echoResponse(200, $response);
});

$app->delete('/users/:facebook_id', function ($facebook_id) use ($app) {
    $db = new DbHandler();

    $response = array();

    if ($facebook_id) {
        $query = $db->remove($facebook_id, 'user');
        $response["status"] = "success";
        $response["message"] = "Usuário removido com Sucesso";
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Erro ao remover. Tente novamente";
        echoResponse(500, $response);
    }

});

?>