<?php 
/*获取笔记正文*/
header("Content-type:application/json; charset=utf-8");
require_once('db.php');

if($link){
	if($_GET['id']){
		$note_id = $_GET['id'];
		$sql = "SELECT `article` FROM `note` WHERE `id` = '{$note_id}' AND `state` = 0";
	}

	mysqli_query($link,"SET NAMES 'UTF8'");

	$result = mysqli_query($link,$sql);
	if($row = mysqli_fetch_assoc($result)) {
		echo json_encode(array(
			'code' => 0,
			'id' => $note_id, 
			'article' => $row['article']
		));
	}else{
		echo json_encode(array('code' => 1));
	}
}else{
	echo json_decode(array('code' => 1));
}
mysqli_close($link);

?>