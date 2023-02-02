import axios from 'axios';

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

// Funkcija se koristi za sakrivanje LOGIN forme
document.getElementById("container").style.display = 'none';
const hideForm = async () => {
    document.getElementById("login-container").style.display = 'none';
    document.getElementById("container").style.display = 'block';
};

// Handler asinhrone funkcije za prikaz dashboard-a na adminPage.html
function showContent() {
    hideForm()
        .then(() => {
            setTimeout(function() {
                gatherTrainers();
            }, 500);
        })
        .catch((error) => console.log(error));
}

// Async function used for sending form data to the API
const authenticate = async (password) => {
    axios.post(
        "http://localhost/fenixBasket/authAdmin.php",
        JSON.stringify({
            password: password
        })
    )
    .then((response) => {
        if(response.data.result == "nalog_ne_postoji")
            alert("Netačna šifra!");
        else {
            showContent();
        }
    })
    .catch((err) => {
        console.log(err);
    })
};

function submitData()  {
    let password = document.getElementById("password").value;
    authenticate(password);
}


document.getElementById("loginButton").addEventListener("click", submitData, false);