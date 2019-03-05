const local = require('./localStrategy');
const userRoute = require('../api/routes/indexRoute');
const { client } = require('../api/aws/awsDynamoConfig');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, uesr.info.username);
    });

    passport.deserializeUser((username, done) => {
        var params = {
            TableName : "user"
            , KeyConditionExpression: "#id = :param"
            , ExpressionAttributeNames:{
                "#id": "Id"
            },
            ExpressionAttributeValues: {
                ":param": username
            }
        };
        client.query(params, (err, data) => {
            if(err){
                err => done(err);
            } else{
                user => done(null, user);
            }
        });
    
    });
    
    //local(passport);

};

