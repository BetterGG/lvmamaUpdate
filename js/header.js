/**
 * Created by WEB-UID-JAVA on 2017/10/7.
 */

$.ajax({
    url: "header.html",
    success(data){
        $("#header").html(data)
    }
}).then(()=>{
    //登录验证
        !function isLogin(){
            var info = [];
            var cookie = document.cookie.split("; ");
            for( var data of cookie ){
               var key = data.split("=")[0];
               var val = data.split("=")[1];
               info[key] = val;
            }

            if(info["uid"]){
                $(".login_reg").html("欢迎回来 " + `<a href='personer.html?uid=${info["uid"]}'>${info["uname"]}</a><a class="logout" href="login.html"> 注销</a>`);
                $(".logout").click(e=>{
                    e.preventDefault();
                    document.cookie = "uid=";
                    document.cookie = "uname=";
                    location.href =  $(e.target).attr("href");
                })
            }else{
                $(".login_reg").html(
                    `
                        <a href="login.html" class="login">请登录</a>
                        <a href="register.html" class="register">免费注册</a>
                    `);
            }
        }();
})
