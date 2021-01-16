import { cookie } from '../js/library/cookie.js';

if (cookie.get("status") === "true") {
    let username = cookie.get("username");
    let tmp = `<div class="head_right">
    <a href="#">${username}</a>&nbsp;<svg class="icon" aria-hidden="true"><use xlink:href="#icon-xiajiantou"></use></svg><span>|</span><a href="#">消息通知</a><span>|</span><a href="#">我的订单</a>
    <i href="#" class="shopping">购物车<span>(<em>0</em>)</span><div class="shopping_box"></div></i>
</div>`;
    console.log($(".head_right"));
    $(".head_right").remove();
    $(".head_top>.content").append(tmp);
}
let tmp = location.search;

function addItem(name, price, version, color, img, num = 1) {
    let shop = cookie.get('shop'); // 获得cookie数据
    let product = {
        name,
        price,
        version,
        color,
        img,
        num
    };

    if (shop) { // 判断购物车是否有添加过数据
        shop = JSON.parse(shop); //将JSON字符串转回数组

        // 判断购物车中是否存在该商品
        if (shop.some(elm => elm.name == name && elm.version == version && elm.color == color)) {
            // 修改数量
            shop.forEach(el => {
                el.name == name && el.version == version && el.color == color ? el.num++ : null;
            });
        } else {
            shop.push(product);
        }

    } else {
        shop = []; // 初始没有数据 初始化一个空数组
        shop.push(product); // 将第一个商品添加进数组
    }


    cookie.set('shop', JSON.stringify(shop), 1);

}
$.ajax({
    type: "get",
    url: `../../interface/getItem.php${tmp}`,
    dataType: "json",
    success: function(response) {
        let pic = JSON.parse(response.pic_addr);
        let abstract = JSON.parse(response.abstract);
        let version = JSON.parse(response.version);
        let color = JSON.parse(response.color);
        $('.top_left>span').html(response.pname);
        $('.left_img>img').attr("src", pic[1].src);
        $('.pname').html(response.pname);
        $('.abstract_imp').html(abstract[1].abstract_imp);
        $('.abstract span:nth-of-type(2)').html(abstract[0].abstract);
        for (let i = 0; i < version.length; i++) {
            let li = document.createElement("li");
            $(li).attr("index", i);
            $(li).html(version[i].version);
            $(".list_version").append(li);
            // 增加点击事件，获取当前版本，更新下方描述及价格
            $(li).on("click", function() {
                $(".list_version li").removeClass("active");
                $(this).addClass("active");
                let index = parseInt($(this).attr("index"));
                $(".price_sum").html(version[index].price);
                $(".p_right>span").html(version[index].price);
                let v = $(this).html();
                $(".p_left span:nth-of-type(2)").html(`${v}`);
            });
        }
        for (let i = 0; i < color.length; i++) {
            let li = document.createElement("li");
            $(li).html(color[i].color);
            $(".color_list").append(li);
            // 增加点击事件，获取当前颜色，改变下方描述
            $(li).on("click", function() {
                $(".color_list li").removeClass("active");
                $(this).addClass("active");
                let color = $(this).html();
                $(".p_left span:nth-of-type(3)").html(`${color}`);
            })
        }
        $(".price_sum").html(version[0].price);
        $(".p_right>span").html(version[0].price);
        $(".p_left span:nth-of-type(1)").html(`${response.pname}`);
        $(".p_left span:nth-of-type(2)").html(`${version[0].version}`);
        $(".p_left span:nth-of-type(3)").html(`${color[0].color}`);
        $(".version_list li:nth-of-type(1)").addClass("active");
        $(".btn_box>.bnt").on("click", function() {
            addItem($(".p_left span:nth-of-type(1)").html(), $(".p_right>span").html(), $(".p_left span:nth-of-type(2)").html(), $(".p_left span:nth-of-type(3)").html(), $(".left_img>img").attr("src"));
            location.href = "../html/shopping.html";
        })
    }
});