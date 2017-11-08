<?php

	require("init.php");
	$pid = $_REQUEST["pid"];
	if(!$pid) $pid=100001;
	$output = [
		"hotel"=>"",
		"pic"=>"",
		"rooms"=>""
	];


	$sql = "SELECT hotel_img,hotel_title,hotel_location,product_score FROM qh_hotel_list JOIN qh_product ON hotel_id=product_hId WHERE product_id=$pid";

	$output["hotel"] = sql_execute($sql);

	$sql="SELECT pic_pic1,pic_pic2,pic_pic3,pic_pic4 FROM qh_product_pic WHERE pic_product_id=$pid";

    $output["pic"]=sql_execute($sql)[0];

	$sql = "SELECT category_title,category_pic,category_price,category_count FROM qh_hotel_category JOIN qh_hotel_list ON category_hotelId=hotel_id JOIN qh_product ON product_hId=hotel_id WHERE product_id=$pid";
	$output["rooms"] = sql_execute($sql);


	echo json_encode($output);
?>