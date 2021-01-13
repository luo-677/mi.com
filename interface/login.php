<?php
    // 1. 连接数据库
    // 2. 获得表单发送的数据
    // 3. 通过用户名和密码查询数据库的用户表
    // 4. 如果有查询结果 说明登陆成功
    //    如果没有查询结果 则登陆失败

    include('./library/conn.php');

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    $sql = "select * from users where username='$username' and password='$password'";

    $result = $mysqli->query($sql);

    // while($row = $result->fetch_assoc()){
    //     var_dump($row);
    // }
    $mysqli->close();

    if($result->num_rows>0){
        echo 1;
    }else{
        echo 0;
    }
?>