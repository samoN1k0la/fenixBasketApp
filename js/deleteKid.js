import axios from 'axios';

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

const sendDeletionRequest = async (ime, prezime, datum_Rodj) => {
    axios.post(
        "http://localhost/fenixBasket/deleteKid.php",
        JSON.stringify({
            ime: ime,
            prezime: prezime,
            datum_Rodj: datum_Rodj
        })
    )
    .then((response) => {
        if(response.data.flag == "success")
            alert("Uspješno izbrisan član!");
        else
            alert("Neobrađena greška!");
    })
    .catch((err) => {
        console.log(err);
    })
};


const deletionActionHandler = (buttonID) => {
    const buttonIDsplitted = buttonID.split("_");
    let ime = buttonIDsplitted[0];
    let prezime = buttonIDsplitted[1];
    let datum_Rodj = buttonIDsplitted[2];

    sendDeletionRequest(ime, prezime, datum_Rodj)
        .then(() => {
            setTimeout(function() {
                gatherGroups();
                gatherKids();
            }, 1000);
        })
        .catch((error) => console.log(error));
};

function listEventFire() {
    const deleteButtons = document.querySelectorAll("#sviClanovi button");
    for(let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function() {
            deletionActionHandler(deleteButtons[i].id);
        }, false);
    }
}

var sviClanovi_Lista = document.getElementById("sviClanovi");
sviClanovi_Lista.addEventListener('DOMSubtreeModified', listEventFire);
