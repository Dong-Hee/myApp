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
