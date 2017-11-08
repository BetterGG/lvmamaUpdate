<?php
 require_once("init.php");
 $sql="select hotel_img from qh_hotel_list where hotel_title='轮播图'";
 $carouselimg=sql_execute($sql);
 echo json_encode($carouselimg);
?>