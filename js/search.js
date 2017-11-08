//搜索框
    $(".search_box input")[0].oninput= function(){
        var $that = $(this);
        if($that.val()){
            $.ajax({
                url: "data/searchBox.php",
                data: "kw="+$(this).val(),
                success(data){
                    console.log(data)
                    var hLen = data["hotel"].length;
                    var vLen = data["viewSpot"].length;
                    var len = hLen+vLen;
                    var num = 0;
                    if( len>0 ){
                        var html = "";
                        for( var i=0;i<vLen;i++ ){
                            if(num<6){
                                var d = data['viewSpot'][i];
                                html += `<li><a href="viewSpot-details.html?pid=${d['product_id']}">${d['viewSpot_title'] }</a></li>`;
                                num++;
                            }
                        }
                        for( var i=0;i<hLen;i++ ){
                            if(num<6){
                                var d = data['hotel'][i];
                                html += `<li><a href="hotel-details.html?pid=${d['product_id']}">${d['hotel_title'] }</a></li>`;
                                num++;
                            }
                        }

                        console.log(html)
                        $(".search_result").html(html);

                        var reg = new RegExp("("+ $that.val()+")","ig");
                        var $a = $(".search_result a");
                        for( let i=0;i< $a.length;i++){

                            $a.eq(i).html( $a.eq(i).html().replace(reg,"<span style='color:red'>$1</span>") );
                        }

                        $(".search_result").css("display","block");
                    }
                }
            })
        }else{
            $(".search_result").css("display","none")
        }
    };
    $(".search_box .search").click(function(){
        location.href = "search-details.html?kw="+$(".search_box input").val();
    })