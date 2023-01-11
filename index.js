import axios from 'axios';

// Async function used for sending form data to the API
const authenticate = async (username, password) => {
    axios.post(
        "http://localhost/fenixBasket/authentication.php",
        JSON.stringify({
            username: username,
            password: password
        })
    )
    .then((response) => {
        if(response.data.result == "nalog_ne_postoji")
            alert("Netačna šifra ili korisničko ime!")
        else
            console.log(response.data.result, " ", response.data.role);
    })
    .catch((err) => {
        console.log(err);
    })
};

function submitData()  {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    authenticate(username, password);
}


document.getElementById("loginButton").addEventListener("click", submitData, false);