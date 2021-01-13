import './library/jquery.js';

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
                <a href="../../interface/getItem.php?id=${elm.pid}">
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
                <a href="../html/index.html?id=${elm.pid}">
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
    }
});