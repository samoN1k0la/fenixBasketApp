import axios from 'axios';

// =========================================[ PRIKAZ SVIH ČLANOVA ]==========================//

// Funkcija za prikaz kreiranih grupa
function showAllKids(responseData) {
    let text = "";
    for (let i = 0; i < responseData.length; i++) {
        text += "<li>" + responseData[i].ime + " " + responseData[i].prezime + "</li>";

        // Dugme za brisanje člana
        text += "<button type='button' id=" + responseData[i].ime + "_" + responseData[i].prezime + "_" + responseData[i].datum_Rodj +">";
        text += "<i class='fa-solid fa-trash-can'></i>";
        text += "</button>";
    }
    document.getElementById("sviClanovi").innerHTML = text;
}

// Funkcija se koristi za dobijanje liste kreiranih grupa iz baze podataka
const gatherKids = async () => {
    axios.post(
        "http://localhost/fenixBasket/showKids.php",
        JSON.stringify({
            reason: 'reason'
        })
    )
    .then((response) => {
        showAllKids(response.data);
    })
    .catch((err) => {
        console.log(err);
    })
};
// ==========================================================================================//


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
    authenticate(ime, prezime, datumRodj, grupa)
        .then(() => {
            setTimeout(function() {
                gatherKids();
            }, 500);
        })
        .catch((error) => console.log(error));
}


document.getElementById("addKidButton").addEventListener("click", submitData, false);