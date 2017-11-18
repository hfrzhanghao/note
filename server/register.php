<?php
/*处理登录*/
session_start();
header("Content-type:application/json; charset=utf-8");
require_once('db.php');
require_once('getToken.php');

if($link){

	$username = mysql_real_escape_string($_POST['username']);//防止sql注入
	$password = mysql_real_escape_string($_POST['password']);

	$sql_sel = "SELECT * FROM `user`  WHERE `username` = '{$username}'";

	mysqli_query($link,"SET NAMES 'UTF8'");
	$result = mysqli_query($link,$sql_sel);

	if($row = mysqli_fetch_assoc($result)){
		echo json_encode(array('code' => '1','description' => '已经存在同样的用户名'));
	}else{
		$sql_insert = "INSERT INTO `user` (`username`,`password`,`state`) VALUES  ('{$username}','{$password}',0)";
		mysqli_query($link,"SET NAMES 'UTF8'");
		$result = mysqli_query($link,$sql_insert);
		if($result == true){
			echo json_encode(array('code' => '0','description' => '成功'));
		}else{
			echo json_encode(array('code' => '2','description' => '注册失败,数据库发生错误'));
		}
		
	}
	
}

mysqli_close($link);
?>