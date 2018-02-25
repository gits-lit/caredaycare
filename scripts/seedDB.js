// configure environment variables in .env
require('dotenv').config({path:'../.env'});

var AWS = require("aws-sdk");

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "PillsDB";

var count = 10;
var pill_brand = "generic";

var params = {
    TableName:table,
    Item:{
      "pill_count": count,
      "pill_brand": pill_brand
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log();
        console.log("Added item:", JSON.stringify(params, null, 2));
    }
});