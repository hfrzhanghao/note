<?php
session_start();
/*改变笔记本状态*/
header("Content-type:application/json; charset=utf-8");
require_once('db.php');
require_once('getToken.php');

if($link && $_POST['token'] == $_SESSION['token']){
	foreach ($_POST as $key => $value) {
		$_POST[$key] = addslashes($value);
	}

	$updateid = $_POST['id'];
	$state = $_POST['state'];

	$sql = "UPDATE `notebook` SET `state`='{$state}' WHERE `id` = '{$updateid}'"  ;

	mysqli_query($link,"SET NAMES 'UTF8'");
	$result = mysqli_query($link,$sql);

	if($result){
		$token = getRandChar(30);
		$_SESSION['token'] = $token;
		echo json_encode(array(
			'code' => 0,
			'token' => $token
		));
	}else{
		echo json_encode(array('code' => 1));
	}
} 

mysqli_close($link);
?>