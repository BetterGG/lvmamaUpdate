<?php
    header('Content-Type:application/json;charset=UTF-8');
    /**保存各个楼层内容的数组
    $output=[
        promotionsContent: [ ],
        hotSellContent: [ ],
        channelGroup: [ ],
        channelFree:[ ]
    ]
    */
    $output=[];
    require_once("init.php");

    $sql ="SELECT viewSpot_id,viewSpot_details,viewSpot_pic,viewSpot_price,product_id FROM qh_viewspot_list,qh_product WHERE viewSpot_type=1 and viewSpot_hotMark=5 and product_vId=viewSpot_id ORDER BY viewSpot_hotMark  LIMIT 8";
    $output["promotionsContent"]=sql_execute($sql);

     $sql ="SELECT viewSpot_id,viewSpot_details,viewSpot_pic,viewSpot_price,product_id  FROM qh_viewspot_list,qh_product WHERE viewSpot_type=1 and viewSpot_hotMark=2 and product_vId=viewSpot_id ORDER BY viewSpot_hotMark  LIMIT 8";
     $output["hotSellContent"]=sql_execute($sql);

     $sql ="SELECT viewSpot_id,viewSpot_details,viewSpot_pic,viewSpot_price,product_id FROM qh_viewspot_list,qh_product WHERE viewSpot_type=1 and viewSpot_hotMark=3 and product_vId=viewSpot_id ORDER BY viewSpot_hotMark  LIMIT 6";
     $output["channelGroup"]=sql_execute($sql);

     $sql ="SELECT viewSpot_id,viewSpot_details,viewSpot_pic,viewSpot_price,product_id FROM qh_viewspot_list,qh_product WHERE viewSpot_type=1 and viewSpot_hotMark=4 and product_vId=viewSpot_id ORDER BY viewSpot_hotMark  LIMIT 6";
     $output["channelFree"]=sql_execute($sql);

    echo json_encode($output);

