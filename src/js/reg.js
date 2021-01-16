import "../js/library/jquery.js";

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 创建一个验证码 随机6位 由 大小写字母 和数字 随机组成
function getCode() {
    var code = '';
    for (var i = 0; i < 6; i++) {
        var type = random(1, 3);
        switch (type) {
            case 1:
                code += String.fromCharCode(random(48, 57));
                break;
            case 2:
                code += String.fromCharCode(random(65, 90));
                break;
            case 3:
                code += String.fromCharCode(random(97, 122));
                break;
        }
    }
    return code;
}
$(".reglogo").on("click", function() {
    location.href = "../html/index.html";
})
$(".reg_btn").on("click", function() {
    let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    let username = $("#phoneNumber").val();
    if (reg.test(username)) {
        let code = getCode();
        $(".regbox").remove();
        $(".reg_footer").remove();
        let tmp1 = `
        <div class="regbox">
        <p>请输入验证码</p>
        <p class="code">111111</p>
        <input type="text" class="code_user">
        <p class="resetcode">看不清验证码？</p>
        <div class="next">下一步</div>
        <div class="back">返回</div>
        </div>`;
        $(".box_box").append(tmp1);
        $(".code").html(code);
        $(".next").on("click", function() {
            if ($(".code_user").val() == code) {
                let tmp2 = `
                <div class="regbox">
                <p>请设置您的密码</p>
                <input type="text" class="password" placeholder="请输入密码">
                <input type="text" class="password_again" placeholder="请输入确认密码">
                <p class="words">密码长度8~16位，数字，字母，字符至少包含两种</p>
                <div class="submit">提交</div>
                </div>`;
                $(".regbox").remove();
                $(".box_box").append(tmp2);
                let reg2 = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,20}$/;
                $(".password").on("blur", function() {
                    if (reg2.test($(".password").val())) {
                        $(".submit").on("click", function() {
                            if ($(".password").val() == $(".password_again").val()) {
                                let password = $(".password").val();
                                $.ajax({
                                    type: "post",
                                    url: "../../interface/reg.php",
                                    data: `username=${username}&password=${password}`,
                                    dataType: "text",
                                    success: function(response) {
                                        if (response == 1) {
                                            alert("注册成功");
                                            location.href = "../html/login.html"
                                        } else if (response == 0) {
                                            alert("用户已存在");
                                            location.href = "../html/reg.html"
                                        }
                                    }
                                });
                            }
                        })
                    } else {
                        alert("密码不符合要求");
                        $(".password").val("");
                    }
                })
            } else {
                alert("验证码错误");
                $(".code_user").val("");
            }
        });
    } else {
        alert("手机号输入错误，请重新输入");
        $("#phoneNumber").val("");
    }


    $(".resetcode").on("click", function() {
        code = getCode();
        $(".code").html(code);
    });
})