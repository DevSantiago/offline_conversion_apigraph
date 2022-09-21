const get_events = require('./services/fetch');
const formatt_events = require('./services/formatter');

const app = async() => {
    
    const getEventsUnformatted = await get_events();
    const setFormattEvents = formatt_events(getEventsUnformatted);
    // const uploaderEvents = await uploaderEvents();

    return setFormattEvents;
}


app()
    .then(msg => console.dir(msg, {depth: null}))
    .catch(msg => console.log(msg));