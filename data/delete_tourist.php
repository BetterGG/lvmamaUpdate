<?php
	require("init.php");
	@$tid = $_REQUEST["tid"];
	$sql = "DELETE from qh_tourist WHERE tourist_id=$tid";
	$result = mysqli_query($conn,$sql);
	if($result){
		echo json_encode(["code"=>1,"msg"=>"删除成功"]);
	}else{
		echo json_encode(["code"=>-1,"msg"=>"删除失败"]);
	}
?>