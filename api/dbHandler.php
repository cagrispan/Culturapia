<?php

class DbHandler {

    private $conn;

    function __construct() {
        require_once 'dbConnect.php';
        
        $db = new dbConnect();
        $this->conn = $db->connect();
    }

    public function execQuery($query){
    	$r = $this->conn->query($query) or die($this->conn->error.__LINE__);
        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
        } else {
            return NULL;
        }
    }
   
    public function getOneRecord($query) {
        $r = $this->conn->query($query.' LIMIT 1') or die($this->conn->error.__LINE__);
        return $result = $r->fetch_assoc();    
    }

    public function getCountFromTable($table) {
        $r = $this->conn->query('SELECT COUNT(*) AS count FROM '.$table) or die($this->conn->error.__LINE__);
        return $result = $r->fetch_assoc();    
    }

    public function getRecords($query,$inicio,$qtd) {
        $r = $this->conn->query($query.' LIMIT '.$inicio.','.$qtd) or die($this->conn->error.__LINE__);
        
		$result = array();

		while ($row = $r->fetch_assoc()) {
		    $result[] = $row;
		}

        return $result;    
    }

    public function insertIntoTable($obj, $column_names, $table_name) {
        
        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }
        $query = "INSERT INTO ".$table_name."(".trim($columns,',').") VALUES(".trim($values,',').")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
        } else {
            return NULL;
        }
    }

    public function updateRecord($obj, $table_name, $id){
 		$setColumn= array();
   		foreach ($obj as $key => $value)
    	{
        	$setColumn[] = "{$key} = '{$value}'";
	    }

	   $sql = "UPDATE {$table_name} SET ".implode(', ', $setColumn)." WHERE ID = '$id'";
	   $r = $this->conn->query($sql) or die($this->conn->error.__LINE__);
    }
	
	public function updateRecordByCriteria($obj, $table_name, $criteria){
 		$setColumn= array();
   		foreach ($obj as $key => $value)
    	{
        	$setColumn[] = "{$key} = '{$value}'";
	    }

	   $sql = "UPDATE {$table_name} SET ".implode(', ', $setColumn)." WHERE {$criteria}";
	   $r = $this->conn->query($sql) or die($this->conn->error.__LINE__);
    }
	
	public function getSession(){
		if (!isset($_SESSION)) {
			session_start();
		}
		$sess = array();
		if(isset($_SESSION['usuario']))
		{
			$sess["usuario"] = $_SESSION["usuario"];
		}
		else
		{
			$sess["usuario"] = array("nome" => "Visitante", "role"=>"guest");
		}
		return $sess;
	}

    public function verifyAccess($authorizedRoles){
        if (!isset($_SESSION)) {
            session_start();
        }
        $response = $this->getSession();
        if(!isset($_SESSION['usuario']) || !isset($response['usuario']['id'])){
            echoResponse(403, array("status" => "error", "message" => "403 - forbidden"));
        }else{
            $isAuthorized = false;
            foreach ($authorizedRoles as $role) {
                if($response['usuario']['role'] == $role){
                    $isAuthorized = true;
                }
            }
        }
        if(!$isAuthorized){
            echoResponse(403, array("status" => "error", "message" => "403 - forbidden"));
        }
    }
	
	public function destroySession(){
		if (!isset($_SESSION)) {
		session_start();
		}
		if(isset($_SESSION['usuario']))
		{
			unset($_SESSION['usuario']);
			$info='info';
			if(isSet($_COOKIE[$info]))
			{
				setcookie ($info, '', time() - $cookie_time);
			}
			$msg="Você saiu do Sistema";
		}
		else
		{
			$msg = "Você não está logado";
		}
		return $msg;
	}

	public function remove($id,$table_name){
		$sql = "DELETE FROM {$table_name} WHERE ID = {$id}";
	    $r = $this->conn->query($sql) or die($this->conn->error.__LINE__);
	}
	
	public function removeByCriteria($criteria,$table_name){
		$sql = "DELETE FROM {$table_name} WHERE {$criteria}";
	    $r = $this->conn->query($sql) or die($this->conn->error.__LINE__);
	}
 
}

?>
