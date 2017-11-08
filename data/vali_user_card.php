<?php
require("init.php");
@$user_card=$_REQUEST["user_card"];
	$sql="select * from qh_user_list where user_card='$user_card'";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  if($row==0)
	  echo "1";
  else
	  echo "0";