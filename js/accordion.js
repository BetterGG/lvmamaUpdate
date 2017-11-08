
setTimeout(function(){
	$("[name=uid]").val( location.search.split("=")[1] );
},0)
$('#change li').click(function(){
	if($(this).index()==0){
		$('#msg1').addClass("show");
		$('#msg2').removeClass("show");
	}
	else{
	    $('#msg2').addClass("show");
		$('#msg1').removeClass("show");
	}
	

});
$(".accordion").on("click","li",function(){
	$(this).parent().parent().parent().find(".active").removeClass("active");
	$(this).addClass("active");

});

$(".logo-list").on("click","li:not(.active)",function(){
	$(this).addClass("active")
		.siblings().removeClass("active");
	var index = $(this).index();
	$(".main-body").eq(index).addClass("show")
		.siblings(".show").removeClass("show");	
	$(".accordion").eq(index).addClass("show")
		.siblings(".show").removeClass("show");	
});

//新增信息
$("#add1").click(function(){
	$(".add").eq(0).show();
});
$("#add2").click(function(){
	$(".add").eq(1).show();
});
$(".add .close").click(function(){
	$(this).closest(".add").hide();
});