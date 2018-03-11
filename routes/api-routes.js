// path to join files
const path = require('path');

// logging client request (POST, GET, etc..)
const logger = require('morgan');
const colors = require('colors');

// express server
const express = require('express');

// lambda function
const index = require('../index.js');
const context = require('aws-lambda-mock-context');

// import alexa commands
const alexaCommands = require('../commands.json');

// import moment.js
const moment = require('moment');

// Middle-ware to test client requests
const bodyParser = require('body-parser');

// set up express router
const router = express.Router();

// keeps track of alarms
let alarms = []; 
// Use morgan logger for logging requests
logger.token('date-time', (req, res) => {
    let now = moment();
    let method = req.method;
    let statusCode = res.statusCode;
    let url = req.originalUrl;
    switch(statusCode) {
        case 200:
            statusCode = colors.green(statusCode);
            break;
        case 304:
            statusCode = colors.yellow(statusCode);
            break;
        default:
            break;
    }

    return `${colors.blue(now.format("h:mm:ss A"))} ${method} ${url} ${statusCode}`;
});

router.use(logger(':date-time :response-time ms', {
    skip: (req, res) => {return req.originalUrl === '/moment'}
}));

// parse application/json
router.use(bodyParser.json());

router.get('/', (req, res) => {
    let count = 1;
    alarms.forEach(alarm => {
        console.log(`Alarm ${count}: ${alarm.time.format("dddd, MMMM Do YYYY, h:mm:ss a")}`);
        count++;
    });
    res.sendFile(path.join(__dirname, '..', '/client/index.html'));
});

router.get('/alexa/pillCount', (req, res) => {
    let ctx = context();
    index.handler(alexaCommands[0], ctx);
    ctx.Promise
        .then(resp => {
            let speechResponse = resp.response.outputSpeech.ssml
            let num = parseInt(speechResponse.replace(/[^0-9]/g,''));
            return res.status(200).json(num); 
        })
        .catch(err => {console.log(err);})
});

router.get('/alexa/greenPillCount', (req, res) => {
    let ctx = context();
    index.handler(alexaCommands[1], ctx);
    ctx.Promise
        .then(resp => {
            let speechResponse = resp.response.outputSpeech.ssml
            let num = parseInt(speechResponse.replace(/[^0-9]/g,''));
            return res.status(200).json(num); 
        })
        .catch(err => {console.log(err);})
});

router.get('/alexa/dispensePill', (req, res)  => {
    let ctx = context();
    index.handler(alexaCommands[2], ctx);
    ctx.Promise
        .then(resp => {
            let speechResponse = resp.response.outputSpeech.ssml
            let num = speechResponse.replace(/[^0-9]/g,'');
            if (num === ''){
                num = 0;
            }
            return res.status(200).json(num); 
        })
        .catch(err => {console.log(err);
        })
});

router.get('/alexa/dispenseGreenPill', (req, res)  => {
    let ctx = context();
    index.handler(alexaCommands[3], ctx);
    ctx.Promise
        .then(resp => {
            let speechResponse = resp.response.outputSpeech.ssml
            let num = speechResponse.replace(/[^0-9]/g,'');
            if (num === ''){
                num = 0;
            }
            return res.status(200).json(num); 
        })
        .catch(err => {console.log(err);
        })
});

router.get('/alexa/resetPillCount', (req, res) => {
    let ctx = context();
    index.handler(alexaCommands[4], ctx);
    ctx.Promise
        .then(resp => {
            let speechResponse = resp.response.outputSpeech.ssml
            let num = speechResponse.replace(/[^0-9]/g,'');
            return res.status(200).json(num); 
        })
        .catch(err => {console.log(err);
        })
});

router.get('/moment', (req, res) => {
    let now = moment();
    res.send(now.format("dddd, MMMM Do YYYY, h:mm:ss a"));
});

router.post('/setTimer', (req, res) => {
    // timeInput parsed to moment
    let timeInput = moment(req.body.input, "HH:mm");

    // duration of alarm (in miliseconds)
    let duration = 0;

    if (timeInput < moment()) {
        //if input is earlier, set to timeInput to next day
        console.log("this timeInput is earlier than today");
        timeInput = timeInput.add(1, 'day');
    }

    // console log time input
    console.log(timeInput);

    // calculate difference in miliseconds
    duration = timeInput.diff(moment(), 'miliseconds')

    // console log duration to set timer
    console.log("miliseconds:", duration);
    setTimeout(() => { 
        let ctx = context();
        index.handler(alexaCommands[1], ctx);
        ctx.Promise
            .then(resp => {
                let speechResponse = resp.response.outputSpeech.ssml
                let num = speechResponse.replace(/[^0-9]/g,'');
                if (num === ''){
                    num = 0;
                }
                return res.status(200).json(num); 
            })
            .catch(err => {console.log(err);
            })
        // filter alarm when function is called
        alarms = alarms.filter(alarm => alarm.time != timeInput);
    }, duration)
    alarms.push({
        time: timeInput
    })
})

// export our router
module.exports = router;