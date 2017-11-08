<?php

header('Content-Type: application/json;charset=UTF-8');
/**保存各个楼层内容的数组
$output=[
    recommendedItems: [ ],
    newArrialItems: [ ],
    topSaleItems: [ ]
]
*/
$output=[];

require_once("../init.php");

$sql = "SELECT pid,title,details,pic,price,href FROM xz_index_product WHERE seq_recommended>0 ORDER BY seq_recommended  LIMIT 6";
$output["recommendedItems"]=sql_execute($sql);

$sql = "SELECT pid,title,details,pic,price,href FROM xz_index_product WHERE seq_new_arrival>0 ORDER BY seq_new_arrival LIMIT 6";
$output["newArrivalItems"]=sql_execute($sql);

$sql = "SELECT pid,title,details,pic,price,href FROM xz_index_product WHERE seq_top_sale>0 ORDER BY seq_top_sale LIMIT 6";
$output["topSaleItems"]=sql_execute($sql);

echo json_encode($output);