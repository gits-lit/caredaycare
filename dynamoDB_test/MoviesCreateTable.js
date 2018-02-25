// configure environment variables in .env
require('dotenv').config({path:'../.env'});

var AWS = require("aws-sdk");

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // region
AWS.config.endpoint = 'https://dynamodb.us-east-1.amazonaws.com'; // endpoint
AWS.config.accessKeyId = process.env.ACCESS_KEY; // access key
AWS.config.secretAccessKey = process.env.SECRET_ACCESS_KEY; //secret key



var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});