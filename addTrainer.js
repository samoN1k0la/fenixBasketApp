import axios from 'axios';

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
    authenticate(ime, prezime, password, datumRodj);
}


document.getElementById("createTrainerButton").addEventListener("click", submitData, false);