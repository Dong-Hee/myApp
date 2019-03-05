var AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETKEY,
    endpoint: "https://dynamodb.ap-northeast-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "board";

var year = 1944;
var title = "DONGHEE INPUT123";
/*
var params = {
        TableName : "board"
        , Item : {
            "Id" : String(Date.now() + Math.floor((Math.random() * 1000) + 1))
            , "Order" : "123"
            , "info" : {
                "subject" : req.body.subject
                , "description" : req.body.description
                //, "img" : fileUrl
            }
        }
    };
*/

var params = {
    TableName: "board",
    Item:{
        "Id" : String(Date.now() + Math.floor((Math.random() * 1000) + 1)),
        "Order" : "123",
        "info" : {
            "subject" : "testset"
            , "description" : "testst"
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    console.log(params);
    if (err) {
        console.error("Unable to addcd item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
