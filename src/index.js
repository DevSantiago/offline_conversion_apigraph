const getEvents = require('./services/fetch');
const formatEvents = require('./services/formatter');

const app = async() => {
    
    const getEventsUnformatted = await getEvents();
    const setFormatEvents = formatEvents(getEventsUnformatted);
    // const uploaderEvents = await uploaderEvents();

    return setFormatEvents;
}


app()
    .then(msg => console.dir(msg, {depth: null}))
    .catch(msg => console.log(msg));