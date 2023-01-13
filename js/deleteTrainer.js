import axios from 'axios';

// Ove dvije funkcije su ovdje samo iz razloga da se lista sa trenerima automatski ažurira bez refrešovanja
//================================================================================================
// Funkcija za prikaz trenutnih trenera
function showTrainers(responseData) {
    let text = "";
    for (let i = 0; i < responseData.length ;i++) {
        text += "<li>" + responseData[i].ime + " " + responseData[i].prezime + "</li>";
    }
    document.getElementById("treneriLista").innerHTML = text;
}

// Funkcija se koristi za dobijanje liste trenutnih trenera iz baze podataka
const gatherTrainers = async () => {
    axios.post(
        "http://localhost/fenixBasket/showTrainers.php",
        JSON.stringify({
            reason: 'reason'
        })
    )
    .then((response) => {
        showTrainers(response.data);
    })
    .catch((err) => {
        console.log(err);
    })
};
//================================================================================================

// Async function used for sending form data to the API
const authenticate = async (ime, prezime) => {
    axios.post(
        "http://localhost/fenixBasket/deleteTrener.php",
        JSON.stringify({
            ime: ime,
            prezime: prezime
        })
    )
    .then((response) => {
        if(response.data.flag == "success")
            alert("Uspješno izbrisan trener!");
        else
            alert("Neobrađena greška!");
    })
    .catch((err) => {
        console.log(err);
    })
};

function submitData()  {
    let ime = document.getElementById("imeDelete").value;
    let prezime = document.getElementById("prezimeDelete").value;
    authenticate(ime, prezime)
        .then(() => {
            setTimeout(function() {
                gatherTrainers();
            }, 500);
        })
        .catch((err) => console.log(err));
}


document.getElementById("deleteTrainerButton").addEventListener("click", submitData, false);