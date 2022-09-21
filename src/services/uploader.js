const axios = require("axios").default;
require("dotenv").config();


const postHttpToFacebook = async(payloadData) => {

    const endpoint = `${process.env.URL_GRAPH_API}/${process.env.API_GRAPH_V}/${process.env.PIXEL_ID}/events`;

    try {
        const request = await axios({
            method: "post",
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            },
            data: JSON.stringify({data: payloadData})
        })
        console.log("Post to Facebook nice!")
        return (await request).statusText;
    } catch (error) {
        console.log(error.response.data);
    }
}


module.exports = postHttpToFacebook;