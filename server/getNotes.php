<?php 
/*获取笔记列表*/
header("Content-type:application/json; charset=utf-8");
require_once('db.php');

if($link){

	$notebook_belong = $_GET['notebook_belong'];
	$sql = "SELECT * FROM `note` WHERE `notebook_belong` = '{$notebook_belong}' AND `state` = 0";

	mysqli_query($link,"SET NAMES 'UTF8'");

	$result = mysqli_query($link,$sql);
	$senddata = array();
	while ($row = mysqli_fetch_assoc($result)) {
		array_push($senddata, array(
			'id' => $row['id'], 
			'date' => $row['note_date'], 
			'name' => $row['note_name'], 
			'des' => $row['note_des'],
			'state' => $row['state']
			));
	}
	echo json_encode($senddata);
}
mysqli_close($link);

?>