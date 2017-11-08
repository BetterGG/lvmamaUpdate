<?php
  require("init.php"); 
	#1、获取请求提交的数据
	$uname=$_REQUEST["uname"];
	$upwd=$_REQUEST["upwd"];
	$email=$_REQUEST["email"];
	$phone=$_REQUEST["phone"];
	$user_card=$_REQUEST["user_card"];

	$sql="insert into qh_user_list(uname,upwd,email,phone,user_card) values('$uname','$upwd','$email','$phone','$user_card')";
	$result=mysqli_query($conn,$sql);
	if($result === true){
		echo "1";
	}else{
		echo "0";
	}