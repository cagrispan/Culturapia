<?php
$app->options('/users', function() {

    $response["status"] = "online";

    echoResponse(200, $response);
});

$app->get('/', function() {

    $response["status"] = "online";

    echoResponse(200, $response);
});

$app->post('/users', function() use ($app) {

    $response = array();
    $r = json_decode($app->request->getBody());
	var_dump($r);
    verifyRequiredParams(array('name'),$r);
    $db = new DbHandler();
    $name = $r->name;

	$table_name = "user";
	$column_names = array('name');
	$result = $db->insertIntoTable($r, $column_names, $table_name);
	if ($result) {
		$response["status"] = "success";
		$response["message"] = "Usuário inserido com sucesso";
		echoResponse(200, $response);
	} else {
		$response["status"] = "error";
		$response["message"] = "Erro ao cadastrar. Tente novamente";
		echoResponse(500, $response);
	}
});

$app->get('/users', function() {
    $db = new DbHandler();

    $query = $db->getRecords("SELECT * FROM user",0,1000);
    $response = $query;

    echoResponse(200, $response);
});

$app->get('/users/:id', function($id) {
    $db = new DbHandler();

    $queryUser = $db->getOneRecord("SELECT facebook_id, facebook_token, name, birthday FROM user where id = ".$id);
    $response = $queryUser;

    echoResponse(200, $response);
});

$app->put('/users/:id', function($id) use ($app) {
    $db = new DbHandler();

    $response = array();
    $r = json_decode($app->request->getBody());
	verifyRequiredParams(array('nome','id'),$r);

    $query = $db->updateRecord($r, 'livros', $id);
    $response["status"] = "success";
    $response["message"] = "Livro alterado com Sucesso";

    echoResponse(200, $response);
});

$app->delete('/exemplares/:id', function($id) use ($app) {
    $db = new DbHandler();

    $response = array();
	
	if($id){
		$query = $db->remove($id, 'livros');
		$response["status"] = "success";
		$response["message"] = "Livro removido com Sucesso";
		echoResponse(200, $response);
	}else{
		$response["status"] = "error";
		$response["message"] = "Erro ao remover. Tente novamente";
		echoResponse(500, $response);
	}
    
});

?>