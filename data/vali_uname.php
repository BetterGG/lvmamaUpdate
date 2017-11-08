<?php
require("init.php");
@$uname=$_REQUEST["uname"];
	$sql="select * from qh_user_list where uname='$uname'";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  if($row==0)
	  echo "1";
  else
	  echo "0";


  