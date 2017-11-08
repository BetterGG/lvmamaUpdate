/*banner的轮播图*/

function unorder(arr){
  var arr1 = arr.slice();
  arr1.sort(()=>{
    return Math.random()<0.5?1:-1;
  });
  return arr1;
}

(()=>{
  var LIWIDTH = parseFloat($("#big-img").css("width"));
  var $imgs = $("[data-load=bannerImgs]"),
      $inds = $("[data-load=bannerInds]"),
      num=-1,LIWIDTH=912,TRANS=300,INTERVAL=2000,timer=null;
  $.ajax({
    type: "GET",
    url: "data/outland/banners.php",
    success: function (pics) {
      //轮播图 图片
      console.log(pics)
      var banners=[...pics];
      banners.push(banners[0]);
      var imgs = "";
      for (var pic of banners) {
        imgs +=
          `<li>
            <a href="script:;">
              <img src="${pic.banner_pic}">
            </a>
          </li>`
      }
      $imgs.html(imgs);
      //轮播图 inds 按钮
      var  inds =`<li></li>`;
      $inds.html(inds.repeat(pics.length));
      $inds.children().first().addClass("hover");
    },
    error: function (){
      alert("网络故障，请检查");
    }
  })
    /*轮播效果*/
    .then(()=>{
      var timer = null;
      function moveOnce(n) {
        n++;
        n = n%6;
        num = n;
        var left=LIWIDTH*n;
        $imgs.css("left",-left);
        $inds.children(".hover").removeClass("hover");
        if(n==$imgs.children().size()-1){
          $inds.children().first().addClass("hover");
          setTimeout(()=>{
            $imgs.css("transition","");
            $imgs.css("left",0);
            num = n = 0;
            setTimeout(()=>{
              $imgs.css("transition","all ."+TRANS/100+"s linear")
            },300);
          },TRANS);
        }else{
          $inds.children().eq(n).addClass("hover");
        }
      }
      moveOnce(num)
      timer=setInterval(function(){
        moveOnce(num)
      },INTERVAL+TRANS);

      $imgs.parent().mouseover(()=>{
        clearInterval(timer);
        timer=null;
      });
      $imgs.parent().mouseout(function(){
        timer=setInterval(function(){
          moveOnce(num)
        },INTERVAL+TRANS);
      });
      for(let i=0;i<$inds.children().size();i++){
        $inds.children().eq(i).click(function(){
          n=i;
          $imgs[0].style.left=-n*LIWIDTH+"px";
          $inds.find(".hover").removeClass("hover");
          $inds.children().eq(i).addClass("hover");
        })
      }
      //单击 向左
      $("[data-move=left]").click(function(e){
        if(num>0){
          num-=2;
        }else{
          e.preventDefault();
          setTimeout(()=>{
              $imgs.css("transition","");
              $imgs.css("left",-LIWIDTH*($imgs.children().size()-1));
            setTimeout(()=>{
              $imgs.css("transition","all ."+TRANS/100+"s linear");
              $imgs.css("left",-LIWIDTH*($imgs.children().size()-2));

            },TRANS);
            console.log(-LIWIDTH*$imgs.children().size());
            num = n = $imgs.children().size()-1;
          },TRANS/30);
          num = $imgs.children().size()-3;
        }

        console.log(num)
        moveOnce(num);
      })
      //单击 向右
      $("[data-move=right]").click(function(e){
        moveOnce(num);
      })
    })
})();

/*搜索框*/
$("#search .search-types span").click(e=>{
  var tar = $(e.target);
  tar.addClass("active");
  tar.parent().siblings().children(":first-child").removeClass("active");
  tar.next().addClass("active");
  tar.parent().siblings().children().removeClass("active");
})


// tabs的显示和隐藏
$("#banner-tabs .dtdd dl").hover(function () {
    $dtdd=$(this);
    $dtdd.addClass("active");
    $dtdd.parent().next(".tabs-detail").show();
    // $dtdd.find("h2").addClass("active");
    $dtdd.children().children(":first-child").addClass("active")
  },function () {
    $dtdd=$(this);
    $dtdd.removeClass("active");
    $dtdd.parent().next(".tabs-detail").hide();
    $dtdd.find("h2").removeClass("active");
  }
);
$("#banner-tabs .tabs-detail").hover(function () {
    $tabs_detail=$(this);
    $tabs_detail.show();
    $tabs_detail.prev().children().addClass("active");
  },function () {
    $tabs_detail=$(this);
    $tabs_detail.hide();
    $tabs_detail.prev().children().removeClass("active");
  }
);

function showPics(data,count,dataLength,locationType){
  var html = "";
  // console.log(data);
  for( var j=0;j<count;j++ ) {
    // console.log( data[locationType] );
    da = unorder(data[locationType]);
    html += `<div class="tabs-pics ">`;
    for (var i = 0; i < dataLength; i++) {
      var d = da[i];
      html += `
          <div data-href="viewSpot-details.html?pid=${d['product_id']}">
            <a href="script:;">
              <img src="${d['viewSpot_pic']}" alt="img">
            </a>
            <span class="details">
              ${d['viewSpot_details']}
            </span>
            <span class="price">
              ￥${d['viewSpot_price']}
              <span>起</span>
            </span>
          </div>`
    }
    html += `</div>`;
  }
  return html;
}

(()=>{
  $.ajax({
    type:"GET",
    url:"data/outland/outland.php",
    success:function(data){
      var html = showPics(data,3,4,"Discount");
      // console.log(html);
      $("#act-tabs .tabs-box").html(html);
      var html = showPics(data,3,6,"Island");
      // console.log(html);
      $("#floors .picsBox-Island").html(html);
      var html = showPics(data,3,6,"Japan");
      $("#floors .picsBox-Japan").html(html);
      var html = showPics(data,3,6,"Africa");
      $("#floors .picsBox-Africa").html(html);
      var html = showPics(data,3,6,"European");
      $("#floors .picsBox-European").html(html);
      var html = showPics(data,3,6,"SoutheastAsia");
      $("#floors .picsBox-SoutheastAsia").html(html);
    },
    error:function () {
      alert("网络故障");
    }
  }).then(()=>{
    /*景点的选项卡切换--优惠促销*/
      $("#act-tabs .tabs-titles a").parent().parent().next().children().eq(0).nextAll().hide();
      $("#act-tabs .tabs-titles a").mouseover(e=>{
        e.preventDefault();
        $a=$(e.target);
        $a.addClass("active")
            .parent().siblings().children().removeClass("active");
        var i=$a.parent().index();
        $(".tabs-box").children().eq(i).show()
            .siblings().hide();
      });
      $("[data-href]").click(function(e){
        e.preventDefault();
        location.href=$(this).attr("data-href");
      })
    }).then(()=>{
    /*floors 选项卡切换*/
      $("#floors .floor .tabs-pics:first-child").siblings().hide();
      // $("#floors .subtitles a").parent().parent().parent().next().children().last().children().eq(0).nextAll().hide();
      $("#floors .subtitles a").mouseover(e=>{
        e.preventDefault();
        /*切换 小标题*/
        $aFloor=$(e.target);
        $aFloor.addClass("active")
            .parent().siblings().children().removeClass("active");
        /*切换 图片*/
        var i=$aFloor.parent().index();
        $aFloor.parent().parent().parent().next().children().last().children().eq(i).show()
            .siblings().hide();
      })
  })
})();


