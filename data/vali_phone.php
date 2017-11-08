<?php
require("init.php");
@$phone=$_REQUEST["phone"];
	$sql="select * from qh_user_list where phone='$phone'";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  if($row==0)
	  echo "1";
  else
	  echo "0";