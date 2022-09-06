const shaCipher = () => {

}


const emptyValidation = (event) => {
    
    for(let property in event){
        if(event[property] === ""){
            delete event[property];
        } else {
            console.log(`La propiedad ${property} no está vacía`)
        }
    }
}


const formattConversion = (events) => {

    events.map( (event) => {
        emptyValidation(event['user_data']);
    });

    return events;
}


module.exports = formattConversion;