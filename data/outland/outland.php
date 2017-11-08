<?php
    header('Content-Type: application/json;charset=UTF-8');
    require("../init.php");

    $output=[
		"Island"=>"",
		"Japan"=>"",
		"Africa"=>"",
		"European"=>"",
		"SoutheastAsia"=>"",
		"Discount"=>""
    ];

    function data($location){
        $sql="SELECT product_id,viewSpot_title,viewSpot_details,viewSpot_location,viewSpot_pic,
                viewSpot_price FROM qh_viewSpot_list
                JOIN qh_product ON product_vId=viewSpot_id
                WHERE viewSpot_location='$location'";
	    return sql_execute($sql);
    }

    $output["Island"] = data("Island");
    $output["Japan"] = data("Japan");
    $output["Africa"] = data("Africa");
    $output["European"] = data("European");
    $output["SoutheastAsia"] = data("SoutheastAsia");
    $output["Discount"] = data("Discount");

    echo json_encode($output);
?>