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
const authenticate = async (ime, prezime, password, datumRodj) => {
    axios.post(
        "http://localhost/fenixBasket/addNewTrener.php",
        JSON.stringify({
            ime: ime,
            prezime: prezime,
            password: password,
            datumRodj: datumRodj
        })
    )
    .then((response) => {
        if(response.data.flag == "success")
            alert("Uspješno dodat novi trener!");
        else
            alert("Neobrađena greška!");
    })
    .catch((err) => {
        console.log(err);
    })
};

function submitData()  {
    let ime = document.getElementById("ime").value;
    let prezime = document.getElementById("prezime").value;
    let password = document.getElementById("passwordTrener").value;
    let datumRodj = document.getElementById("datumRodj").value;
    authenticate(ime, prezime, password, datumRodj)
        .then(() => {
            setTimeout(function() {
                gatherTrainers();
            }, 500);
        })
        .catch((err) => console.log(err));
}


document.getElementById("createTrainerButton").addEventListener("click", submitData, false);