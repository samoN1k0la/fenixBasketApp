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
    $datumRodj = $obj['datumRodj'];
    $poslednjePlacanje = $obj['poslednjePlacanje'];
    $slika = $obj['slika'];
    $grupa = $obj['grupa'];

    $query1 = "INSERT INTO `clanovi` (`id`, `ime`, `prezime`, `datum_Rodj`, `poslednjePlacanje`, `slika`) VALUES (NULL, '{$ime}', '{$prezime}', '{$datumRodj}', '{$poslednjePlacanje}', '{$slika}')";
    $query_output = mysqli_query($conn, $query1);
    $query2 = "INSERT INTO `{$grupa}` (`id`, `ime`, `prezime`) VALUES (NULL, '{$ime}', '{$prezime}')";
    $query_output = mysqli_query($conn, $query2);
    $arr = array("flag"=>"success");
    echo json_encode($arr);

    mysqli_close($conn);
?>