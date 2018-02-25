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

var table = "Movies";

var year = 2015;
var title = "Spongebob";

var params = {
  TableName: table,
  Key:{
      "year": year,
      "title": title
  }
};

docClient.get(params, function(err, data) {
  if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});