var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: 'AKIAIKC7HI7OTNEWR5MA',
    secretAccessKey: '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',
    endpoint: "https://dynamodb.ap-northeast-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 1944;
var title = "DONGHEE INPUT123";

var params = {
    TableName:table,
    Item:{
        "year": year,
        "title": title,
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    console.log(params);
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
