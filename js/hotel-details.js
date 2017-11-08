


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

//数据获取
$.ajax({
    url: "data/getRooms.php"+location.search,
    success(data){
        console.log(data);
        var hotel = data["hotel"];
        var rooms = data["rooms"];
        var imgs = data["pic"];
        var html = "";
        var i = 0;
        //加载图片
        for(let name in imgs){
            i++;
            html += `<img src=${imgs[name]} alt=${i}>`
        }
        html += `<a id="rightArrow" class="sprite right-arrow"></a>
                <a id="leftArrow" class="sprite left-arrow"></a>`;
        $('#leftImg').html(html)
                    .children().first().addClass('imgShow');
        //小图
        html="";
        i = 0;
        for(let name in imgs){
            i++;
            html += `<li><img src="${imgs[name]}" alt=${i} /></li>`;
        }          
        $('#rightImg').html(html)
                            .children().first().children().addClass('smImgs-active');
        //h2标题生成                    
        html = `<h2>
                    <span class="hotel-name">${hotel[0]['hotel_title']}</span>
                    <p class="rt">
                        <span class="symbol">￥</span><span class="price">837</span>起
                        <a href="#buy">立即预定</a>
                    </p>
                </h2>` ;
        $("#main .title").html( html );
        $(".info-address").html( hotel[0]['hotel_location'] );
        $("#main .comment-score").html( " "+hotel[0]['product_score']/5*100+"%" )
        var price = Infinity;
        //房间生成
        html = '';        
        for( let i=0,len=rooms.length;i<len;i++ ){
            var room = rooms[i];
            price = Math.min( price, room['category_price'] );
            html += `<div class="room clear">
                        <div class="img lt">
                            <img src="${room['category_pic']}" alt="">
                        </div>
                        <div class="details lt">
                            <p>${room['category_title']}</p>
                            <p class="room-info">
                                <span>面积：42平方米</span>
                                <span>楼层：12-16楼</span>
                                <span>床型：大床房</span>
                                <span>加床：不能加床</span>
                                <span>最大入住人数：2人</span>
                                <span>宽带：免费</span>
                            </p>
                            <table>
                                <thead>
                                    <tr>
                                        <td>商品名称</td>
                                        <td>床型</td>
                                        <td>早餐</td>
                                        <td>宽带</td>
                                        <td>政策</td>
                                        <td>房价</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>豪华房(不含早)</td>
                                        <td>大床/双床</td>
                                        <td>无早</td>
                                        <td>免费</td>
                                        <td>不可退改</td>
                                        <td><span class="price">￥${room['category_price']}</span></td>
                                        <td ><a class="buy" href="">预定</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`;
        }
        $("#main .product-top .price").html( price );
        $("#main .room-list").html( html );
    }
}).then(function(){
    //图片点击
    $('#rightArrow,#leftArrow,#slipUp,#slipDown').click(function(e){
        var $p=$(e.target),
            index=$('#leftImg .imgShow').attr('alt');
        if($p.attr('id')=='slipDown'){$p=$('#rightArrow')}
        if($p.attr('id')=='rightArrow') {
            if($p.siblings('.imgShow').next().attr('id') != 'rightArrow'){
                $('#rightImg .smImgs-active').removeClass('smImgs-active');
                console.log( $('#rightImg li').eq(index) )
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

    //大图左右箭头图表显示
    $('#leftImg').mouseover(()=>{
        $('#rightArrow').show();
        $('#leftArrow').show();
    }).mouseout(e=>{
        $('#rightArrow').hide();
        $('#leftArrow').hide();
    });
    $('#rightImg').on('click','li',e=>{
        var $e=$(e.target),
        pIndex = $(e.target).attr('alt');
        $('#rightImg .smImgs-active').removeClass('smImgs-active');
        $e.addClass('smImgs-active');
        $("#leftImg").find('.imgShow').removeClass('imgShow');
        $("#leftImg img").eq(pIndex-1).addClass('imgShow');
    });
});


//导航
(()=>{
    var $nav = $(".page_nav");
    var top = getTop($nav[0]);
    var navTag = true;

    //预定电梯
    $("#main .product-top h2 a").click(e=>{
        e.preventDefault();
        var target = $($(e.target).attr("href"))[0];
        var pos = getTop(target)-100;
        console.log(pos)
        to(pos,4);
    })
    //导航滚动监听
    window.onscroll = function(){
        //导航栏出现/隐藏
        var sTop = document.documentElement.scrollTop ||  document.body.scrollTop;
        if( sTop >= top ){
            $nav.css({
                "position": "fixed",
                "left": 112,
                "top": 10
            });
        }else{
            $nav.css({
                "position": "",
                "left": "",
                "top": ""
            });
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
    
    //导航电梯
    $nav.on("click","a",function(e){
        e.preventDefault();
        console.log( $(this).attr("href") );
        var target = $($(this).attr("href"))[0];
        var pos = getTop(target)-100;
        console.log(target,pos)
        to(pos,4);
    });
})();
//日历
(()=>{
    var cDate = new Date();
    var y = cDate.getFullYear();
    var m = cDate.getMonth()+1;
    var d = cDate.getDate();
    var nDate = new Date( `${y}-${m}-${d+1}` )
    $("#buy .arriveDate").val( cDate.toLocaleDateString() );
    $("#buy .leaveDate").val( nDate.toLocaleDateString() );

    calender( $("#buy .box")[0] );

    $("#buy .arriveDate,#buy .leaveDate").focus(()=>{
        $("#buy .box").show();
        var num = 0;
        var d1,d2;
        $("#buy .box").on("click","tbody td.remainDays",e=>{
            var $e = $(e.target);
            var date = $e.html();
            if($e.html()=="今天"){
                date = new Date().getDate();
            }
            var d = $(".currentDate").html()+"-"+date;
            var date = new Date( d ).toLocaleDateString();
            $e.addClass("choose");
            if(num==0){
               d1 = date;
               $("#buy .arriveDate").val(date);
               console.log( $("#buy .arriveDate") )

               num++;
            }else{
               d2 = date;
               $("#buy .leaveDate").val(date);
               var days = ( new Date(d2) - new Date(d1) )/(1000*3600*24)
               $("#buy .num").html(days);

               num = 0;
               $("#buy .box .choose").removeClass("choose")
               $("#buy .box").hide();
            }
        })
    });
    
})();   

//封装 加载评论   景点推荐

function loadCommentsByPage(pno){
    var pageSize=5;
    var pid = location.search.split("=")[1];
    var title = $(".hotel-name").text();
    var pScore = $(".comment-score").text();
    var product_score = parseInt(pScore)/20;
    $.ajax({
            type: 'get',
            url: 'data/product-details/product-comments.php',
            data:{pno,pid,pageSize},
            success: function (comment) {
                console.log(comment)
                html="";
                if(comment.data){
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

                }
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
                console.log( )
                $('.comments-num').html(html)

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
loadCommentsByPage(1);
