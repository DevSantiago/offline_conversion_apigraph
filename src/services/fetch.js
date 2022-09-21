const axios = require('axios').default;


const getEvents = async() => {

    const token = 'AZRQm5WgK8P8hzc9tTWPeU8x92zfFx8fEFm21'; // TODO mover a archivo .env
    const endpoint = 'https://app.saludtv.net/api_fb/wsdl.php';

    try {
        const request = await axios({
            method: 'get',
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });
    
        return request.data;

    } catch (error) {
        console.log(error.data);
    }
}

module.exports = getEvents;