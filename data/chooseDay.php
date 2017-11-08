<?php
    require('init.php');
    $havefunDays=[];
    @$kw = $_REQUEST["kw"];
    @$havefunDay=$_REQUEST['viewSpot_days']or die('{"code":-1,"msg":"游玩天数选择不能为空"}');
    $sql="SELECT * FROM qh_viewspot_list JOIN qh_product ON product_vId=viewSpot_id WHERE viewSpot_title like '%$kw%' AND viewSpot_days=$havefunDay";
    $rows=sql_execute($sql);
    Array_push($havefunDays,$rows);
    echo json_encode($rows);
?>