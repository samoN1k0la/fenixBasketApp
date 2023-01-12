import axios from 'axios';

// Async function used for sending form data to the API
export const showTrainers = async () => {
    axios.post(
        "http://localhost/fenixBasket/showTrainers.php",
        JSON.stringify({
            reason: 'reason'
        })
    )
    .then((response) => {
        console.log(response.data);
    })
    .catch((err) => {
        console.log(err);
    })
};
