// configure environment variables in .env
require('dotenv').config();

// import alexa software development kit
const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    // create alexa object
    const alexa = Alexa.handler(event, context, callback);

    // our application id
    alexa.appId = process.env.APP_ID;

    // register intents for our skill
    alexa.registerHandlers(handlers);

    // after configuration, run alexa
    alexa.execute();
};

const handlers = {
  'HelloWorldIntent' : function() {
    //emit response directly
    this.emit(':tell', 'Hello World!');
  },
  'PillDispenserIntent' : function() {
    //emit response directly
    this.emit(':tell', 'You currently have 0 pills');
}
};

