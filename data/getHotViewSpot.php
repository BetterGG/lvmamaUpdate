<?php
	require("init.php");

	// @$pid = $_REQUEST["pid"];

	$output = [ ];

	$sql = "SELECT product_id,viewSpot_title FROM qh_product,qh_viewspot_list WHERE product_vid=viewSpot_id AND viewSpot_tid=3 ORDER BY product_soldCount LIMIT 0,9";
	$output[] = sql_execute($sql);

	$sql = "SELECT product_id,viewSpot_title FROM qh_product,qh_viewspot_list WHERE product_vid=viewSpot_id AND viewSpot_tid=1 ORDER BY product_soldCount LIMIT 0,9";
	$output[] = sql_execute($sql);

	$sql = "SELECT product_id,viewSpot_title FROM qh_product,qh_viewspot_list WHERE product_vid=viewSpot_id AND viewSpot_tid=2 ORDER BY product_soldCount LIMIT 0,9";
	$output[] = sql_execute($sql);

	$sql = "SELECT product_id,hotel_title FROM qh_product,qh_hotel_list WHERE product_hid=hotel_id  ORDER BY product_soldCount LIMIT 0,9";
	$output[] = sql_execute($sql);

	// var_dump($output);
	echo json_encode($output);
?>

