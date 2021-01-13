<?php
    include('./library/conn.php');

    $id = $_REQUEST['id'];

    $sql = "select * from products where pid=$id";

    $res = $mysqli->query($sql);

    $mysqli->close();

    $row = $res->fetch_assoc();

    $json = json_encode($row);

    echo $json;

?>