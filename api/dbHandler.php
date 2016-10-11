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
        try{
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
        }catch (PDOException $e){
            $response["message"]="Error. ".$e->getMessage();
            echoResponse(500, $response);
            return NULL;
        }
    }

    public function updateRecord($obj, $table_name, $id, $column_name){
 		$setColumn= array();
   		foreach ($obj as $key => $value)
    	{
        	$setColumn[] = "{$key} = '{$value}'";
	    }

	   $sql = "UPDATE {$table_name} SET ".implode(', ', $setColumn)." WHERE {$column_name} = '$id'";
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
