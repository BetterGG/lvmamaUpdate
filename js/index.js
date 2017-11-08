/**
 * Created by WEB-UID-JAVA on 2017/9/25.
 */


//选项卡切换

function tabChange(tabs,target,method,isCarousel){

    var i = 0;
    var timer = null;

    target.eq(0).addClass("show");
    tabs.on(method,"li",function(){
        var $this = $(this);
        var index = $this.index();
        i = index;
        $this.addClass("active").siblings(".active").removeClass("active");

        target.eq(index).addClass("show")
                .siblings(".show").removeClass("show");

        //轮播则重启定时器
        if(isCarousel){
            clearInterval(timer);
            timer = setInterval(()=>{
                autoPlay(tabs,target);
            },3000);
        }

    });


    //是否轮播
    if(isCarousel){
        function autoPlay(tabs,target){
            i++;
            i = i%4;
            target.eq(i).addClass("show").siblings(".show").removeClass("show");
            tabs.children("li:eq("+i+")").addClass("active").siblings(".active").removeClass("active");
        }

        timer = setInterval(()=>{
            autoPlay(tabs,target);
        },3000);

        target.hover(function() {
            clearInterval(timer);
        },function () {
            timer = setInterval(()=>{
                autoPlay(tabs,target);
            },3000);
        })
    }

}

//数据初始化
function dataInit(data,len,container,bool){
    var html = '';
    
    for( let i=0;i<len;i++ ){
        da = unorder(data);
        html += `<div class="options">`
        for(var d of da){
            if(d['viewSpot_pic']){
                html += ` <div class="option" data-href="viewSpot-details.html?pid=${d['product_id']}">`;
            }else{
                html += ` <div class="option" data-href="hotel-details.html?pid=${d['product_id']}">`;
            }
            html += `<img src="${d['viewSpot_pic'] || d['hotel_img']}" alt="">
                        <p class="option_title">
                            <span>${d['viewSpot_title']?'热门景点':'酒店推荐'}</span>
                            ${d['viewSpot_title'] || d['hotel_title']}
                        </p>
                        <p class="option_buy">
                            <span class="price">￥${d['viewSpot_price'] || d['hotel_price']}</span>起`;
            if(bool){
                html += `<span class="comment">￥${(d['product_score']/5*100).toFixed(2)}%好评率</span>   `
            }else{
                html += `<span class="prev">￥${parseInt(d['viewSpot_price']*1.3)}</span>`
            }                
                                                 
            html += `</p></div>`;
        }
        html += "</div>"
    }
    container.append(html);
}

//电梯
(()=>{
    $elev = $("#elevator");
    window.onscroll = function(){
        var sTop = document.documentElement.scrollTop ||  document.body.scrollTop;
        if( sTop >= 480 ){
            $elev.fadeIn();
            var $li = $elev.children();
            for( let i=0;i<$li.length;i++ ){
                var target = $($li.eq(i).attr("data-target"))[0];
                if( sTop >= getTop(target)-101 ){
                    $($li[i]).addClass("active")
                        .siblings(".active").removeClass("active");
                }
            }
        }else{
            $elev.fadeOut();
        }
    };
    $elev.on("click","li",function(e){
        var target = $($(this).attr("data-target"))[0];
        var pos = getTop(target)-100;
        to(pos,4);
    });
})();


//轮播图
(()=>{ 
    tabChange($("#banner .carousel_dot"),$("#banner .carousel>li"),"mouseover",true);
})();

//获取数据
(()=>{
    //search_list
    $.ajax({
        url: "data/getHotViewSpot.php",
        success(data){
            $box = $("#banner .search");
            var titles = ["跟团游","自由行","当地游","酒店","景点门票","机票","火车票","邮轮"];
            var html = "";
            for(let i=0;i<8;i++){
                html += `
                    <div class="search_details lt">
                        <ul class="search_title clear">
                            <li class="active">${titles[i]}</li>
                        </ul>
                        <div class="search_details_box">
                            <input type="text" placeholder="请输入目的地、主题或景区名">
                            <p>
                                <button class="search_btn">搜索</button>
                            </p>
                           <div class="search_hot">
                               <h4 class="lt">热门景点</h4>
                               <ul class="search_hot_list lt">`;
                for( let j=0;j<data[i%4].length;j++ ){

                    var title = data[i%4][j]["viewSpot_title"] || data[i%4][j]["hotel_title"];
                    title = title.slice(0,6);
                    html += `<li><a href="viewSpot-details.html?pid=${data[i%4][j]['product_id']}">${title}</a></li>`;
                   
                }
                html += ` </ul>
                       </div>
                        <a class="search_ad">
                            <img src="img/banner_ad.jpg" alt="">
                        </a>
                    </div>
                </div>
                `;
            }
            $box.append(html);
        }
    }).then(()=>{
        //search_list切换
        tabChange($("#banner .search_list"),$("#banner .search_details"),"click");

        //搜索跳转
        $("#banner .search_btn").click(e=>{
            var kw =  $(e.target).parent().siblings("input").val();
            location.href = "search-details.html?kw="+kw;
        })
    })
    //category
    $.ajax({
        url: "data/getData.php?len=5",
        success(data){

            var html = "";

            for( let i=0;i<4;i++ ){
                var d = unorder(data);
                html += `<div class="options">`;
                for( let j=0;j<d.length;j++ ){
                    html += `                      
                            <div class="option" data-href="viewSpot-details.html?pid=${d[j]['product_id']}">
                                <img src="${d[j]["viewSpot_pic"]}">
                                <p class="option_title">
                                    <span>景区畅游</span>
                                    ${d[j]["viewSpot_title"]}
                                </p>
                                <p class="option_buy">
                                    <span class="price">￥${d[j]["viewSpot_price"]}</span>起
                                    <a href="prodcut.html?pid=${d[j]["product_id"]}">立即抢购</a>
                                </p>
                            </div>                           
                           `;
                }

                html += "</div>"

            }

            $("#main .category").append(html);

        }
    }).then(()=>{
        //category切换
        tabChange($("#main .category .choose"),$("#main .category .options"),"mouseover");
    })
    //暑期大促
    $.ajax({
        url: "data/getData.php?len=8",
        success(data){
            dataInit(data,4,$("#main .sales .sales_ad"));
        }
    }).then(()=>{
        //暑期大促
        tabChange($("#main .sales_list"),$("#main .sales .options"),"mouseover");
    })
    $.ajax({
        url: "data/getDifData.php",
        success(data){
            dataInit(data['abroad'],8,$("#main .abroad"),true);
            dataInit(data['china'],8,$("#main .china"),true);
            dataInit(data['hotel'],8,$("#main .hotel"),true);
            dataInit(data['abroad'],8,$("#main .near"),true);
            dataInit(data['china'],8,$("#main .ticket"),true);
        }
    }).then(()=>{
        
        tabChange($("#main .abroad .section_list"),$("#main .abroad .options"),"mouseover");
        tabChange($("#main .china .section_list"),$("#main .china .options"),"mouseover");
        tabChange($("#main .hotel .section_list"),$("#main .hotel .options"),"mouseover");
        tabChange($("#main .near .section_list"),$("#main .near .options"),"mouseover");
        tabChange($("#main .ticket .section_list"),$("#main .ticket .options"),"mouseover");
        //option鼠标移入文本颜色改变
        $("#main .options .option").hover(function(){
            $(this).children(".option_title").css("color","#f36");
        },function(){
            $(this).children(".option_title").css("color","black");
        });
        $("#main .options .option").click(function(){
            location.href = $(this).attr("data-href")
        })
    })

})();