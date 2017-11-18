<?php 
session_start();
/*获取笔记本列表*/
header("Content-type:application/json; charset=utf-8");
require_once('db.php');

if($link){

	$userid = $_SESSION['userid'];
	$sql = "SELECT * FROM `notebook` WHERE `userid` = '{$userid}'";

	mysqli_query($link,"SET NAMES 'UTF8'");

	$result = mysqli_query($link,$sql);
	$senddata = array();
	while ($row = mysqli_fetch_assoc($result)) {
		array_push($senddata, array(
			'id' => $row['id'], 
			'date' => $row['notebook_create_date'], 
			'name' => $row['notebook_name'], 
			'des' => $row['notebook_des'],
			'state' => $row['state']
			));
	}
	echo json_encode($senddata);
}
mysqli_close($link);

?>