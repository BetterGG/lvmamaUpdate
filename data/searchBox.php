<?php
	require("init.php");

	@$kw = $_REQUEST["kw"];
	$output = [
		"hotel"=>"",
		"viewSpot"=>""
	];

	$sql = "SELECT viewSpot_title,product_id FROM qh_viewspot_list,qh_product  WHERE product_vId=viewSpot_id && viewSpot_title like '".$kw."%'" ;

	$output["viewSpot"] = sql_execute($sql);

	$sql = "SELECT hotel_title,product_id FROM qh_hotel_list,qh_product  WHERE product_hId=hotel_id && hotel_title like '".$kw."%'";
	$output["hotel"] = sql_execute($sql);

	echo json_encode($output);
?>



               