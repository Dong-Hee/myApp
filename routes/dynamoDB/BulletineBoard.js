var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: 'AKIAIKC7HI7OTNEWR5MA',
    secretAccessKey: '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',
    endpoint: "https://dynamodb.ap-northeast-2.amazonaws.com"
  //ap-northeast-2
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "BulletineBoard",
    KeySchema: [       
        { AttributeName: "Id", KeyType: "HASH"},  //Partition key
        { AttributeName: "Order", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "Id", AttributeType: "N" },
        { AttributeName: "Order", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
