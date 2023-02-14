import axios from 'axios';

// Async function used for sending form data to the API
const authenticate = async (ime, prezime, datumRodj, grupa) => {
    axios.post(
        "http://localhost/fenixBasket/addKid.php",
        JSON.stringify({
            ime: ime,
            prezime: prezime,
            datumRodj: datumRodj,
            poslednjePlacanje: "2.13.2023.",
            slika: "https://i.imgur.com/ibm1pI4.jpeg",
            grupa: grupa
        })
    )
    .then((response) => {
        if(response.data.flag == "success")
            alert("Uspješno dodat novi član!");
        else
            alert("Neobrađena greška!");
    })
    .catch((err) => {
        console.log(err);
    })
};

function submitData()  {
    let ime = document.getElementById("imeClan").value;
    let prezime = document.getElementById("prezimeClan").value;
    let datumRodj = document.getElementById("datumRodjClan").value;
    let tempZaGrupe = document.getElementById("dostupneGrupe");
    let grupa = tempZaGrupe.options[tempZaGrupe.selectedIndex].text;
    authenticate(ime, prezime, datumRodj, grupa);
}


document.getElementById("addKidButton").addEventListener("click", submitData, false);