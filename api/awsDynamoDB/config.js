require('dotenv').config();

const AWS = require("aws-sdk");
AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETKEY,
    endpoint: "https://dynamodb.ap-northeast-2.amazonaws.com"
  //ap-northeast-2
});

const client = new AWS.DynamoDB.DocumentClient();

console.log('config.js');

module.exports = {
    client
}
