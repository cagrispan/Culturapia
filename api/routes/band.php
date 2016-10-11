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
        $query["profilePicture"] = $db->getOneRecord("SELECT path FROM profilePics where bandId = " . $bandId);

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

        $query = $db->getOneRecord("SELECT * FROM videos where videoId = '" . $video->videoId . "'");

        if ($query) {
            $db->updateRecord($video, "videos", $video->videoId, "videoId");
            $response["videoId"] = $video->videoId;
        } else {
            $result = $db->insertIntoTable($video, ["bandId", "videoId", "title", "band", "city", "state", "style", "isDeleted"], "videos");
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

$app->post('/users/:facebookId/bands/:bandId/photos', function ($facebookId, $bandId) use ($app) {
    try{
        $db = new DbHandler();

        $token = $app->request->headers->get("token");

        if ($token) {
            verifyToken($token, $facebookId);

            $tmp_name = $_FILES["file"]["tmp_name"];
            $name = $_FILES["file"]["name"];
            $size = $_FILES["file"]["size"];

            $photo = [];
            $photo["bandId"] = $bandId;
            $photo["name"] = $name;
            $photo["path"] = "images/$bandId" . "_" . "$name" . "_" . "$size";
            $photo["isDeleted"] = 0;

            $query = $db->getOneRecord("SELECT * FROM photos where path = '" . $photo["path"] . "'");

            if ($query) {
                $db->updateRecord($photo, "photos", $photo["path"], "path");
                $response = $query;
            } else {
                $result = $db->insertIntoTable($photo, ["bandId", "name", "path", "isDeleted"], "photos");
                move_uploaded_file($tmp_name, $photo["path"]);
                $response["photoId"] = $result;
            }



            echoResponse(201, $response);

        } else {
            $response["message"] = "Unauthorized. Missing token.";
            echoResponse(401, $response);
        }
    }catch (PDOException $e){
        $response["message"] = "Error. ".$e->getMessage();
        echoResponse(500, $response);
    }
});

$app->put('/users/:facebookId/bands/:bandId/photos/:photoId', function ($facebookId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $facebookId);

        $photo = json_decode($app->request->getBody());
        $photo->bandId = $bandId;

        $db->updateRecord($photo, "photos", $photo->photoId, "photoId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:facebookId/bands/:bandId/audios', function ($facebookId, $bandId) use ($app) {
    try{
        $db = new DbHandler();

        $token = $app->request->headers->get("token");

        if ($token) {
            verifyToken($token, $facebookId);

            $tmp_name = $_FILES["file"]["tmp_name"];
            $fileName = $_FILES["file"]["name"];
            $size = $_FILES["file"]["size"];

            $musicName = $_POST["name"];

            $audio = [];
            $audio["bandId"] = $bandId;
            $audio["fileName"] = $fileName;
            $audio["musicName"] = $musicName;
            $audio["path"] = "audios/$bandId" . "_" . basename($name) . "_" . $size;;
            $audio["isDeleted"] = 0;

            $query = $db->getOneRecord("SELECT * FROM audios where path = '" . $audio["path"] . "'");

            if ($query) {
                $db->updateRecord($audio, "audios", $audio["path"], "path");
                $response = $query;
            } else {
                $result = $db->insertIntoTable($audio, ["bandId", "name", "path", "isDeleted"], "audios");

                move_uploaded_file($tmp_name, $audio["path"]);
                $response["audioId"] = $result;
            }

            echoResponse(201, $response);

        } else {
            $response["message"] = "Unauthorized. Missing token.";
            echoResponse(401, $response);
        }
    }catch (PDOException $e){
        $response["message"] = "Error. ".$e->getMessage();
        echoResponse(500, $response);
    }
});

$app->put('/users/:facebookId/bands/:bandId/audios/:audioId', function ($facebookId, $bandId) use ($app) {
    $db = new DbHandler();
    $response = [];

    $token = $app->request->headers->get("token");

    if ($token) {
        verifyToken($token, $facebookId);

        $audio = json_decode($app->request->getBody());
        $audio->bandId = $bandId;

        $db->updateRecord($audio, "audios", $audio->audioId, "audioId");
        echoResponse(204, $response);

    } else {
        $response["message"] = "Unauthorized. Missing token.";
        echoResponse(401, $response);
    }
});

$app->post('/users/:facebookId/bands/:bandId/profile-pictures', function ($facebookId, $bandId) use ($app) {
    try{
        $db = new DbHandler();

        $token = $app->request->headers->get("token");

        if ($token) {
            verifyToken($token, $facebookId);

            $tmp_name = $_FILES["file"]["tmp_name"];
            $name = $_FILES["file"]["name"];

            $photo = [];
            $photo["bandId"] = $bandId;
            $photo["path"] = "images/profile-band-pic/$bandId" . "_" . "$name";

            $query = $db->getOneRecord("SELECT * FROM profilePics where bandId = '" . $bandId . "'");

            if ($query) {
                $db->updateRecord($photo, "profilePics", $bandId, "bandId");
                move_uploaded_file($tmp_name, $photo["path"]);
                $response["photoId"] = $query["profilePicId"];
            } else {
                $result = $db->insertIntoTable($photo, ["bandId", "path"], "profilePics");
                move_uploaded_file($tmp_name, $photo["path"]);
                $response["photoId"] = $result;
            }



            echoResponse(201, $response);

        } else {
            $response["message"] = "Unauthorized. Missing token.";
            echoResponse(401, $response);
        }
    }catch (PDOException $e){
        $response["message"] = "Error. ".$e->getMessage();
        echoResponse(500, $response);
    }
});

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
        $query["profilePicture"] = $db->getOneRecord("SELECT path FROM profilePics where bandId = " . $bandId);

        $response = $query;
        echoResponse(200, $response);

});


?>