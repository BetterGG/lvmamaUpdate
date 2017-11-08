<?php
    require('init.php');
    @$orderType=$_REQUEST['order_type']or die('{"code":-1,"msg":"排序方式是必须的"}');
    @$kw = $_REQUEST["kw"];
    if($orderType==1){
        //按价格升序排序
        $sql="SELECT * FROM qh_viewspot_list JOIN qh_product ON product_vId=viewSpot_id WHERE viewSpot_title like '%$kw%' ORDER BY viewSpot_price";
    }
    else if($orderType==2){
         //按价格降序排序
        $sql="SELECT * FROM qh_viewspot_list JOIN qh_product ON product_vId=viewSpot_id WHERE viewSpot_title like '%$kw%' ORDER BY viewSpot_price DESC";
    }
    else if($orderType==3){
        //按热度等级降序排列
        $sql="SELECT * FROM qh_viewspot_list JOIN qh_product ON product_vId=viewSpot_id WHERE viewSpot_title like '%$kw%' ORDER BY viewSpot_hotMark DESC";
    }
    $rows=sql_execute($sql);
    echo json_encode($rows);
?>