var havefunDay=[];
window.onload=function(){
	$('#textSearch').val( decodeURI(location.search.split("=")[1]) );
	$('#seach').trigger("click");
	plist(1);
	$.ajax({
		Type:"GET",
		url:"data/select_all.php",
		success(data){
			var total=0;
			var html1='';
			var html='';
			for(var i=0;i<data.length;i++){
				var obj=data[i];
				html1+=`<li>
				<a href="${obj.viewSpot_tid}">${obj.tname}&nbsp <span>${obj.count}</span></a></li>`;
				total+=parseInt(obj.count);
			}

			 html="<li class='active'><a href='0'>全部旅游 &nbsp<span>"+total+"</span></a></li>"+html1;
			$('#menu').html(html);
		}
	})
}


$('#section ol.pager').click(function(e){
	var $tar=$(e.target);
	plist($tar.html());
});

$('#menu').on("click","a",function(e){
	e.preventDefault();
	var $tar=$(e.target);
	var tid=$tar.attr("href");
	sessionStorage.setItem('viewSpot_type',tid);
	$tar.parent().addClass('active');
	$tar.parent().siblings().removeClass('active');
	$.ajax({
		type:"GET",
		url:"data/lv_detail.php",
		data:{viewSpot_type:tid,pageno:1},
		success:function(data){
			showList(data);
			pageNo(data);
		}
	})
})
//查找关键字
$('#seach').click(function(e){
	e.preventDefault();
	var kw=$('#textSearch').val();
	// $('#section ol.pager').css('display','none');
	$.ajax({
		Type:"GET",
		url:"data/select_bykw.php",
		data:{kw:kw},
		success:function(data){
			if(data.length>0){
				showList(data);
			}
			else{
				 $('#section div.list').html("未找到要查找的内容,换个试试");
			}
		}
	})
})

//排序
$('#order li:not(:eq(0))').click(function(e){
	e.preventDefault();
	$('#section ol.pager').css('display','none');
	$tar=$(e.target);
	var order_type=$tar.index();
	var kw=$('#textSearch').val(); 
	$.ajax({
		Type:"GET",
		url:"data/orderBy.php",
		data:{order_type,kw},
		success:function(data){
			showList(data);
		}
	}).then(function(){
		$tar.addClass("active")
			.siblings(".active").removeClass("active");
	})
})

//筛选
$('#select ul.item input').change(function(e){
	$tar=$(e.target);
	var kw=$('#textSearch').val(); 
	if($tar.is(":checked")){	
		$('#section ol.pager').css('display','none');
		var chooseDay=$tar.val();
		$.ajax({
			Type:'GET',
			url:'data/chooseDay.php',
			data:{viewSpot_days:chooseDay,kw},
			success:function(data){
				//console.log(data);
				havefunDay=havefunDay.concat(data);
				showList(havefunDay);
			}
		})
	}
})
$(".list").on("click","[class*=floor]",function(){
	location.href = $(this).attr("data-href");
})
function pageNo(data){
	var pageHtml="";
	var page=JSON.parse(data[data.length-1]);
	for(var i=1;i<=page.totalPage;i++){
		pageHtml+="<li>"+i+"</li>";
	}
	$('#section ol.pager').html(pageHtml);
}
function showList(data){
    var html="";
	for(var i=0;i<data.length;i++){
		var obj=data[i];
		if(obj.viewSpot_tid==1){
			html+=`
				<div class="floor1" data-href="viewSpot-details.html?pid=${obj.product_id}">
					<div class="img">
						<a href="#"><img src="${obj.viewSpot_pic}" alt=""></a>
						<span></span>
					</div>
					<div class="itro">
						<h2>${obj.viewSpot_title}<br>
							<span>${obj.viewSpot_details} <b>优惠</b></span>
						</h2>
						<p><span>促销</span>&nbsp每满30000减70</p>
						<ul>
							<li><i></i><span class="go">✈太原出发</span>| 飞机往返| 品质型酒店|</li>
							<li><span class="info">目的地</span>${obj.viewSpot_location}</li>
							<li><span class="info">游玩天数</span>${obj.viewSpot_days}</li>
						</ul>
					</div>
					<div class="pric">
						<h1><span>￥${obj.viewSpot_price}</span>起/人</h1>
						<button>查看详情</button>
						<p>热度等级:<span>${obj.viewSpot_hotMark}</span></p>
					</div>
			</div>`;
		}
		else if(obj.viewSpot_tid==2){
			html+=`
			<div class="floor2" data-href="viewSpot-details.html?pid=${obj.product_id}">
				<div class="img">
					<a href="#"><img src="${obj.viewSpot_pic}" alt=""></a>
					<span></span>
				</div>
				<div class="itro">
					<h2>${obj.viewSpot_title}</br>
						<span>${obj.viewSpot_details}</span>
					</h2>
					<ul>
						<li><i></i><span class="go">✈太原出发</span></li>
						<li><span class="info">目的地</span>${obj.viewSpot_location}</li>
						<li><span class="info">游玩天数</span>${obj.viewSpot_days}</li>
					</ul>
				</div>
				<div class="pric">
					<h1><span>￥${obj.viewSpot_price}</span>起/人</h1>
					<button>查看详情</button>
					<p>热度等级:<span>${obj.viewSpot_hotMark}</span></p>
				</div>
			</div>
			`;
		}
		else if(obj.viewSpot_tid==3){
			html+=`
				<div class="floor3" data-href="viewSpot-details.html?pid=${obj.product_id}">
				<div class="img">
					<a href="#"><img src="${obj.viewSpot_pic}" alt=""></a>
					<span></span>
				</div>
				<div class="itro">
					<h2>${obj.viewSpot_title}</br>
						<span>${obj.viewSpot_details}</span>
					</h2>
					<ul class="s_p">
						<li><b class="sleep">住</b><span class="info">酒店</span>${obj.viewSpot_location}</li>
						<li><b class="play">玩</b><span class="info">游玩天数</span>${obj.viewSpot_days}</li>
					</ul>
				</div>
				<div class="pric">
					<h1><span>￥${obj.viewSpot_price}</span>起/人</h1>
					<button>查看详情</button>
					<p>热度等级:<span>${obj.viewSpot_hotMark}</span></p>
				</div>
			</div>
			`;
		}
		else if(obj.viewSpot_tid==4){
			html+=`
			 <div class="floor4" data-href="viewSpot-details.html?pid=${obj.product_id}">
				<div class="img">
					<a href="#"><img src="${obj.viewSpot_pic}" alt=""></a>
					<span></span>
				</div>
				<div class="itro">
					<h2>${obj.viewSpot_title}</br>

						<span>${obj.viewSpot_details}<b>优惠</b></span>
					</h2>
					<p><span>促销</span>&nbsp每满30000减70</p>
					<ul class="s_p">
						<li><b class="sleep">住</b><span class="info">酒店</span>${obj.viewSpot_location}</li>
						<li><b class="play">玩</b><span class="info">游玩天数</span>${obj.viewSpot_days}</li>
					</ul>
				</div>
				<div class="pric">
					<h1><span>￥${obj.viewSpot_price}</span>起/人</h1>
					<button>查看详情</button>
					<p>热度等级:<span>${obj.viewSpot_hotMark}</span></p>
				</div>
			</div>
			`;
		}
		else{
			html+=`
			<div class="floor1" data-href="hotel-details.html?pid=${obj.product_id}">
				<div class="img">
					<a href="#"><img src="${obj.hotel_img}" alt=""></a>
					<span></span>
				</div>
				<div class="itro">
					<h2>${obj.hotel_title}<br>
					</h2>
					<p><span>促销</span>&nbsp每满300减70</p>
					<ul>
						<li><i></i>品质型酒店|</li>
						<li><span class="info">地址</span>${obj.hotel_location}</li>
					</ul>
				</div>
				<div class="pric">
					<h1><span>￥${obj.hotel_price}</span>起/人</h1>
					<button>查看详情</button>
					<p>热度等级:<span>${parseInt(obj.product_score)}</span></p>
				</div>
		</div>`;
		}
 	}
	$('#section div.list').html(html);

}

//翻页函数
function plist(pages){
	var tid=sessionStorage['viewSpot_type'];	
	var kw=$('#textSearch').val();
	$.ajax({
		Type:"GET",
		url:"data/lv_detail.php",
		data:{viewSpot_type:tid,pageno:pages,kw},
		success:function(data){
			showList(data);
			pageNo(data);
			$("#section ol.pager li").eq(pages-1).addClass("active")
				.siblings(".active").removeClass("active");
		}

	})
}