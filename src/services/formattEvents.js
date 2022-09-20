const iso_countries = require("../helpers/iso3166.json");
const fip_states = require("../helpers/fip_states.json");
const crypto = require("crypto");


const formattConversion = (events) => {

    return events.map((event) => {
        return {
            ...event,
            action_source: "system_generated",
            user_data: formatUserData(event.user_data),
            custom_data: formatCustomData(event.custom_data)
        }
    });
}


const formatUserData = (user_data) => {
    for(property in user_data){
        user_data[property] = user_data[property].toString().toLowerCase();
        switch (property) {
            case "em":
                if(user_data["em"]){
                    user_data["em"] =  hash(user_data["em"]);
                } else{
                    delete user_data[property];
                }

                break;

            case "ph":
                if (user_data["ph"]) {
                    user_data["ph"] = hash(user_data["ph"]);
                } else {
                    delete user_data[property];
                }
                
                break;
                
            case "ct":
                if (user_data["ct"]) {
                    user_data["ct"] = deleteSpacesCt(user_data["ct"]);
                } else {
                    delete user_data[property];
                }
                
                break;

            case "country":
                if (user_data["country"]) {
                    user_data["country"] = hash(getCodeCountry(user_data["country"]));
                } else {
                    delete user_data[property];
                }
                
                break;
            
            case "db":
                if (user_data["db"]) {
                    user_data["db"] =  hash(user_data["db"]);
                } else{
                    delete user_data[property];
                }

                break;

            case "fn":
                if (user_data["fn"]) {
                    user_data["fn"] = hash(validateFirstNameOrLastName(user_data["fn"]));
                } else {
                    delete user_data[property];
                }
                
                break;
            
            case "ge":
                if (user_data["ge"] !== "m" || user_data["ge"] !== "f") {
                    delete user_data[property];
                }
                break;

            case "ln":
                if (user_data["ln"]) {
                    user_data["ln"] = hash(validateFirstNameOrLastName(user_data["ln"]));
                } else {
                    delete user_data[property]; 
                }
                
                break;
            
            case "lead_id":
                if (!user_data["lead_id"] === "0") {
                    user_data["lead_id"] = user_data["lead_id"];
                } else {
                    delete user_data[property];
                }

            case "st":
                if (user_data["st"]) {
                    user_data["st"] =  getCodeState(user_data["st"]); 
                } else {
                    delete user_data[property];
                }
                
                break;

            default:
                break;
        }

    }
    return user_data;
}


const formatCustomData = (custom_data) => {
    for(property in custom_data){
        // custom_data[property] = custom_data[property].toLowerCase();
        // switch (property) {
        //     case "currency":
                
        //         break;
        
        //     default:
        //         break;
        // }
    }
    return custom_data;
}


const deleteSpacesCt = (ct) => {
    return ct.replace(/[\s-&@!"#$%&/()=?¡¨*`.,;/\{}]/g, "");
}


const changeSpacesAndSpecialsCharactersToUnderScore = (property) => {
    return property.replace(/[\s-&@!"#$%&/()=?¡¨*`.,;/\{}]/g, "_");
}


const getCodeCountry = (country) => {

    country === "usa" ? country = "us" : country;
    for(const key in iso_countries){
        if(country === iso_countries[key]){
            return key;
        }
    }
    return country;
}


const getCodeState = (st) => {
    for(const abbrevation in fip_states){
        if (st === fip_states[abbrevation].toLowerCase()) {
            return abbrevation.toLocaleLowerCase();
        }
    }
}

const validateFirstNameOrLastName = (fn_ln) => {
    let fn_ln_arr = fn_ln.split(" ");
    return fn_ln_arr[0];
}


const hash = (value) => {
    //console.log(value)
    return crypto.createHash("sha256").update(value).digest("hex");
}


module.exports = formattConversion;