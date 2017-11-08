<?php
/**
* 根据产品pid查询出产品对应的所有评价
* 参数： pid  评论分页数pno   单页显示评价条数 pageSize
*返回参数
*
*根据 location获取 推荐景点
*/
	header("Content-Type:application/json;charset=utf-8");
	require_once("../init.php");
	@$pid= $_REQUEST["pid"];
	@$pno=$_REQUEST["pno"];
	@$pageSize=$_REQUEST["pageSize"];

    if(!$pid) $pid=100001;
	if(!$pno) $pno=1;
	if(!$pageSize) $pageSize=5;  //单页评论默认显示5条
	$output=[
			   'recodeCount'=>0,	//评论总记录数
			   'pageCount'=>0,     //总页数
			   'data'=>null,     	//景点评论数据
			   'pno'=>$pno,			//当前页码
			   'pageSize'=>$pageSize,   //当前页大小
			   'viewSpotDetail'=>[]
        	];
    //查询记录和总页数
        $sql="select count(*) from qh_comment WHERE comment_product_id=$pid";
        $result=mysqli_query($conn,$sql);
        $row=mysqli_fetch_row($result);
        $output["recodeCount"]=intval($row[0]);
        $output["pageCount"]=ceil($output["recodeCount"]/$output["pageSize"]);  //向上取整
        //判断页数问题
        if($output["pno"]>$output["pageCount"]){$output["pno"]=$output["pageCount"];}
         //查询当前页的内容
        $start=($output["pno"]-1)*$output["pageSize"];
        $count=$output["pageSize"];

        $sql  = " SELECT u.uname,c.comment_content text,c.comment_time time,c.comment_agreeCount count,c.comment_score s";
        $sql  .= " FROM qh_user_list AS u JOIN qh_comment c ON u.uid=c.comment_userId WHERE c.comment_product_id=$pid ORDER BY c.comment_agreeCount DESC";
    	 $sql  .= "  LIMIT $start,$count";

        $output["data"]=sql_execute($sql);

        //查询推荐景点信息
        $sql = "SELECT p.product_score score,v.viewSpot_id id,v.viewSpot_title t,v.viewSpot_location destination,v.viewSpot_pic pic,v.viewSpot_price price,v.viewSpot_days days,v.viewSpot_type type";
        $sql .=" FROM qh_viewspot_list As v JOIN qh_product p ON v.viewSpot_id=p.product_vId AND v.viewSpot_location=(SELECT viewSpot_location FROM qh_viewspot_list WHERE viewSpot_id=(SELECT product_vId FROM qh_product WHERE product_id=$pid ) ) ORDER BY v.viewSpot_id LIMIT 1,8";


        $output["viewSpotDetail"]=sql_execute($sql);
        $num = count($output["viewSpotDetail"]);

        if($num < 8){
            $leave = 8 - count( $output["viewSpotDetail"] );

            $sql ="SELECT p.product_score score,v.viewSpot_id id,v.viewSpot_title t,v.viewSpot_location destination,v.viewSpot_pic pic,v.viewSpot_price price,v.viewSpot_days days,v.viewSpot_type type";
            $sql .=" FROM qh_viewspot_list As v JOIN qh_product p ON v.viewSpot_id=p.product_vId ORDER BY v.viewSpot_id LIMIT 1,$leave";

            $arr = sql_execute($sql);
            for($i=0; $i<$leave; $i++){
               $output["viewSpotDetail"][$num + $i]=$arr[$i];
            }
        }
        echo json_encode($output);
?>

