<?php
/**
* 根据产品pid查询商品的所有信息,并查询出产品对应的所有评价
* 参数： pid
返回参数
*/
	header("Content-Type:application/json;charset=utf-8");
	require_once("../init.php");
	@$pid= $_REQUEST["pid"];

	if(!$pid) $pid=100001;

	$output=[
	    'details'=>[],     //景点产品详情
	    'detailsPic'=>[],	//产品所有图片
	    'productScore'=>''  //产品好评率
	];
	$sql="SELECT viewSpot_title,viewSpot_details,viewSpot_location,viewSpot_price,viewSpot_days,viewSpot_type,viewSpot_line FROM qh_viewspot_list WHERE viewSpot_id=( SELECT product_vId FROM qh_product WHERE product_id=$pid )";

    $output["details"]=sql_execute($sql)[0];

    $sql="SELECT pic_product_id,pic_pic1,pic_pic2,pic_pic3,pic_pic4,pic_bg FROM qh_product_pic WHERE pic_product_id=$pid";
    $output["detailsPic"]=sql_execute($sql)[0];

	$sql = "SELECT product_score FROM  qh_product WHERE product_id=$pid";
	$output["productScore"]=sql_execute($sql)[0];

    echo json_encode($output);