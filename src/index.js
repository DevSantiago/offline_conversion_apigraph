const get_events = require('./helpers/getEvents');
const formatt_events = require('./helpers/formattEvents');

const app = async() => {
    
    const getEventsUnformatted = await get_events();
    const setFormattEvents = formatt_events(getEventsUnformatted);
    // const uploaderEvents = await uploaderEvents();

    return setFormattEvents;
}


app()
    .then(msg => console.log(msg))
    .catch(msg => console.log(msg));