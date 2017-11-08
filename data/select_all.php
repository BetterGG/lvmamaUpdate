<?php
	require('init.php');
	$sql="SELECT type.viewSpot_tid,tname,count(*) AS count FROM qh_viewspot_list AS list,qh_viewspot_type AS type WHERE list.viewSpot_tid=type.viewSpot_tid GROUP BY type.viewSpot_tid";
	$rows=sql_execute($sql);

	echo json_encode($rows);
?>