const getEvents = require('./services/fetch');
const formatEvents = require('./services/formatter');
const uploaderFacebook = require("./services/uploader");


const app = async() => {
    
    const getEventsUnformatted = await getEvents();
    const setFormatEvents = formatEvents(getEventsUnformatted);
    const uploaderEvents = await uploaderFacebook(setFormatEvents);

    return uploaderEvents;
}


module.exports.app = app;