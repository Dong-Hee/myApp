var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: 'AKIAIKC7HI7OTNEWR5MA',
    secretAccessKey: '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',
    endpoint: "https://dynamodb.ap-northeast-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

var year = 1944;
var title = "DONGHEE INPUT123";

// Update the item, unconditionally,

var params = {
    TableName:table,
    Key:{
        "year": year,
        "title": title
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
        ":r":5.5,
        ":p":"update update duptae.",
        ":a":["Larry", "Moe", "Curly"]
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
