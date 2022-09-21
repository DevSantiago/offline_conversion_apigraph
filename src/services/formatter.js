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
    for(key in user_data){
        if (user_data[key] === "") {
            delete user_data[key];
        } else {
            switch (key) {
                case "ph":
                    user_data["ph"] = hash(user_data["ph"]);
                    break;
            
                case "ct":
                    user_data["ct"] = deleteSpacesCt(user_data["ct"].toLowerCase());
                    break;
                
                case "country":
                    user_data["country"] = hash(getCodeCountry(user_data["country"].toLowerCase()));
                    break;

                case "fn":
                    user_data["fn"] = hash(validateFirstNameOrLastName(user_data["fn"].toLowerCase()));
                    break;
                
                case "ge":
                    user_data["ge"];
                    break;

                case "ln": 
                    user_data["ln"] = hash(validateFirstNameOrLastName(user_data["ln"].toLowerCase()));
                    break;

                case "lead_id":
                    user_data["lead_id"] === 0 ? delete user_data["lead_id"] : user_data["lead_id"];
                    break;

                case "st":
                    user_data["st"] = hash(getCodeState(user_data["st"].toLowerCase()));
                    break;  

                default:
                    break;
            }
        }
    }

    return user_data;
}


const formatCustomData = (custom_data) => {
    for(key in custom_data){
        if (custom_data[key] === "" ) {
            delete custom_data[key];
        } else {
            switch (key) {
                case "currency":
                    custom_data["currency"];
                    break;

                case "value":
                    custom_data["value"];
                    break;

                case "content_category":
                    custom_data["content_category"] = custom_data["content_category"].toLowerCase();
                    break;

                case "delivery_category":
                    custom_data["delivery_category"];
                    break;

                case "num_items":
                    custom_data["num_items"] === "0" ? delete custom_data["num_items"] : custom_data["num_items"] = Number(custom_data["num_items"]);
                    break;

                case "order_id":
                    custom_data["order_id"];
                    break;

                case "predicted_ltv":
                    custom_data["predicted_ltv"] === 0 ? delete custom_data["predicted_ltv"] : custom_data["predicted_ltv"];
                
                default:
                    break;
            }
        }
        custom_data.lead_event_source = "In-house CRM";
        custom_data.event_source = "crm";
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