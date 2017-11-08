<?php
	require('init.php');
	@$kw=$_REQUEST['kw']or die('{"code":-1,"msg":"输入关键字"}');
	$output = [];
	$sql="SELECT * FROM qh_viewspot_list JOIN qh_product ON product_vId=viewSpot_id WHERE viewSpot_title like '%$kw%'";
	$arr1 = sql_execute( $sql );
	$sql = "SELECT * FROM qh_hotel_list JOIN qh_product ON product_hId=hotel_id WHERE hotel_title like '%$kw%'";
	$arr2 = sql_execute( $sql );
	$output = array_merge( $arr1, $arr2 );
	echo json_encode($output);
?>