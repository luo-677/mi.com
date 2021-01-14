import '../js/library/jquery.js';
import { cookie } from '../js/library/cookie.js';

if (cookie.get("status") === "true") {
    let username = cookie.get("username");
    let tmp1 = `
    <div class="customer">
        <a href="javascript:;">
            <span>${username}</span><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiajiantou1"></use>
            </svg>
        </a>
        <span>|</span>
        <a href="javascript:;">我的订单</a>
    </div>`;
    $(".customer").remove();
    $(".alarm").remove();
    $(".head_bot>.content").append(tmp1);

    // 获取cookie中的商品信息
    let shop = JSON.parse(cookie.get("shop"));
    if (shop.length != 0) {
        let tmp = "";
        let money = 0;
        shop.forEach(function(elm, i) {
            let tmp_product = `
            <div class="sp_main_title sp_main_product clear sp_main_title${i}">
                <div>
                    <span class="check_box" data-i="${i}"><svg class="icon single_choose" aria-hidden="true" data-i="${i}">
                        <use xlink:href="#icon-duigou"></use>
                    </svg></span>
                </div>
                <div>
                    <a href="javascript:;">
                        <img src=${elm.img} alt="">
                    </a>
                </div>
                <div>
                    ${elm.name}&nbsp;${elm.version}&nbsp;${elm.color}
                </div>
                <div><span class="single single${i}">${elm.price}</span>元</div>
                <div>
                    <div>
                        <span class="minus"><svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jianhaocu"></use>
                        </svg></span><input type="text" value="${elm.num}" data-i="${i}"><span class="plus"><svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-ziyuan"></use>
                        </svg></span>
                    </div>
                </div>
                <div><span class="single_sum single_sum${i}">${parseInt(elm.price)*parseInt(elm.num)}</span>元</div>
                <div>
                    <a href="javascript:;" class="delete_btn" data-i="${i}"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-chahao"></use>
                    </svg></a>
                </div>
            </div>`
            tmp += tmp_product;
            money += parseInt(elm.price) * parseInt(elm.num);
        });
        // console.log(tmp);

        let tmp2 = `
        <div class="sp_main_title clear">
            <div>
                <span><svg class="icon choose_sum" aria-hidden="true">
                    <use xlink:href="#icon-duigou"></use>
                </svg></span>全选
            </div>
            <div></div>
            <div>商品名称</div>
            <div>单价</div>
            <div>数量</div>
            <div>小计</div>
            <div>操作</div>
        </div>
            ${tmp}
        <div class="car_sum clear">
            <a href="javascript:;">继续购物</a><span>|</span><span>共&nbsp;<i>${shop.length}</i>&nbsp;件商品，已选择&nbsp;<i class="choose">${shop.length}</i>&nbsp;件&nbsp;</span>
            <span class="car_sum_right">
                <span>合计：<i class="sum_price">${money}</i>元</span><a href="javascript:;" class="sum_btn">去结算</a>
            </span>
        </div>`;
        $(".sp_main>.content").append(tmp2);
        // 选择按钮
        let count = shop.length;
        $(".check_box").on("click", function() {
            if ($(this).children("svg").hasClass("svg_hide")) {
                $(this).children("svg").removeClass("svg_hide");
                let index = $(this).attr("data-i");
                let class_name2 = "single_sum" + index;
                money += parseInt($(`.${class_name2}`).html());
                $(".sum_price").html(money);
                count++;
                $(".choose").html(count);
            } else {
                $(this).children("svg").addClass("svg_hide");
                let index = $(this).attr("data-i");
                let class_name2 = "single_sum" + index;
                money -= parseInt($(`.${class_name2}`).html());
                $(".sum_price").html(money);
                count--;
                $(".choose").html(count);
            }
            if (count != shop.length) {
                $(".choose_sum").addClass("svg_hide");
            } else {
                $(".choose_sum").removeClass("svg_hide");
            }
        })
        $(".choose_sum").on("click", function() {
                if ($(this).hasClass("svg_hide")) {
                    $(this).removeClass("svg_hide");
                    $(".sp_main_product .single_choose").each(function(i, elm) {
                        if ($(elm).hasClass("svg_hide")) {
                            $(elm).removeClass("svg_hide");
                            let index = parseInt($(elm).attr("data-i"));
                            let class_name2 = "single_sum" + index;
                            money += parseInt($(`.${class_name2}`).html());
                        }
                        console.log(1);
                    })
                    count = 3;
                    $(".sum_price").html(money);
                    $(".choose").html(count);
                } else {
                    $(this).addClass("svg_hide");
                    console.log(2);
                    $(".sp_main_product .single_choose").each(function(i, elm) {
                        $(elm).addClass("svg_hide");
                        console.log(2);
                    })
                    money = 0;
                    count = 0;
                    $(".sum_price").html(money);
                    $(".choose").html(count);
                }
            })
            // 计数减少，同时修改cookie中的记录
        $(".minus").on("click", function() {
                if (parseInt($(this).next().val()) > 1) {
                    let num = parseInt($(this).next().val()) - 1;

                    $(this).next().val(num);
                    let index = parseInt($(this).next().attr("data-i"));
                    let class_name1 = "single" + index;
                    let class_name2 = "single_sum" + index;
                    let single = $(`.${class_name1}`).html();
                    let single_sum = parseInt(single) * parseInt(num);
                    $(`.${class_name2}`).html(single_sum);
                    shop[index].num = num;
                    cookie.set("shop", JSON.stringify(shop));
                    money -= parseInt(single);
                    $(".sum_price").html(money);
                } else {
                    alert("商品的数量不能小于1");
                }
            })
            // 计数增加，同时修改cookie中的记录
        $(".plus").on("click", function() {
                if (parseInt($(this).prev().val()) < 99) {
                    let num = parseInt($(this).prev().val()) + 1;
                    $(this).prev().val(num);
                    let index = parseInt($(this).prev().attr("data-i"));
                    let class_name1 = "single" + index;
                    let class_name2 = "single_sum" + index;
                    let single = $(`.${class_name1}`).html();
                    let single_sum = parseInt(single) * parseInt(num);
                    $(`.${class_name2}`).html(single_sum);
                    shop[index].num = num;
                    cookie.set("shop", JSON.stringify(shop));
                    money += parseInt(single);
                    $(".sum_price").html(money);
                } else {
                    alert("商品的数量不能大于99");
                }
            })
            // 删除元素的同时删除cookie中的记录
        let num = shop.length + 1;
        let count_num = 0;
        $(".delete_btn").on("click", function() {
            let index = parseInt($(this).attr("data-i"));
            console.log(index);
            // num = index;
            // 将总价减去单个条目的总价
            let class_name2 = "single_sum" + index;
            money -= parseInt($(`.${class_name2}`).html());
            $(".sum_price").html(money);
            count--;
            $(".choose").html(count);
            let class_name3 = "sp_main_title" + index;
            $(`.${class_name3}`).remove();
            if (index > num) {
                index = index - count_num;
            }
            shop.splice(index, 1);
            console.log(shop);
            // index删除之后会移动位置
            cookie.set("shop", JSON.stringify(shop));
            num = index;
            count_num++;
            if (shop.length == 0) {
                let tmp = `
                <div class="empty_shopping">
                    <h2>您的购物车还是空的！</h2>
                    <div class="empty_btn">
                        <a href="javascript:;">马上去购物</a>
                    </div>
                </div>`;
                $(".sp_main_title").remove();
                $(".car_sum").remove();
                $(".sp_main>.content").append(tmp);
            }
        })
    } else {
        let tmp = `
        <div class="empty_shopping">
            <h2>您的购物车还是空的！</h2>
            <div class="empty_btn">
                <a href="javascript:;">马上去购物</a>
            </div>
        </div>`;
        $(".sp_main>.content").append(tmp);
    }
} else {
    let tmp = `
    <div class="empty_shopping">
        <h2>您的购物车还是空的！</h2>
        <p>登录后将显示您之前加入的商品</p>
        <div class="empty_btn">
            <a href="../html/login.html">立即登录</a>
            <a href="javascript:;">马上去购物</a>
        </div>
    </div>`;
    $(".sp_main>.content").append(tmp);
}