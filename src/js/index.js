import '../js/library/jquery.js';
import { cookie } from '../js/library/cookie.js';
// console.log(cookie.get("status"));
if (cookie.get("status") === "true") {
    let username = cookie.get("username");
    let tmp = `<div class="head_right">
    <a href="javascript:;" class="username_btn">${username}</a>&nbsp;<svg class="icon" aria-hidden="true"><use xlink:href="#icon-xiajiantou"></use></svg><span>|</span><a href="#">消息通知</a><span>|</span><a href="#">我的订单</a>
    <i href="#" class="shopping">购物车<span>(<em>0</em>)</span><div class="shopping_box"></div></i>
</div>`;
    console.log($(".head_right"));
    $(".head_right").remove();
    $(".head_top>.content").append(tmp);
}
$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(response) {
        let temptop = "";
        let top = response.slice(0, 4);
        // console.log(top);
        top.forEach((elm, i) => {
            let abst = JSON.parse(elm.abstract);
            let picture = JSON.parse(elm.pic_addr);
            let price = JSON.parse(elm.version);
            console.log(abst);
            console.log(elm);
            temptop += `<div>
                <a href="../html/detail.html?id=${elm.pid}" class="a_btn">
                    <div class="seckill_img">
                        <img class="lazy" data-original=${picture[0].src} alt="">
                    </div>
                    <h3>${elm.pname}</h3>
                    <p class="seckill_p">${abst[0].abstract}</p>
                    <div class="price">
                        <span>${price[0].price}元起</span>
                    </div>
                </a>
            </div>`
        })
        $(".miphone>.mpb_right_top").append(temptop);
        let tempbot = "";
        let bot = response.slice(4);
        bot.forEach((elm, i) => {
            let abst = JSON.parse(elm.abstract);
            let picture = JSON.parse(elm.pic_addr);
            let price = JSON.parse(elm.version);
            console.log(abst);
            console.log(elm);
            tempbot += `<div>
                <a href="../html/detail.html?id=${elm.pid}" class="a_btn">
                    <div class="seckill_img">
                        <img class="lazy" data-original=${picture[0].src} alt="">
                    </div>
                    <h3>${elm.pname}</h3>
                    <p class="seckill_p">${abst[0].abstract}</p>
                    <div class="price">
                        <span>${price[0].price}元起</span>
                    </div>
                </a>
            </div>`
        })
        $(".miphone>.mpb_right_bot").append(tempbot);
        $(".username_btn").on("click", function() {
            cookie.remove("username");
            cookie.remove("status");
            location.reload();
        })
    }
});
$(".shopping").on("click", function() {
    location.href = "../html/shopping.html";
})