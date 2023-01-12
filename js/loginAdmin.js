import axios from 'axios';

document.getElementById("container").style.display = 'none';

function showContent() {
    document.getElementById("input-form").style.display = 'none';
    document.getElementById("container").style.display = 'block';
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