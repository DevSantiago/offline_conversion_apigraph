

const app = async() => {
    
    const getEvents = await get_events()
    const formattEvents = formatt_events()
    const uploaderEvents = await uploaderEvents()

    return uploaderEvents
}


app()
    .then(msg => console.log(msg))
    .catch(msg => console.log(msg))