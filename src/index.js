const get_events = require('./helpers/getEvents')
const formatt_events = require('./helpers/formattEvents')

const app = async() => {
    
    const getEvents = await get_events()
    const formattEvents = formatt_events(getEvents)
    // const uploaderEvents = await uploaderEvents()

    return formattEvents
}


app()
    .then(msg => console.log(msg))
    .catch(msg => console.log(msg))