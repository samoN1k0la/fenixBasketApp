<?php
    header("Access-Control-Allow-Origin: *");

    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $my_db = "fenixBasketLoginTest";
    $conn = new mysqli($servername, $username, $password, $my_db);

    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);

    $reason = $obj['reason'];
    if($reason == 'reason') {
        $query_output = mysqli_query($conn, "SELECT * FROM `treneri`;");

        $arr = array();
        while($r = mysqli_fetch_assoc($query_output)) {
            $arr[] = $r;
        }

        echo json_encode($arr);
    }

    

    mysqli_close($conn);
?>