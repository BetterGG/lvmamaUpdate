<?php
	require("init.php");

	@$len = $_REQUEST["len"];

	$sql = "SELECT product_id,product_score,viewSpot_title,viewSpot_pic,viewSpot_price FROM qh_product,qh_viewspot_list WHERE product_vid=viewSpot_id ORDER BY product_soldCount LIMIT 0,$len";

	echo json_encode( sql_execute($sql) );

?>

