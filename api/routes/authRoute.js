const { client } = require('../aws/awsDynamoConfig');
const bcrypt = require('bcrypt');

exports.sign = (req, res) => {
    res.render('signUp', {message : ''});
}

exports.signProc = (req, res) => {
    console.log(req.body);
    try {
        let params = {
            TableName : "user"
            , KeyConditionExpression: "#username = :param"
            , ExpressionAttributeNames:{
                "#username": "username"
            },
            ExpressionAttributeValues: {
                ":param": req.body.username
            }
        };
        client.query(params, (err, data) => {
            if(err){
                console.log('error', err);
            } else{
                try {
                    if(data.Count > 0){
                        console.log('b');
                        res.render('signUp', { message : '이미 가입한 회원입니다. : ' + req.body.username });
                        console.log(data);
                    } else{
                        console.log('ab');
                        const hash = bcrypt.hash(req.body.password, 12);
                        let params = {
                            TableName : "user"
                            , Item : {
                                "username" : req.body.username
                                , "mode" : "user"
                                , "info" : {
                                    "password" : hash
                                    , "nickname" : req.body.nickname
                                }
                            }
                        };
                    
                        client.put(params, (err, data) => {
                            if(err){
                                console.log(err);
                            } else {
                                res.redirect('/');
                            }
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
                
            }
        });


    } catch (error) {
        console.log(error);
    }
    /*
    try {
        let user = await checkUser(req.body.username);
        console.log('user', await user);
        var test = {};
        test.a = 'aaa';
        console.log('test', await test);
    } catch (error) {
        
    }
    
    */
    /*
    if(user){
        req.flash('ERROR', '이미 가입된 회원');
        return;
    }

    const hash = bcrypt.hash(req.body.password, 12);

    var params = {
        TableName : "user"
        , Item : {
            "username" : req.body.username
            , "mode" : "user"
            , "info" : {
                "password" : hash
                , "nickname" : req.body.nickname
            }
        }
    };

    client.put(params, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.render('/');
        }
    });
    */
}

exports.login = (req, res) => {
    
}

exports.loginProc = (req, res) => {

}

const checkUser = async (username) => {
    try{
        var params = await {
            TableName : "user"
            , KeyConditionExpression: "#username = :param"
            , ExpressionAttributeNames:{
                "#username": "username"
            },
            ExpressionAttributeValues: {
                ":param": username
            }
        };
        await client.query(params, async (err, data) => {
            if(err){
                console.log('error', err);
            } else{
                console.log(await data);
            }
        });

    } catch(error){
        console.log('error', error);
    }
}