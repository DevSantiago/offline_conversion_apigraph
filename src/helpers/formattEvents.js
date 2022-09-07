const formattConversion = (events) => {

    return events.map((event) => {
        return {
            ...event,
            user_data: formatUserData(event.user_data),
            custom_data: formatCustomData(event.custom_data)
        }
    });
}


const formatUserData = (user_data) => {
    for(property in user_data){
        switch (property) {
            case "em":
                if (user_data[property] === "") {
                    delete user_data[property];
                }
                break;
            
            case "ph":
                if (isNaN(user_data[property]) || user_data[property] === "") {
                    delete user_data[property];
                }
                break;

            case "ct":
                if (!isNaN(user_data[property]) || user_data[property] === "") {
                    delete user_data[property];
                }
                break;

            case "country":
                if (!isNaN(user_data[property]) || user_data[property] === "") {
                    delete user_data[property];
                }
                break;

            case "db":
                if (user_data[property] === "") {
                    delete user_data[property];
                }
                break;
            
            case "fn":
                let sp_fn = user_data[property].split(' ');
                if (sp_fn.length > 1) {
                    user_data[property] = sp_fn[0];
                }
                break;

            case "ge":
                if (!isNaN(user_data[property]) || user_data[property] === "") {
                    delete user_data[property];
                }
                break;
                
            case "ln":
                let sp_ln = user_data[property].split(' ');
                if (sp_ln.length > 1) {
                    user_data[property] = sp_ln[0];
                }
                break;
            
            case "lead_id":
                if (isNaN(user_data[property])) {
                    delete user_data[property];
                }
                break;

            case "st":
                if (!isNaN(user_data[property])) {
                    delete user_data[property];
                }
                break;

            case "zp":
                if (isNaN(user_data[property])) {
                    delete user_data[property];
                }
            default:
                break;
        }
    }
    return user_data;
}


const formatCustomData = (custom_data) => {

}

module.exports = formattConversion;