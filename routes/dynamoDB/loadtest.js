var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: 'AKIAIKC7HI7OTNEWR5MA',
    secretAccessKey: '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',
    endpoint: "https://dynamodb.ap-northeast-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));
allMovies.forEach(function(movie) {
    var params = {
        TableName: "Movies",
        Item: {
            "year":  movie.year,
            "title": movie.title,
            "info":  movie.info
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", movie.title);
       }
    });
});
