<?php
/**
* 根据产品vid查询商品的所有信息,并查询出产品对应的所有评价
* 参数： vid  评论分页数pno   单页显示评价条数 pageSize
返回参数
*/
	header("Content-Type:application/json;charset=utf-8");
	require_once("../init.php");
	@$pid=$_REQUEST["pid"];

	if(!$vid) $pid=30;


	$output=[
	    'details'=>[],     //景点产品详情
	    'detailsPic'=>[],	//产品所有图片
	    'comments'=>[],     //景点评论数据
	];

	$sql = "SELECT product_hId"

	$sql="SELECT * FROM qh_viewspot_list WHERE viewSpot_id='$vid'";
    $output["details"]=sql_execute($sql)[0];

    $sql="SELECT pic_product_id,pic_pic1,pic_pic2,pic_pic3,pic_pic4,pic_bg FROM qh_product_pic WHERE pic_product_id=(SELECT product_id FROM qh_product WHERE product_vId=$vid)";
    $output["detailsPic"]=sql_execute($sql)[0];


	$sql = "SELECT * FROM  qh_comment WHERE comment_product_id = ( SELECT product_id FROM qh_product WHERE product_vId=$vid) ORDER BY comment_agreeCount DESC";

	$output["comments"]=sql_execute($sql);
    echo json_encode($output);