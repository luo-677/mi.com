import '../js/library/jquery.js';
// import '../js/library/cookie';

$('.login_btn_box').on('click', function() {
    // console.log($('#username').val());
    // console.log($('#password').val());
    $.ajax({
        type: "get",
        url: `../../interface/login.php?username=${$('#username').val()}&password=${$('#password').val()}`,
        dataType: "text",
        success: function(response) {
            if (response === "1") {
                alert("登陆成功");
                // document.cookie = `username=${$('#username').val()}`;
                // document.cookie = `password=${$('#password').val()}`;
                cookie.set("password", $('#password').val());
            }
        }
    });
})