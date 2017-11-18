<?php
/*处理登录*/
session_start();
header("Content-type:application/json; charset=utf-8");
require_once('db.php');
require_once('getToken.php');

if($link){

	$username = mysql_real_escape_string($_POST['username']);//防止sql注入
	$password = mysql_real_escape_string($_POST['password']);

	$sql = "SELECT * FROM `user`  WHERE `username` = '{$username}'";

	mysqli_query($link,"SET NAMES 'UTF8'");
	$result = mysqli_query($link,$sql);

	if($row = mysqli_fetch_assoc($result)){
		if($row['password'] == $password){
			$token = getRandChar(30);
			$_SESSION['token'] = $token;
			$_SESSION['userid'] = $row['id'];
			echo json_encode(array('success' => $token));
		}else{
			echo json_encode(array('success' => 'none'));
		}
	}else{
		echo json_encode(array('success' => 'none'));
	}
	
}

mysqli_close($link);
?>