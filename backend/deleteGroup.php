<?php
    header("Access-Control-Allow-Origin: *");

    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $my_db = "fenixBasketLoginTest";
    $conn = new mysqli($servername, $username, $password, $my_db);

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $nazivGrupe = $obj['nazivGrupe'];

    $query1 = "DELETE FROM `termini` WHERE `termini`.`grupa`='{$nazivGrupe}';";
    $query_output = mysqli_query($conn, $query1);
    $query2 = "DROP TABLE `{$nazivGrupe}`;";
    $query_output1 = mysqli_query($conn, $query2);
    $arr = array("flag"=>"success");
    echo json_encode($arr);

    mysqli_close($conn);
?>