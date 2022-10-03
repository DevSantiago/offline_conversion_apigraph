const getEvents = require('./services/fetch');
const formatEvents = require('./services/formatter');
const uploaderFacebook = require("./services/uploader");
const sentry = require("@sentry/node");


sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
});


const app = async() => {

    try {
        const getEventsUnformatted = await getEvents();
        const setFormatEvents = formatEvents(getEventsUnformatted);

        return await uploaderFacebook(setFormatEvents);

    } catch (error) {
        sentry.captureException(error);
        throw error;
    }

}

    
module.exports.app = app;