// logging client request (POST, GET, etc..)
const logger = require("morgan");

// express server
const express = require("express");

// Middle-ware to test client requests
const bodyParser = require('body-parser');

// lambda function
const index = require('./index.js');

// lambda mock context
const context = require('aws-lambda-mock-context');

// Initialize Express
const app = express();

// parse application/json
app.use(bodyParser.json());

// Use morgan logger for logging requests
app.use(logger("dev"));

// listening for sockets and routes
app.listen(process.env.PORT || 3000, () => {
    console.log("App is running on port 3000!");
});

app.get('/', (req, res) => {
    res.send("test");
});

app.post('/alexa/', function (req, res) {
    let ctx = context();
    index.handler(req.body,ctx);
    ctx.Promise
        .then(resp => {  return res.status(200).json(resp); })
        .catch(err => {  console.log(err); })
});