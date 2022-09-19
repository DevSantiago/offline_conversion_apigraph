const iso_countries = require("../helpers/iso3166.json");
const fip_states = require("../helpers/fip_states.json");
const crypto = require("crypto");


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
       if(user_data[property] === ""){
        delete user_data[property];
       } else if(isNaN(user_data[property])){
            user_data[property] = user_data[property].toLowerCase();
            switch (property) {
                case "ph":
                    user_data["ph"] = hash(user_data["ph"]);
                    break;
                case "ct":
                    user_data["ct"] = deleteSpacesCt(user_data["ct"]);
                    break;
                case "country":
                    user_data["country"] = hash(getCodeCountry(user_data["country"]));
                    break;
                
                case "fn":
                    user_data["fn"] = hash(validateFirstNameOrLastName(user_data["fn"]));
                    break;
                
                case "ge":
                    if (user_data["ge"] !== "m" || user_data["ge"] !== "f") {
                        delete user_data[property];
                    }
                    break;

                case "ln":
                    user_data["ln"] = hash(validateFirstNameOrLastName(user_data["ln"]));
                    break;

                case "st":
                    user_data["st"] =  getCodeState(user_data["st"]);
                    break;
                case "zp":
                    
                    break;
                default:
                    break;
            }

       }
    }
    return user_data;
}


const formatCustomData = (custom_data) => {
    for(property in custom_data){
        if(custom_data[property] === ""){
            delete custom_data[property];
        } else if(isNaN(custom_data[property])){
            custom_data[property] = custom_data[property].toLowerCase();
            custom_data["currency"] = custom_data["currency"].toUpperCase();

        }
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
    return crypto.createHash("sha256").update(value).digest("hex");
}

module.exports = formattConversion;