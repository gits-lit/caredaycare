// configure environment variables in .env
require('dotenv').config();

// import alexa software development kit
const Alexa = require('alexa-sdk');

// import aws software development kit for our database
const awsSDK = require('aws-sdk');
awsSDK.config.update({
  region: 'us-east-1',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
  accessKeyId: process.env.KEY,
  secretAccessKey: process.env.SECRET_KEY
});

// start an instance of our DynamoDB
const docClient = new awsSDK.DynamoDB.DocumentClient();

const table = "PillsDB";

const count = 10;
const pill_brand = "generic";

const params = {
  TableName:table,
  Key:{
    "pill_count": count,
    "pill_brand": pill_brand
  }
};

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
  'PillCountIntent' : function() {
    const self = this;
    docClient.get(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          //emit response directly
          self.emit(':tell', 'You currently have ' + data.Item.pill_count + ' pills');
      }
    }); 
  }
};

