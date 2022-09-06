const shaCipher = () => {

}


const lowerCase = (property) => {
    //console.log(typeof property);
    if (isNaN(property)) {
        console.log(property.toLowerCase().replace(" ", "_"));
    } else {
        
    }
}

const emptyValidation = (event) => {
    
    for(let property in event){
        if(event[property] === ""){
            delete event[property];
        } else {
            lowerCase(event[property]);
        }
    }
}


const formattConversion = (events) => {

    events.map( (event) => {
        emptyValidation(event['user_data']);
        emptyValidation(event['custom_data']);
    });

    //return events;
}


module.exports = formattConversion;