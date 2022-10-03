const isoCountries = require("../helpers/iso3166.json");
const fipStates = require("../helpers/fip_states.json");
const crypto = require("crypto");


const formatConversions = (events) => {

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
            continue;
        }

        switch (key) {
            case "ph":
                user_data["ph"] = hash(user_data["ph"]);
                break;

            case "ct":
                user_data["ct"] = hash(deleteSpacesCt(user_data["ct"].toLowerCase()));
                break;

            case "country":
                user_data["country"] = hash(getCountryCode(user_data["country"].toLowerCase()));
                break;

            case "fn":
                user_data["fn"] = hash(getFirstOfFirstAndLastName(user_data["fn"].toLowerCase()));
                break;

            case "ge":
                user_data["ge"] = hash(user_data["ge"]);
                break;

            case "ln":
                user_data["ln"] = hash(getFirstOfFirstAndLastName(user_data["ln"].toLowerCase()));
                break;

            case "lead_id":

                // removed by default because client does not have lead id.(they do not run lead ads)
                
                delete user_data["lead_id"];
                
                break;

            case "st":
                user_data["st"] = hash(getStateCode(user_data["st"].toLowerCase()));
                break;

            case "zp":
                user_data["zp"] = hash(user_data["zp"]);
                break;

            default:
                break;
        }
    }

    return user_data;
}


const formatCustomData = (custom_data) => {
    for(key in custom_data){
        if (custom_data[key] === "" ) {
            delete custom_data[key];
            continue;
        }

        switch (key) {
            case "content_category":
                custom_data["content_category"] = custom_data["content_category"].toLowerCase();
                break;

            case "num_items":
                if (custom_data["num_items"] === "0") {
                    delete custom_data["num_items"];
                } else {
                    custom_data["num_items"] = Number(custom_data["num_items"]);
                }
                break;

            case "predicted_ltv":
                if (custom_data["predicted_ltv"] === 0) delete custom_data["predicted_ltv"];
                break;

            default:
                break;
        }
        custom_data.lead_event_source = "In-house CRM";
        custom_data.event_source = "crm";
    }
    return custom_data;
}


const deleteSpacesCt = (ct) => {
    return ct.replace(/[\s-&@!"#$%&/()=?¡¨*`.,;/\{}]/g, "");
}


const getCountryCode = (country) => {

    if (country === "usa") country = "us";
    for(const key in isoCountries){
        if(country === isoCountries[key]){
            return key;
        }
    }
    return country;
}


const getStateCode = (st) => {
    for(const abbreviation in fipStates){
        if (st === fipStates[abbreviation].toLowerCase()) {
            return abbreviation.toLocaleLowerCase();
        }
    }
    return st;
}


const getFirstOfFirstAndLastName = (name) => {
    return name.split(" ")[0];
}


const hash = (value) => {
    return crypto.createHash("sha256").update(value).digest("hex");
}


module.exports = formatConversions;