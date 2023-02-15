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


const searchData = () => {
    let kidsListContent = document.getElementById("sviClanovi").innerHTML;
    let inputfieldData = document.getElementById("searchInputField").value;
    
    const kidsList_elements = kidsListContent.split("</button>");
    for(let i = 0; i < kidsList_elements.length; i++) {
        kidsList_elements[i] += "</button>";
    }

    for(let i = 0; i < kidsList_elements.length - 1; i++) {
        let sameStrings = true;
        for(let j = 0; j < inputfieldData.length; j++) {
            if(inputfieldData[j] != kidsList_elements[i][j+4]) {
                sameStrings = false;
                break;
            }
        }

        if(!sameStrings) kidsList_elements[i] = "";
    }

    document.getElementById("sviClanovi").innerHTML = "";
    for(let i = 0; i < kidsList_elements.length - 1; i++) {
        document.getElementById("sviClanovi").innerHTML += kidsList_elements[i];
    }
};

document.getElementById("searchButton").addEventListener("click", function() {
    gatherKids()
        .then(() => {
            setTimeout(function() {
                searchData();
            }, 500);
        })
        .catch((error) => console.log(error));
}, false);