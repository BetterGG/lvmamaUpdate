<?php
 require("init.php");
 $uname = $_REQUEST["uname"];
 $upwd = $_REQUEST["upwd"];
 $sql = "SELECT * FROM qh_user_list WHERE '$uname' IN (uname,email,phone)  AND upwd='$upwd'";
 $result = mysqli_query($conn,$sql);
 $row = mysqli_fetch_assoc($result);
if($row==null){
   echo json_encode( [ "code"=>-1] );
 }else{
  echo json_encode( [ "code"=>1,"uid"=>$row["uid"] ] );
 }
?>