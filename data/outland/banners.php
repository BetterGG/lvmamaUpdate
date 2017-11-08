<?php
header('Content-Type: application/json;charset=UTF-8');

require_once("../init.php");

$sql = "SELECT banner_pic_id,banner_pic FROM qh_banner";
echo json_encode(sql_execute($sql));