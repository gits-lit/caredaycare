// logging client request (POST, GET, etc..)
const logger = require("morgan");
// Middle-ware to test client requests
const bodyParser = require('body-parser');

// express server
const express = require("express");

// path to join files
const path = require('path');

// lambda function
const index = require('./index.js');
const context = require('aws-lambda-mock-context');

// import alexa commands
const alexaCommands = require('./commands.json');

// import moment.js
const moment = require('moment');

// Initialize Express
const app = express();

// parse application/json
app.use(bodyParser.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "public")));

// Use morgan logger for logging requests
logger.token('date-time', (req, res) => {
    let now = moment();
    return now.format("h:mm:ss A");
});

app.use(logger(':date-time :method :url :status :response-time ms'));

// listening for sockets and routes
app.listen(process.env.PORT || 3000, () => {
    console.log("App is running on port 3000!");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.get('/alexa/pillCount', (req, res) => {
    let ctx = context();
    //index.handler(req.body, ctx);
    index.handler(alexaCommands[0], ctx);
    ctx.Promise
        .then(resp => {
            let speechResponse = resp.response.outputSpeech.ssml
            let num = parseInt(speechResponse.replace(/[^0-9]/g,''));
            console.log(num);
            return res.status(200).json(num); 
        })
        .catch(err => {console.log(err);
        })
});

app.get('/alexa/dispensePill', (req, res)  => {
    let ctx = context();
    //index.handler(req.body, ctx);
    index.handler(alexaCommands[1], ctx);
    ctx.Promise
        .then(resp => {
            let speechResponse = resp.response.outputSpeech.ssml
            let num = speechResponse.replace(/[^0-9]/g,'');
            return res.status(200).json(num); 
        })
        .catch(err => {console.log(err);
        })
});

app.get('/alexa/resetPillCount', (req, res) => {
    let ctx = context();
    //index.handler(req.body, ctx);
    index.handler(alexaCommands[2], ctx);
    ctx.Promise
        .then(resp => {
            let speechResponse = resp.response.outputSpeech.ssml
            let num = speechResponse.replace(/[^0-9]/g,'');
            return res.status(200).json(num); 
        })
        .catch(err => {console.log(err);
        })
});

app.get('/moment', (req, res) => {
    let now = moment();
    res.send(now.format("dddd, MMMM Do YYYY, h:mm:ss a"));
});