// logging client request (POST, GET, etc..)
const logger = require("morgan");

// express server
const express = require("express");

// Middle-ware to test client requests
const bodyParser = require('body-parser');

// path to join files
const path = require('path');

// lambda function
const index = require('./index.js');

// lambda mock context
const context = require('aws-lambda-mock-context');

// Initialize Express
const app = express();

// parse application/json
app.use(bodyParser.json());


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "public")));

// Use morgan logger for logging requests
app.use(logger("dev"));

// listening for sockets and routes
app.listen(process.env.PORT || 3000, () => {
    console.log("App is running on port 3000!");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.post('/alexa/', function (req, res) {
    let ctx = context();
    index.handler(req.body,ctx);
    ctx.Promise
        .then(resp => {  return res.status(200).json(resp); })
        .catch(err => {  console.log(err); })
});