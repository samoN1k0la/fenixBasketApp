import axios from 'axios';

// =========================================[ PRIKAZ TRENERA ]==========================//

// Funkcija za prikaz trenutnih trenera
function showTrainers(responseData) {
    let text = "";
    for (let i = 0; i < responseData.length; i++) {
        text += "<li>" + responseData[i].ime + " " + responseData[i].prezime + "</li>";
    }
    document.getElementById("treneriLista").innerHTML = text;

    let selectElement = "";
    for(let i = 0; i < responseData.length; i++) {
        selectElement += '<option value=' + responseData[i].ime + '>' + responseData[i].ime + " " + responseData[i].prezime + '</option>';
    }
    document.getElementById("dostupniTreneri").innerHTML = selectElement;
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
// ==========================================================================================//


// =========================================[ PRIKAZ GRUPA ]==========================//

const gatherKidsForGroup = async (groupName) => {
    let text = "";
    axios.post(
        "http://localhost/fenixBasket/showGroupKids.php",
        JSON.stringify({
            reason: 'gatherKids',
            nazivGrupe: groupName
        })
    )
    .then((response) => {
        text += "<li>" + groupName + ":</li><ul>";
        for(let j = 0; j < response.data.length; j++) {
            text += "<li>" + response.data[j].ime + " " + response.data[j].prezime + "</li>";
        }
        text += "</ul><br>";
        document.getElementById("grupeLista").innerHTML += text;
    })
    .catch((error) => {
        console.log(error);
    })
};

// Funkcija za prikaz kreiranih grupa
function showGroups(responseData) {
    document.getElementById("grupeLista").innerHTML = "";
    for (let i = 0; i < responseData.length; i++) {
        let text = gatherKidsForGroup(responseData[i].grupa);
    }
    
    let selectElement = "";
    for(let i = 0; i < responseData.length; i++) {
        selectElement += '<option value=' + responseData[i].grupa + '>' + responseData[i].grupa + '</option>';
    }
    document.getElementById("dostupneGrupe").innerHTML = selectElement;
}

// Funkcija se koristi za dobijanje liste kreiranih grupa iz baze podataka
const gatherGroups = async () => {
    axios.post(
        "http://localhost/fenixBasket/showGroups.php",
        JSON.stringify({
            reason: 'reason'
        })
    )
    .then((response) => {
        showGroups(response.data);
    })
    .catch((err) => {
        console.log(err);
    })
};
// ==========================================================================================//

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


// Funkcija se koristi za sakrivanje LOGIN forme
document.getElementById("container").style.display = 'none';
const hideForm = async () => {
    document.getElementById("login-container").style.display = 'none';
    document.getElementById("container").style.display = 'block';

    document.getElementById("treneri-container").style.display = 'none';
    document.getElementById("grupe-container").style.display = 'none';
    document.getElementById("clanovi-container").style.display = 'none';
};

document.getElementById("show-trenerContainer").addEventListener("click", function() {
    document.getElementById("treneri-container").style.display = 'block';
    document.getElementById("dashboard-panel").style.display = 'none';
    document.getElementById("grupe-container").style.display = 'none';
    document.getElementById("clanovi-container").style.display = 'none';
}, false);

document.getElementById("show-grupeContainer").addEventListener("click", function() {
    document.getElementById("treneri-container").style.display = 'none';
    document.getElementById("dashboard-panel").style.display = 'none';
    document.getElementById("grupe-container").style.display = 'block';
    document.getElementById("clanovi-container").style.display = 'none';
}, false);

document.getElementById("show-clanoviContainer").addEventListener("click", function() {
    document.getElementById("treneri-container").style.display = 'none';
    document.getElementById("dashboard-panel").style.display = 'none';
    document.getElementById("grupe-container").style.display = 'none';
    document.getElementById("clanovi-container").style.display = 'block';
}, false);

// Handler asinhrone funkcije za prikaz dashboard-a na adminPage.html
function showContent() {
    hideForm()
        .then(() => {
            setTimeout(function() {
                gatherTrainers();
                gatherGroups();
                gatherKids();
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