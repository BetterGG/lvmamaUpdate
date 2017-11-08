<?php
	require("init.php");
	@$aid = $_REQUEST["aid"];
	$sql = "DELETE from qh_address_list WHERE address_id=$aid";
	$result = mysqli_query($conn,$sql);
	if($result){
		echo json_encode(["code"=>1,"msg"=>"删除成功"]);
	}else{
		echo json_encode(["code"=>-1,"msg"=>"删除失败"]);
	}
?>