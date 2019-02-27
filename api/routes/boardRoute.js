const { client } = require('../awsDynamoDB/config');

exports.list = (req, res) => {
    var params = {
        TableName : "freeBoard"
        , ProjectionExpression : "Id, #order, info.subject, info.description"
        , FilterExpression : "#order between :start and :end"
        , ExpressionAttributeNames : {
            "#order" : "Order"
        },
        ExpressionAttributeValues : {
            ":start" : 1
            ,":end" : 100
        }
    };

    client.scan(params, (err, data) => {
        if(err){
            console.log(err);
            res.send(JSON.stringify(err));
        } else{
            res.send(JSON.stringify(data));
            data.Items.forEach((data) => {

            });
        }
    });
}

exports.detail = (req, res) => {
    console.log(req.params);
    var p =  parseInt(req.params.id);
    console.log(p);
    var params = {
        TableName : "freeBoard"
        , KeyConditionExpression: "#id = :param"
        , ExpressionAttributeNames:{
            "#id": "Id"
        },
        ExpressionAttributeValues: {
            ":param": p
        }
    };

    client.query(params, (err, data) => {
        if(err){
            console.log(err);
            res.send(err);
        } else{
            res.send(JSON.stringify(data));
        }
    });
}

exports.create = (req, res) => {
    console.log('create');
    var params = {
        TableName : "freeBoard"
        , Item : {
            "Id" : 2534
            , "Order" : 1252
            , "info" : {
                "subject" : "test35"
                , "description" : "description325"
            }
        }
    };

    client.put(params, (err, data) => {
        if(err){
            //console.log(err);
            res.send('test');
        } else {
            //console.log(JSON.stringify(params));
            //console.log(JSON.stringify(data));
            res.send('test');
        }
    });
}

exports.update = (req, res) => {
    console.log(req.params);
    var params = {
        TableName : "freeBoard"
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
        TableName : "freeBoard"
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
