import '../js/library/jquery.js';
import { cookie } from '../js/library/cookie.js';

$('.login_btn_box').on('click', function() {
    $.ajax({
        type: "get",
        url: `../../interface/login.php?username=${$('#username').val()}&password=${$('#password').val()}`,
        dataType: "text",
        success: function(response) {
            if (response === "1") {
                alert("登陆成功");
                location.href = "../html/index.html";
                cookie.set("username", $('#username').val());
                cookie.set("status", "true");
            }
        }
    });
})