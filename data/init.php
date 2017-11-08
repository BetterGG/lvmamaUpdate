<?php



Header("Content-Type:application/json;charset=utf-8");




$db_host ='127.0.0.1';
$db_user ='root';
$db_password='';
$db_database='qihang';
$db_port=3306;
$db_charset='UTF8';



$conn = mysqli_connect(

  $db_host, $db_user, $db_password, $db_database, 3306);

mysqli_query($conn,"SET NAMES UTF8;");

function sql_execute($sql){

  global $conn;

  $result = mysqli_query($conn, $sql);


  if(!$result){

    return ["code"=>-1,"msg"=>"查询失败"];

  }else {
    $posts = array();
    while($row = mysqli_fetch_assoc($result)) {
        $posts[] = $row;
    }
    return $posts;
  }

}

?>