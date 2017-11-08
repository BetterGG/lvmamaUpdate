function loadViewSpot(){
    $.ajax({
        type:"GET",
        url:"data/floor.php",
        success:function(data) {
            console.log(data)
            var prohtml="";
            for(var pro of data.promotionsContent){
                prohtml+=`<li>
                            <a href="viewSpot-details.html?pid=${pro['product_id']}" class="pro_list_img">
                               <img width="285" height="190" src="${pro.viewSpot_pic}" alt="">
                              </a>
                              <a href="viewSpot-details.html?pid=${pro['product_id']}" class="pro_list_tit">
                                <em class="pro_list_tag">
                                    跟团游
                                    <span class="pro_tag_line">|</span>
                                </em>
                                ${pro.viewSpot_details}
                            </a>
                            <p class="pro_price">
                                <span class="price">
                                    <fn><i>¥</i>${pro.viewSpot_price}</fn>起
                                </span>
                            </p>
                        </li>`;
            }
            $(".promotions-content .pro_list").html(prohtml);
            var hothtml="";
            for(var hot of data.hotSellContent){
                hothtml+=`<li>
                            <a href="viewSpot-details.html?pid=${hot['product_id']}" class="pro_list_img">
                               <img width="285" height="190" src="${hot.viewSpot_pic}" alt="">
                              </a>
                              <a href="viewSpot-details.html?pid=${hot['product_id']}" class="pro_list_tit">
                                <em class="pro_list_tag">
                                    跟团游
                                    <span class="pro_tag_line">|</span>
                                </em>
                                ${hot.viewSpot_details}
                            </a>
                            <p class="pro_price">
                                <span class="price">
                                    <fn><i>¥</i>${hot.viewSpot_price}</fn>起
                                </span>
                            </p>
                        </li>`;
            }
            $(".hotsell .pro_list").html(hothtml);
            var grouphtml="";
            for(var group of data.channelGroup){
                grouphtml+=`<li>
                            <a href="viewSpot-details.html?pid=${group['product_id']}" class="pro_list_img">
                                <img src="${group.viewSpot_pic}" alt="" width="285" height="190">
                            </a>
                            <p class="pro_list_info">
                                <span class="price fr"><fn><i>¥</i>${group.viewSpot_price}</fn>起</span>
                                <a href="viewSpot-details.html?pid=${group['product_id']}" class="pro_list_tit" title="${group.viewSpot_details}">${group.viewSpot_details}</a>
                            </p>
                        </li>`
            }
            $(".channelGroup .pro_list").html(grouphtml);
            var freehtml="";
            for(var free of data.channelFree){
                freehtml+=`<li>
                            <a href="viewSpot-details.html?pid=${free['product_id']}" class="pro_list_img">
                                <img src="${free.viewSpot_pic}" alt="" width="285" height="190">
                            </a>
                            <p class="pro_list_info">
                                <span class="price fr"><fn><i>¥</i>${free.viewSpot_price}</fn>起</span>
                                <a href="viewSpot-details.html?pid=${free['product_id']}" class="pro_list_tit" title="${free.viewSpot_details}">${free.viewSpot_details}</a>
                            </p>
                        </li>`
            }
            $(".channelFree .pro_list").html(freehtml);
        },
        error:function () {
            console.log("您的网络出错，请检查");
        }
    });
}
loadViewSpot();