const axios = require("axios").default;
require("dotenv").config();


const getEvents = async() => {

    const endpoint = "https://app.saludtv.net/api_fb/wsdl.php";

    try {
        const request = await axios({
            method: "get",
            url: endpoint,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${process.env.TOKEN}`, // TODO mover a archivo .env - DONE
            }
        });
    
        return request.data;

    } catch (error) {
        console.log(error.data);
    }
}


module.exports = getEvents;