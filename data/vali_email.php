<?php
require("init.php");
@$email=$_REQUEST["email"];
	$sql="select * from qh_user_list where email='$email'";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  if($row==0)
	  echo "1";
  else
	  echo "0";