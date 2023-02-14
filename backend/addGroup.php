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
    $termini = $obj['termini'];
    $permisije = $obj['permisije'];

    $query1 = " CREATE TABLE `fenixbasketlogintest`.`{$nazivGrupe}` (`id` SERIAL NOT NULL , `ime` TEXT NOT NULL , `prezime` TEXT NOT NULL ) ENGINE = InnoDB; ";
    $query_output = mysqli_query($conn, $query1);
    $query2 = "INSERT INTO `termini` (`id`, `grupa`, `termin`, `permisije`) VALUES (NULL, '{$nazivGrupe}', '{$termini}', '{$permisije}')";
    $query_output2 = mysqli_query($conn, $query2);
    $arr = array("flag"=>"success");
    echo json_encode($arr);

    mysqli_close($conn);
?>