import axios from 'axios';

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
    authenticate(ime, prezime);
}


document.getElementById("deleteTrainerButton").addEventListener("click", submitData, false);