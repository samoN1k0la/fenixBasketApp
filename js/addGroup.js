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


// Async function used for sending form data to the API
const authenticate = async (nazivGrupe, termini, permisije) => {
    axios.post(
        "http://localhost/fenixBasket/addGroup.php",
        JSON.stringify({
            nazivGrupe: nazivGrupe,
            termini: termini,
            permisije: permisije
        })
    )
    .then((response) => {
        if(response.data.flag == "success")
            alert("Uspješno kreirana grupa!");
        else
            alert("Neobrađena greška!");
    })
    .catch((err) => {
        console.log(err);
    })
};

function submitData()  {
    let nazivGrupe = document.getElementById("groupName").value;
    let termini = "";
    const nodeList = document.querySelectorAll(".grupaTermin");
    for (let i = 0; i < nodeList.length; i++) {
        if(nodeList[i].checked == true) {
            termini += nodeList[i].id;
            termini += ",";
        }
    }
    let tempZaPermisije = document.getElementById("dostupniTreneri");
    let permisije = tempZaPermisije.options[tempZaPermisije.selectedIndex].text;
    authenticate(nazivGrupe, termini, permisije)
        .then(() => {
            setTimeout(function() {
                gatherGroups();
            }, 1000);
        })
        .catch((error) => console.log(error));
}


document.getElementById("addGroupButton").addEventListener("click", submitData, false);