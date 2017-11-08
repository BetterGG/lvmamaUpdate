<?php

//接收客户端请求提交来的数据
@$uid = $_REQUEST["uid"];
@$user_name = $_REQUEST['user_name'] or die('user_name required');
@$phone = $_REQUEST['phone'] or die('phone required');
@$address = $_REQUEST['address'] or die('address required');

require("init.php");
$sql = "INSERT INTO qh_address_list VALUES(NULL,$uid,'$user_name','$phone','$address')";
$result = mysqli_query($conn,$sql);

if($result===false){
	//注册失败！将SQL语句输出给客户端找找原因
	echo "<h3>REGISTER ERR</h3>";
	echo "SQL: $sql";
}else {
	//注册成功！向客户端输出刚插入的语句产生的自增编号
	header("Location:../personer.html?uid=$uid");
}

