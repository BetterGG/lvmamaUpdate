<?php
	require("init.php");

	$output = [
		"china"=>"",
		"abroad"=>"",
		"hotel"=>""
	];

	$sql = "SELECT product_id,product_score,viewSpot_title,viewSpot_pic,viewSpot_price FROM qh_product,qh_viewspot_list WHERE product_vid=viewSpot_id  AND viewSpot_type=1  ORDER BY product_soldCount LIMIT 0,8";

	$output["china"] = sql_execute($sql);

	$sql = "SELECT product_id,product_score,viewSpot_title,viewSpot_pic,viewSpot_price FROM qh_product,qh_viewspot_list WHERE product_vid=viewSpot_id  AND viewSpot_type=0  ORDER BY product_soldCount LIMIT 0,8";

	$output["abroad"] = sql_execute($sql);

	$sql = "SELECT product_id,hotel_title,hotel_img,MIN(category_price) AS hotel_price,product_score FROM qh_product JOIN qh_hotel_list ON product_hid=hotel_id JOIN qh_hotel_category ON hotel_id=category_hotelId GROUP BY category_hotelId ORDER BY product_soldCount LIMIT 0,8";

	$output["hotel"] = sql_execute($sql);
 


	echo json_encode( $output );

?>


