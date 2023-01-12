<?php
    header("Access-Control-Allow-Origin: *");

    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $my_db = "fenixBasketLoginTest";
    $conn = new mysqli($servername, $username, $password, $my_db);

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $ime = $obj['ime'];
    $prezime = $obj['prezime'];

    $query1 = "DELETE FROM `treneri` WHERE `treneri`.`ime`='{$ime}' AND `treneri`.`prezime`='{$prezime}';";
    $query_output = mysqli_query($conn, $query1);
    $arr = array("flag"=>"success");
    echo json_encode($arr);

    mysqli_close($conn);
?>