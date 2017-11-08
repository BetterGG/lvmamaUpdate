<?php
	require('init.php');
	@$pageno=$_REQUEST["pageno"]or die('{"code":-2,"msg":"页码是必须的"}');
	@$kw = $_REQUEST['kw'];
	@$tid=$_REQUEST['viewSpot_type'];
	$pageSize=8;
	$offset=$pageSize*($pageno-1);
	if($tid==0){
	$sql="SELECT COUNT(*) FROM qh_viewspot_list JOIN qh_product ON product_vId=viewSpot_id WHERE viewSpot_title like '%$kw%'";
	}else{
	$sql="SELECT COUNT(*) FROM qh_viewspot_list JOIN qh_product ON product_vId=viewSpot_id WHERE viewSpot_title like '%$kw%' WHERE viewSpot_tid=$tid";
	}
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	$total=$row[0];
	$totalPage=ceil($total/$pageSize);
	if($tid==0){
      $sql="SELECT * FROM qh_viewspot_list JOIN qh_product ON product_vId=viewSpot_id LIMIT $offset,$pageSize";
    }
    else{
     $sql="SELECT * FROM qh_viewspot_list JOIN qh_product ON product_vId=viewSpot_id WHERE viewSpot_tid=$tid LIMIT $offset,$pageSize";
    }
	$str="{\"totalPage\":$totalPage}";
	$rows=sql_execute($sql);
	Array_push($rows,$str);
    echo json_encode($rows);
?>