(()=>{
    var html="",days,location,title,price,line,pScore,product_score,pid;
    function loadPageDetails(pid) {
        $.ajax({
            type: 'get',
            url: 'data/product-details/product-details.php',
            data: {pid},
            success: function (data) {
                var details= data.details, imgs=data.detailsPic,
                    n=-1,pid=imgs.pic_product_id,
                    bgImgs=imgs.pic_bg;

                product_score=data.productScore.product_score,
				pScore=parseFloat(product_score)*20+'%',
                days=details.viewSpot_days,
                location=details.viewSpot_location,
                title=details.viewSpot_title,
                price=details.viewSpot_price,
                line=details.viewSpot_line;
                //console.log(line);
                //记录图片数
                for(var k in imgs){n++}
                for(var i=1;i<n;i++){
                    img = imgs["pic_pic"+i];
                    html += `<img src="${img}" alt="${i}"/>`
                }
                html += `<a id="rightArrow" class="sprite right-arrow"></a>
                <a id="leftArrow" class="sprite left-arrow"></a>`;
                $('#leftImg').html(html)
                            .children().first().addClass('imgShow');
                //小图
                html="";
                for(var i=1;i<n;i++){
                     img = imgs["pic_pic"+i];
                    html += `<li><img src="${img}" alt="${i}"/></li>`
                }
                $('#rightImg').html(html)
                            .children().first().children().addClass('smImgs-active');
                //右侧信息

                html='';
                html+=`
                <span class="travel_start">${details.viewSpot_location}出发</span>
                <span>|<b>${title}</b>&nbsp;${details.viewSpot_details}</span>
                <li class="tips" title="高品质跟团游：严选放心精品，全程贴心服务，行程安心透明，食宿动心升级，预订省心无忧">开心驴行</li>
                `;
                $('#product-title').html(html);
                $('#product-num').html(`产品编号： ${pid}`);
                $('#product-price').html(`<b>${price}</b>`);
                $('#product-line').html(line);
                $('.number_left').html(pScore);

                //产品详情介绍，图片处理（7张）
                var bgImgsTop=bgImgs.replace('*',1);
                html='';
                html=`<img src="${bgImgsTop}" alt=""/>`;
                $('#bgImgs-top').html(html);
                html='';
                for(var i=2,image='';i<9;i++){
                     image=bgImgs.replace('*',i);
                    html+=`<img src=" ${image}" alt=""/>`
                }
                $('#bgImgs').html(html);
                //
                html='';
                html=`<li>行程天数：</li><li>${days}天</li>
                    <li>行程特色：</li><li>天坛，北京的标志；长城，民族的象征。</li>
                    <li>线路概况：</li><li>【${days}天】 ${line} </li>`
                $('#journey ul').html(html);

            },
            error: function () {
                alert("您的网络出现故障，请检查")
            }
        }).then(()=>{
            //需页面图片数据加载完成后才能绑定的点击事件，外部封装imgsClick
            imgsClick();
        })
    }
    console.log(window.location.search)
    var pid = window.location.search.split("=")[1];
    loadPageDetails(pid);
    //图片点击事件

    function imgsClick(){
        $('#rightArrow,#leftArrow,#slipUp,#slipDown').click(function(e){
            var $p=$(e.target),
                index=$('#leftImg .imgShow').attr('alt');
            if($p.attr('id')=='slipDown'){$p=$('#rightArrow')}
            if($p.attr('id')=='rightArrow') {
                if($p.siblings('.imgShow').next().attr('id') != 'rightArrow'){
                    //console.log($('#rightImg li:nth-child(index)'));
                    $('#rightImg .smImgs-active').removeClass('smImgs-active');
                    $('#rightImg li').eq(index).children().addClass('smImgs-active');
                    $p.siblings('.imgShow').removeClass('imgShow')
                        .next().addClass('imgShow');
                }
            }
            if($p.attr('id')=='slipUp'){$p=$('#leftArrow')}
            if($p.attr('id')=='leftArrow'){
                if(!$('#leftImg').children().first().hasClass('imgShow')){
                    $('#rightImg .smImgs-active').removeClass('smImgs-active');
                    $('#rightImg li').eq(index-2).children().addClass('smImgs-active');
                    $p.siblings('.imgShow').removeClass('imgShow')
                        .prev().addClass('imgShow');
                }
            }
        });
    }
	//大图左右箭头图表显示
    $('#leftImg').mouseover( e=>{ $('#rightArrow,#leftArrow').show() })
        .mouseout( e=>{ $('#rightArrow,#leftArrow').hide() });

    $('#rightImg').on('click','li',e=>{
        var $e=$(e.target),
        pIndex = $(e.target).attr('alt');
        $('#rightImg .smImgs-active').removeClass('smImgs-active');
        $e.addClass('smImgs-active');
        $("#leftImg").find('.imgShow').removeClass('imgShow');
        $("#leftImg img").eq(pIndex-1).addClass('imgShow');
    });
    //页面收藏功能  纯样式
    $('#collect').click( function(){
        if($(this).find('span').html()=='收藏'){
            $(this).addClass('orange')
                .find('span').html("已收藏")
        }else{
            $(this).removeClass('orange')
                .find('span').html("收藏")
        }
    });
    //日历生成-----------------------------------

    //判断闰年
    function isLeapYear(year){
        if( year%4==0 && year%100!==0 ||year%400==0){
            return true;
        }else{
            return false;
        }
    }

    //获取月份，以及对应的天数
    function getDays(years,month) {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
                break;
            case 2:
                return isLeapYear(years) ? 29 : 28;
        }
    }

    //获取当前显示日历的上的年 月 日
    function getBoxDate() {
        var title=$(".cale_title span");
        var date =title.html().split("年");
        console.log(date);
        var y=Number(date[0]);
        var m=Number(date[1]);
        var nDate = new Date();
        return {y,m};
    }

    //获取上个月与下个月的函数
    function getPreDate(year,month) {
        var m,y;
        if(month==1){
            m = 12;
            y = year-1;
        }else{
            m = month-1;
            y = year;
        }
        return {y,m};
    }

    function getNextDate(year,month){
        var m,y;
        if(month==12){
            m = 1;
            y = year+1;
        }else{
            m = month+1;
            y = year;
        }
        return {y,m};
    }

    //创建并加载日历

    function createCalender(date) {
        var preM,preY,pd,
        y = date.getFullYear(),  //  2017
        m = date.getMonth()+1,   //  9   9+1
        d = date.getDate();      //  16

        preY = getPreDate(y,m).y;
        preM = getPreDate(y,m).m;
        pd = getDays(preY,preM);

        $(".smtitle").html(`${y}年${m}`);
        //今天星期?
        var w = date.getDay(),
             num = 0,
             days = getDays(y,m);
        //当月起始位置的格子下标
        var start = w - (d%7 - 1);

        start = start >= 0 ? start : start+7;
        //当月结束位置的格子下标
        var end = start + days;

        var html="";
        for(let i=0;i<6;i++){
            html+="<tr>";
            for(let j=0;j<7;j++){
                if(num>=start && num <end){
                    if(num-start+1==d){//当前天
                        if(num-start+1==1){
                            html += `<td class='oneDay'>
                                        <div>
                                            <li >1</li>
                                            <li >充足</li>
                                            <li >¥169起</li>
                                        </div>
                                    </td>`;
                        }else{
                            html += `<td class='nowDay'>
                                        <div >
                                            <li >${num-start+1}</li>
                                            <li >充足</li>
                                            <li >¥169起</li>
                                        </div>
                                    </td>`
                        }
                    }else{
                        html += `<td class='nowMothDays'>
                                    <div >
                                        <li >${num-start+1}</li>
                                        <li >充足</li>
                                        <li >¥169起</li>
                                    </div>
                                </td>`
                    }
                }
                else if(num<start){//上个月
                    html += `<td class='otherMonthDays'>
                                <div >
                                    <li >${pd-start+1+num}</li>
                                    <li >充足</li>
                                    <li >¥169起</li>
                                </div>
                            </td>`
                }
                else{//下个月
                    html += `<td class='otherMonthDays'>
                                <div >
                                    <li >${num-end+1}</li>
                                    <li >充足</li>
                                    <li >¥169起</li>
                                </div>
                            </td>`
                }
                num++;
            }
            html += "</tr>";
        }
        $(".calebox tbody").html(html);

        putClass(y,m);
    }
	//为日历添加样式
	function putClass(y,m){
		var monthNow = (new Date()).getMonth()+1,
            yearNow = (new Date()).getFullYear();
        $(".calebox tbody tr td div").addClass('caledate');
        $(".calebox tbody tr td div li:first-child").addClass("caleday");
        if(y==yearNow && m==monthNow){
            $(".calebox tbody tr td div li:first-child")
                .next().addClass("caleinfo")
                .next().addClass("caleprice");

			$(".calebox tbody tr td.nowDay div li:first").html("今天")
				.siblings().hide()
				.parent().css('color','#ccc');
			if( !$(".calebox tbody tr td:first").hasClass('nowDay') ){
				$(".calebox tbody tr td.nowDay").prevAll().children().children("li:first-child").siblings().hide()
							.parent().css('color','#ccc');
			}
            if( $(".calebox tbody tr td.nowDay").parent() != $(".calebox tbody tr:first") ){
				$(".calebox tbody tr td.nowDay").parent().prevAll().children().children().children("li:first-child").siblings().hide()
									.parent().css('color','#ccc');
			}
        }else{
            $(".calebox tbody tr td div li:first-child").siblings().hide();
        }
		
		if(y<yearNow || m<monthNow){
			$(".calebox tbody tr").css('color','#ccc');
		}
	}

    //按钮点击事件
    $(".cale_pre").click(()=>{
        var date = getBoxDate();
        var newDate = new Date();
        var d = 1;
        var preDate=getPreDate(date.y,date.m);

        if(  preDate.y==newDate.getFullYear() && preDate.m==newDate.getMonth()+1 ){
            d = newDate.getDate();
            console.log("equal")
        }

        var pDate = new Date( `${preDate.y}-${preDate.m}-${d}`);
        //console.log(date,pDate );
        createCalender(pDate);


    });
    $(".cale_next").click(()=>{
        var date = getBoxDate();
        var newDate = new Date();
        var d = 1;
        var nextDate=getNextDate(date.y,date.m);

        if(  nextDate.y==newDate.getFullYear() && nextDate.m==newDate.getMonth()+1 ){
            d = newDate.getDate();
            console.log("equal")
        }


        var nDate = new Date( `${nextDate.y}-${nextDate.m}-${d}`)
//        console.log(date,nDate );
        createCalender(nDate);

    });
	
    createCalender(new Date());

	
	//表单选项生成
	var html=`<option value="0">请选择出行时间</option>`, now = new Date;
	var nowYear = now.getFullYear(), nowMonth = now.getMonth()+1 ,nowDay = now.getDate();
	var formDays=getDays(nowYear,nowMonth);
	for(var i=nowDay+1; i<=formDays; i++ ){

		html +=`<option value="${i}">出行日：&nbsp;${nowYear}&nbsp;年&nbsp;${i}&nbsp;日</option>`
	}
	$('#form-date').html(html).children();
	html ='';

	//日历单天点击事件
	$(".calebox tbody").on("click"," tr td",function(){
		if( $(".calebox tbody tr td").hasClass('click') ){
			$(".calebox tbody tr td.click").removeClass('click');
		}
		$(this).addClass('click');
		
		if( $(this).children().children('li:last').attr('style') != 'none' ){
			var index = parseInt( $(this).children().children('li:first').html() );
			var option = $('#form-date option[value='+index+']');
			if(option.length){
				option.prop('selected','true');
			}
		}
	})
	

//------------------------------评论页面加载--------------------------------------
//封装 加载评论   景点推荐

	function loadCommentsByPage(pno){
		var pageSize=5;
		$.ajax({
				type: 'get',
				url: 'data/product-details/product-comments.php',
				data:{pno,pid,pageSize},
				success: function (comment) {
					html="";
					if(comment.data.code!==-1){
						for(var c of comment.data){
							var star=Math.round(c.s);
							html+=`<div class='single'><div class="content-top"><span class="elite">精华</span>`;
							html+=`<i class="glyphicon glyphicon-star orange font1"></i>`.repeat(star);
							html+=`<i class="glyphicon glyphicon-star font1"></i>`.repeat(5-star);
							html+=`<span>&nbsp;&nbsp;&nbsp;&nbsp; 景点 ${star}（推荐）</span><span>酒店 ${star}（推荐）</span>
										<span>服务 ${star}（推荐）</span><span>交通 ${star}（推荐）</span>
									</div>`;
							html+=`<p class="content-middle">
										${c.text}
										<span class="content-show" >显示全部</span>
									</p>`;
							html+=`
									<div class="content-end clear">
										<p class="end-left" title="${title}">
											<span class="user">${c.uname}</span> 对 “<span class="end-destination">${title}</span>”...发表点评&nbsp;&nbsp;&nbsp;&nbsp; ${c.time}
										</p>
										<p class="end-right font1">
											<i class=" glyphicon glyphicon-thumbs-up"></i>有用&nbsp;&nbsp;<span>${c.count}</span>
										</p>
									</div></div>`;
						}
                    }
					html+=`
						<ul class="comments-page clear">
							<li class="glyphicon glyphicon-triangle-left"></li>
							<li class="page-active">1</li>
							<li>2</li>
							<li>3</li>
							<li class="glyphicon glyphicon-triangle-right"></li>
						</ul>`;
					$('#comment-content').html(html);

                    //景点推荐-------------------------------------------------
                    var details = comment.viewSpotDetail;
                    html='';
                    for(var d of details){
                        var score = parseFloat(d.score)*20+"%";

                        html +=`
                            <div class="content-block">
								<div class='block-pic'>
									<img src="${d.pic}" alt=""/>
								</div>
                                <a class="recommend-content-title" href="javascript:;" >${d.t}</a>
                                <p class="good">好评率：<span class="good-num orange ">${score}</span></p>
                                <p class="product-price"><span class="orange price-show">￥${d.price} </span> 起/人</p>
                                <div class="content-text ">
                                    <p>行程天数：${d.days}天${(d.days) -1}晚 <br/>出发地：北京 <br/>目的地：${d.destination}</p>
                                </div>
                            </div>`;
                    }
                    $('.recommend-content').html(html);

                    $('.destination').html(location);

					html='';
					//生成动态页码
					comment.pno = Number(comment.pno);
					html = `<li><a class="glyphicon glyphicon-triangle-left"></a> </li>`;
					if(comment.pno-2>0){html += `<li><a href="${comment.pno-2}">${comment.pno-2}</a></li>`}
					if(comment.pno-1>0){html += `<li><a href="${comment.pno-1}">${comment.pno-1}</a></li>`}
					html += `<li class="page-active"><a href="${comment.pno}">${comment.pno}</a></li>`;
					if(comment.pno+1<=comment.pageCount)
						{html += `<li><a href="${comment.pno+1}">${comment.pno+1}</a></li>`;}
					if(comment.pno+2<=comment.pageCount)
						{html += `<li><a href="${comment.pno+2}">${comment.pno+2}</a></li>`}
					html +=`<li ><a class="glyphicon glyphicon-triangle-right"></a></li>`;
					$("#comment-content .comments-page").html(html);
					//其他数据加入
					html=`<li>全部点评(${comment.recodeCount})</li>`;
					$('.content-title').html(html);
					html=`<span class="orange">(${comment.recodeCount})</span>`;
					$('#nav_bar a span').html(html)

					html=`<div class="title-left">
								<p class="font3 orange">${pScore}</p>
								<p>好评率</p>
								<p>来自 <span class="orange">${comment.recodeCount}</span>位旅客的真实点评</p>
							</div>
							<div class="title-right">
								<p>景点(${product_score}) <progress value="${product_score}" max="5"></progress></p>
								<p>酒店(${product_score}) <progress value="${product_score}" max="5"></progress></p>
								<p>服务(${product_score}) <progress value="${product_score}" max="5"></progress></p>
								<p>交通(${product_score}) <progress value="${product_score}" max="5"></progress></p>
							</div>`;
					$('.comments-title').html(html);

				},
				error:function(){
					alert("您的网络出现故障1，请检查")
				}
			}).then(()=>{
				$("#comment-content .comments-page").on("click","li a",function(e){
					e.preventDefault();
					var $e=$(e.target);

					if($e.parent().hasClass('page-active')){ return }
					//获取当前页码
					var pno,
						dno=$(".comments-page li.page-active").children().html(); //1
					
					if($e.hasClass('glyphicon-triangle-left')){
						if(!$e.parent().next().hasClass("page-active")){
								pno=parseInt(dno)-1;
							}else{ return }
					}else if($e.hasClass('glyphicon-triangle-right')){
                        console.log(!$e.parent().prev().hasClass("page-active"));
						if(!$e.parent().prev().hasClass("page-active")){
							pno=parseInt(dno)+1;
						}else{ return }
					}else{
						pno=parseInt($e.attr("href"));
						console.log($e.attr("href"));
					}
					loadCommentsByPage(pno);
				})
				$('.content-show').click(e=>{
					var $e=$(e.target);
					if($e.html()=='显示全部'){
						$e.html('收  起')
							.parent().addClass('middle-show');

					}else{
						$e.html('显示全部')
							.parent().removeClass('middle-show');
					}
				})
				
				$('.end-right').click(function(){
					$(this).addClass('orange');
					var index=parseInt( $(this).find('span').html() )+1;
					$(this).find('span').html(index)
				})
			})
	}

	//页面滚动到一定高度时触发加载评论数据
    var b2 = true;
    var $nav = $(".page_nav");
    var top = getTop($nav[0]);
    var navTag = true;
    window.onscroll = function(){
        //页面滚动到一定高度时触发加载评论数据
        var sTop = document.documentElement.scrollTop ||  document.body.scrollTop;
        var b1 = sTop > getTop($("#book-notes")[0]);
        if(b1&&b2){
            console.log('加载评论');
            loadCommentsByPage();
            b2 = false;
        }

        //导航栏出现/隐藏
       
        if( sTop >= top ){
            $('#nav_bar').addClass('fixed')
        }else{
            $('#nav_bar').removeClass('fixed')
        }
        //滚动切换导航
        var a = $nav.children();
        // console.log(a)
        for( let i=0;i<a.length;i++ ){
            var target = $(a.eq(i).attr("href"))[0];
            if( sTop >= getTop(target)-101 ){
                $(a[i]).addClass("nav-active")
                    .siblings(".nav-active").removeClass("nav-active");
            }
        }       
    };
    $nav.on("click","a",function(e){
            e.preventDefault();
            console.log("click")
            var $e = $(e.target);
            to( getTop( $($e.attr("href"))[0]),4 );
        })

})();