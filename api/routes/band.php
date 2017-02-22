<?php

//Open

$app->get('/bands', function () {
    $db = new DbHandler();

    $query = $db->getRecords("SELECT * FROM bands", 0, 1000);
    $response = $query;
    echoResponse(200, $response);
});

$app->get('/bands/:bandId', function ($bandId) use ($app) {
    $db = new DbHandler();

    $query = $db->getOneRecord("SELECT * FROM bands where bandId = " . $bandId);
    $members = $db->getRecords("SELECT member FROM members where bandId = " . $bandId, 0, 1000);
    $influences = $db->getRecords("SELECT influence FROM influences where bandId = " . $bandId, 0, 1000);
    $styles = $db->getRecords("SELECT style FROM bandStyles where bandId = " . $bandId, 0, 1000);
    $query["likes"] = $db->getRecords("SELECT * FROM likes where videoId='-1' AND photoId='-1' AND noticeId='-1' AND audioId='-1' AND unliked = 0 AND bandId = " . $bandId, 0, 1000);

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

    $photos = $db->getRecords("SELECT * FROM photos where bandId = " . $bandId, 0, 1000);
    $size = count($photos);
    for ($i = 0; $i < $size; $i++) {
        $photoId = $photos[$i]["photoId"];
        $photos[$i]["likes"] = $db->getRecords("SELECT * FROM likes where photoId = '$photoId' AND unliked = 0", 0, 100);
    }
    $query["photos"] = $photos;

    $query["audios"] = $db->getRecords("SELECT * FROM audios where bandId = " . $bandId, 0, 1000);

    $notices = $db->getRecords("SELECT * FROM notices where bandId = " . $bandId, 0, 1000);
    $size = count($notices);
    for ($i = 0; $i < $size; $i++) {
        $noticeId = $notices[$i]["noticeId"];
        $notices[$i]["likes"] = $db->getRecords("SELECT * FROM likes where noticeId = '$noticeId' AND unliked = 0", 0, 100);
    }
    $query["notices"] = $notices;

    $videos = $db->getRecords("SELECT * FROM videos where bandId = " . $bandId, 0, 1000);
    $size = count($videos);
    for ($i = 0; $i < $size; $i++) {
        $videoId = $videos[$i]["videoId"];
        $videos[$i]["likes"] = $db->getRecords("SELECT * FROM likes where videoId = '$videoId' AND unliked = 0", 0, 100);
    }
    $query["videos"] = $videos;

    $query["events"] = $db->getRecords("SELECT * FROM events where bandId = " . $bandId, 0, 1000);

    $query["profilePicture"] = $db->getOneRecord("SELECT path FROM profilePics where bandId = " . $bandId);

    $response = $query;
    echoResponse(200, $response);

});

//User

$app->get('/users/:userId/bands', function ($userId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);
        $query = $db->getRecords("SELECT * FROM bands where bandId in (SELECT bandId FROM usersBands where userId =" . $userId . ")", 0, 1000);
        $response = $query;
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:userId/bands', function ($userId) use ($app) {

    $response = Array();

    if ($userId) {

        $token = $app->request->headers->get("token");
        verifyToken($token, $userId);

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
                $db->insertIntoTable($insert, ["bandId", "style"], "bandStyles");
            }

            foreach ($band->influences as $influences) {
                $insert = [];
                $insert["bandId"] = $result;
                $insert["influence"] = $influences;
                $db->insertIntoTable($insert, ["bandId", "influence"], "influences");
            }

            $relation = [];
            $relation["userId"] = $userId;
            $relation["bandId"] = $result;
            $db->insertIntoTable($relation, ["userId", "bandId"], "usersBands");

            $response["bandId"] = $result;
            echoResponse(201, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Erro ao cadastrar. Tente novamente";
            echoResponse(500, $response);
        }
    } else {
        $response["message"] = "Unauthorized. Missing header userId.";
        echoResponse(401, $response);
    }
});

$app->get('/users/:userId/bands/:bandId', function ($userId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $userId);
        $query = $db->getOneRecord("SELECT * FROM bands where bandId = " . $bandId);
        $members = $db->getRecords("SELECT member FROM members where bandId = " . $bandId, 0, 1000);
        $influences = $db->getRecords("SELECT influence FROM influences where bandId = " . $bandId, 0, 1000);
        $styles = $db->getRecords("SELECT style FROM bandStyles where bandId = " . $bandId, 0, 1000);

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

        $query["contentLikes"] = $db->getRecords("SELECT * FROM likes where bandId = " . $bandId, 0, 1000);
        $query["likes"] = $db->getRecords("SELECT * FROM likes where videoId='-1' AND photoId='-1' AND noticeId='-1' AND audioId='-1' AND unliked = 0 AND bandId = " . $bandId, 0, 1000);
        $query["profilePicture"] = $db->getOneRecord("SELECT path FROM profilePics where bandId = " . $bandId);

        $response = $query;
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put('/users/:userId/bands/:bandId', function ($userId, $bandId) use ($app) {

    $response = Array();

    if ($userId) {

        $token = $app->request->headers->get("token");
        verifyToken($token, $userId);

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

        $db->removeByCriteria("bandId = " . $band->bandId, "bandStyles");
        foreach ($band->styles as $style) {
            $insert = [];
            $insert["bandId"] = $band->bandId;
            $insert["style"] = $style;
            $db->insertIntoTable($insert, ["bandId", "style"], "bandStyles");
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
        $response["message"] = "Unauthorized. Missing header userId.";
        echoResponse(401, $response);
    }
});

//Admin

$app->get('/admins/:adminId/bands', function ($adminId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
        $query = $db->getRecords("SELECT * FROM bands)", 0, 1000);
        $response = $query;
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->get('/admins/:adminId/bands/:bandId', function ($adminId, $bandId) use ($app) {
    $db = new DbHandler();

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $adminId);
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

        $photos = $db->getRecords("SELECT * FROM photos where bandId = " . $bandId, 0, 1000);
        $size = count($photos);
        for ($i = 0; $i < $size; $i++) {
            $photoId = $photos[$i]["photoId"];
            $photos[$i]["likes"] = $db->getRecords("SELECT * FROM likes where photoId = '$photoId' AND unliked = 0", 0, 100);
        }
        $query["photos"] = $photos;

        $query["audios"] = $db->getRecords("SELECT * FROM audios where bandId = " . $bandId, 0, 1000);

        $notices = $db->getRecords("SELECT * FROM notices where bandId = " . $bandId, 0, 1000);
        $size = count($notices);
        for ($i = 0; $i < $size; $i++) {
            $noticeId = $notices[$i]["noticeId"];
            $notices[$i]["likes"] = $db->getRecords("SELECT * FROM likes where noticeId = '$noticeId' AND unliked = 0", 0, 100);
        }
        $query["notices"] = $notices;

        $videos = $db->getRecords("SELECT * FROM videos where bandId = " . $bandId, 0, 1000);
        $size = count($videos);
        for ($i = 0; $i < $size; $i++) {
            $videoId = $videos[$i]["videoId"];
            $videos[$i]["likes"] = $db->getRecords("SELECT * FROM likes where videoId = '$videoId' AND unliked = 0", 0, 100);
        }
        $query["videos"] = $videos;

        $query["contentLikes"] = $db->getRecords("SELECT * FROM likes where bandId = " . $bandId, 0, 1000);
        $query["likes"] = $db->getRecords("SELECT * FROM likes where videoId='-1' AND photoId='-1' AND noticeId='-1' AND audioId='-1' AND unliked = 0 AND bandId = " . $bandId, 0, 1000);

        $query["events"] = $db->getRecords("SELECT * FROM events where bandId = " . $bandId, 0, 1000);

        $query["profilePicture"] = $db->getOneRecord("SELECT path FROM profilePics where bandId = " . $bandId);

        $response = $query;
        echoResponse(200, $response);
    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->put('/admins/:adminId/bands/:bandId', function ($adminId, $bandId) use ($app) {

    $response = Array();

    if ($adminId) {

        $token = $app->request->headers->get("token");
        verifyToken($token, $adminId);

        $band = json_decode($app->request->getBody());

        $band->foundation = formatDate($band->foundation);

        $db = new DbHandler();

        verifyRequiredParams(["name", "about", "foundation", "city", "state", "phone", "email"], $band);

        $band->foundation = formatDate($band->foundation);

        $db->removeByCriteria("bandId = " . $bandId, "members");
        foreach ($band->members as $member) {
            $insert = [];
            $insert["bandId"] = $band->bandId;
            $insert["member"] = $member;
            $db->insertIntoTable($insert, ["bandId", "member"], "members");
        }

        $db->removeByCriteria("bandId = " . $bandId, "styles");
        foreach ($band->styles as $style) {
            $insert = [];
            $insert["bandId"] = $band->bandId;
            $insert["style"] = $style;
            $db->insertIntoTable($insert, ["bandId", "style"], "styles");
        }

        $db->removeByCriteria("bandId = " . $bandId, "influences");
        foreach ($band->influences as $influences) {
            $insert = [];
            $insert["bandId"] = $bandId;
            $insert["influence"] = $influences;
            $db->insertIntoTable($insert, ["bandId", "influence"], "influences");
        }

        unset($band->members);
        unset($band->styles);
        unset($band->influences);

        $db->updateRecord($band, "bands", $bandId, "bandId");

        $response = [];
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing header userId.";
        echoResponse(401, $response);
    }
});