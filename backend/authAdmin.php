<?php
    header("Access-Control-Allow-Origin: *");

    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $my_db = "fenixBasketLoginTest";
    $conn = new mysqli($servername, $username, $password, $my_db);

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $password = $obj['password'];

    $query_output = mysqli_query($conn, "SELECT * FROM `direktor` WHERE `password` = '{$password}'");
    $count = mysqli_num_rows($query_output);

    if($count == 1) {
        $arr = array('result'=>'nalog_postoji');
        echo json_encode($arr);
    } elseif($count == 0) {
        $arr = array('result'=>'nalog_ne_postoji');
        echo json_encode($arr);
    } else {
        $arr = array('result'=>'fail');
        echo json_encode($arr);
    }

    mysqli_close($conn);
?>