<?php

//接收客户端请求提交来的数据
@$uid = $_REQUEST['uid'] or die('uid required');
@$user_name = $_REQUEST['user_name'] or die('user_name required');
@$gender = $_REQUEST['gender'];
@$phone = $_REQUEST['phone'] or die('phone required');
@$email = $_REQUEST['email'] or die('email required');
@$user_card = $_REQUEST['user_card'] or die('user_card required');

require("init.php");
$sql = "INSERT INTO qh_tourist VALUES(NULL,$uid,'$user_name',$gender,'$phone','$email','$user_card')";

$result = mysqli_query($conn,$sql);

if($result===false){
	//注册失败！将SQL语句输出给客户端找找原因
	echo "<h3>REGISTER ERR</h3>";
	echo "SQL: $sql";
}else {
	//注册成功！向客户端输出刚插入的语句产生的自增编号
	header("Location:../personer.html?uid=$uid");
}

