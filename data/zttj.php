<?php
 require_once("init.php");
 $sql="select *,product_id from qh_hotel_list,qh_product where hotel_id>82 and hotel_id<=122 AND product_hId=hotel_id";
 $carouselimg=sql_execute($sql);
 echo json_encode($carouselimg);
?>