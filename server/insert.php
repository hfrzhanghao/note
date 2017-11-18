<?php
session_start();
/*添加新闻*/
header("Content-type:application/json; charset=utf-8");
require_once('db.php');
require_once('getToken.php');

if($link){
	if ($_POST['token'] == $_SESSION['token']){
		foreach ($_POST as $key => $value) {
			$_POST[$key] = addslashes($value);
		}

		$name = $_POST['name'];
		$date = $_POST['date'];
		$userid = $_SESSION['userid'];

		$sql = "INSERT INTO `notebook` (`notebook_name`,`userid`,`notebook_create_date`,`state`) VALUES  ('{$name}','{$userid}','{$date}',0)";

		mysqli_query($link,"SET NAMES 'UTF8'");
		$result = mysqli_query($link,$sql);

		if($result == true){
			$sql_id = "SELECT @@IDENTITY";
			$result_id = mysqli_query($link,$sql_id);

			$senddata = array();
			if ($row = mysqli_fetch_assoc($result_id)) {
				$token = getRandChar(30);
				$_SESSION['token'] = $token;
				array_push($senddata, array(
					'code' => 0,
					'token' => $token,
					'newid' => $row['@@IDENTITY']
				));
				echo json_encode($senddata);
			}else{
				echo json_encode(array('code' => 1));
			}
		}else{
			echo json_encode(array('code' => 1));
		}
	}else{
		echo json_encode(array('code' => 1));
	}
} 

mysqli_close($link);
?>