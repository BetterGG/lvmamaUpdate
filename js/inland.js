/**
 * Created by WEB-UID-JAVA on 2017/9/27.
 */
//搜索标签切换
$(".srh_tab li").click(function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
})
//轮播导航栏切换
$(".b_nav_list").hover(function () {
    b_nav_list=$(this);
    b_nav_list.addClass("active");
    b_nav_list.children(".b_nav_tit").children().first().css("color","#e38")
    b_nav_list.children(".b_nav_main").show();
},function(){
    b_nav_list.removeClass("active");
    b_nav_list.children(".b_nav_tit").children().first().css("color","#333");
    b_nav_list.children(".b_nav_main").hide();
});
//轮播图效果
var ban_pic=$(".ban_pic"),
    ban_tab=$(".ban_tab"),
    ban_btn=$(".ban_btn"),
    n=0,
    trans=300,
    interval=3000,
    timer=null,
    LIWIDTH=913;
ban_pic.css("width",LIWIDTH*6);
ban_tab.children().first().addClass("active");
//移动一次的函数
function moveOnce() {
    n++;
    var left = -n * LIWIDTH;
    ban_pic.css("left", left);
    ban_tab.children().eq(n - 1).removeClass("active");
    if (n === ban_pic.children().size() - 1) {
        ban_tab.children().eq(0).addClass("active");
        setTimeout(()=> {
            ban_pic.css("transition", '');
            ban_pic.css("left", 0);
            n = 0;
            setTimeout(()=> {
                ban_pic.css("transition",
                    'all .' + trans / 100 + 's linear');
            }, 100);
        }, trans);
    } else {
        ban_tab.children().eq(n).addClass("active");
    }
}
    timer=setInterval(moveOnce,interval+trans);
    ban_pic.parent().hover(function () {
        clearInterval(timer);
        timer=null;
        ban_btn.show();
    },function () {
        ban_btn.hide();
        timer=setInterval(moveOnce,interval+trans);
    });
    for(let i=0;i<ban_tab.children().size();i++){
        ban_tab.children().eq(i).click(function () {
            n=i;
            ban_pic.css("left",-n*LIWIDTH);
            ban_tab.find(".active").removeClass("active")
            ban_tab.children().eq(n).addClass("active")
        });
    }
$(".btn_left").click(function (e) {
    e.preventDefault();
    if(n>0){
        n--;
        ban_pic.css("left",-n*LIWIDTH);
        ban_tab.children().eq(n+1).removeClass("active")
        ban_tab.children().eq(n).addClass("active")
    }else{
        //快速将第一张切到最后一张
        ban_pic.css("transition",'');
        n=ban_pic.children().size()-1;
        ban_pic.css("left",-n*LIWIDTH);

        setTimeout(()=>{
            ban_pic.css("transition",
                'all .'+trans/100+'s linear');
            n--;
            ban_pic.css("left",-n*LIWIDTH);
            ban_tab.children().eq(0).removeClass("active")
            ban_tab.children().eq(n).addClass("active")
        },100)
    }
})
$(".btn_right").click(function (e) {
    e.preventDefault();
    //图片可以正常移动,多走1张图
    n++;
    ban_pic.css("left",-n*LIWIDTH);
    if(n<ban_pic.children().size()-1){
        ban_tab.children().eq(n-1).removeClass("active")
        ban_tab.children().eq(n).addClass("active")
    }else{
        ban_tab.children().last().removeClass("active");
        ban_tab.children().first().addClass("active");
        setTimeout(()=>{
            ban_pic.css("transition",'');
            n=0;
            ban_pic.css("left",0);
            setTimeout(()=>{
                ban_pic.css("transition",
                    'all .'+trans/100+'s linear');
            },100)
        },trans)
    }
})
//优惠促销&爆款特卖切换
$(".sp_title span").click(function (e) {
    e.preventDefault();
    title=$(this);
    i=title.index();
    title.addClass("active");
    title.siblings().removeClass("active");
    title.parent().next().children().eq(i).show().siblings().hide();
})
//优惠促销子标签切换
$(".promotions-tab a").click(function () {
    tab=$(this);
    tab.addClass("active");
    tab.siblings().removeClass("active");
})
//热门目的地切换
$(".bigDestTab li").hover(function () {
    li_tab=$(this);
    index=li_tab.index();
    li_tab.addClass("active");
    li_tab.siblings().removeClass("active");
    li_tab.parent().parent().next().children().eq(index).show().siblings().hide();
})
//回到顶部
$(window).scroll(function () {
    if($(document).scrollTop()>=300)
        $("#goTopBtn").show();
    else
        $("#goTopBtn").hide();
});
$("#goTopBtn").click(function (e) {
    e.preventDefault();
    to(0,4);
})
