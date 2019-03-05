const { client } = require('../aws/awsDynamoConfig');
var ejs = require('ejs');
const response = (status, body) => ({
    statusCode : status
    , body : JSON.stringify(body)
});

exports.list = (req, res) => {
    var params = {
        TableName : "board"
        , ProjectionExpression : "Id, #type, info.subject, info.description, info.img, info.buyNow, info.startPrice"
        , FilterExpression : "#type = :type"
        , ExpressionAttributeNames : {
            "#type" : "type"
        },
        ExpressionAttributeValues : {
            ":type" : "auction"
        }
    };
    
    client.scan(params, (err, data) => {
        if(err){
            console.log(err, response(500, data));
        } else {
            res.render('board', data);
        }
    });

}

exports.detail = (req, res) => {
    var params = {
        TableName : "board"
        , KeyConditionExpression: "#id = :param"
        , ExpressionAttributeNames:{
            "#id": "Id"
        },
        ExpressionAttributeValues: {
            ":param": req.params.id
        }
    };

    client.query(params, (err, data) => {
        if(err){
            console.log(err);
        } else{
            res.render('detail', data);
        }
    });
}

exports.form = (req, res) => {
    res.render('boardForm');
}

exports.create = (req, res) => {
    console.log(req.body);
    console.log(req.file);

    var fileUrl;
    if(req.file !== undefined){
        fileUrl = req.file.location;
    }

    var params = {
        TableName : "board"
        , Item : {
            "Id" : String(Date.now() + Math.floor((Math.random() * 1000) + 1))
            , "type" : "auction"
            , "info" : {
                "subject" : req.body.subject
                , "description" : req.body.description
                , "img" : fileUrl
                , "buyNow" : req.body.buyNow
                , "startPrice" : req.body.startPrice
                , "endDate" : req.body.endDate
                /*
                , "tender" : {
                    "tenderDate" : Date.now()
                    , "tenderPrice" : req.body.startPrice
                    , "tenderUserId" : 'testUser01'
                }
                */
            }
        }
    };

    client.put(params, (err, data) => {
        if(err){
            console.log(err);
            res.send(JSON.stringify(err));
        } else {
            res.send(JSON.stringify(data));
        }
    });

}

exports.tender = (req, res) => {

    var tender = {};
    tender.tenderDate = Date.now();
    tender.tenderPrice = req.body.tenderPrice;
    tender.tenderUserId = '입찰유저1';

    var params = {
        TableName : "board"
        , Key : {
            "Id" : req.body.key
            , "type" : "auction" 
        },
        UpdateExpression : "set info.tender = :t"
        , ExpressionAttributeValues : {
            ":t" : tender
        },
        ReturnValues:"UPDATED_NEW"
    };

    client.update(params, (err, data) => {
        if(err){
            console.log(err);
        } else {
            console.log(data);
        }
    });

}

exports.update = (req, res) => {
    var params = {
        TableName : "board"
        , Key : {
            "Id" : 234
            , "Order" : 122 
        },
        UpdateExpression : "set info.subject = :s, info.description = :d"
        , ExpressionAttributeValues : {
            ":s" : "변경된 제목"
            , ":d" : "변경된 설명 부분"
        },
        ReturnValues:"UPDATED_NEW"
    };
    
    client.update(params, (err, data) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(JSON.stringify(params));
            console.log(JSON.stringify(data));
            res.send(JSON.stringify(params) + JSON.stringify(data));
        }
    });
}

exports.delete = (req, res) => {
    var params = {
        TableName : "board"
        , Key : {
            "Id" : 234
            , "Order" : 122 
        }/*,
        //조건 삭제
        ConditionExpression:"info.rating <= :val",
        ExpressionAttributeValues: {
            ":val": 5.0
        }*/
    };

    client.delete(params, (err, data) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.send(JSON.stringify(data));
        }
    });
}
