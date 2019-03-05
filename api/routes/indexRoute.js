const { client } = require('../aws/awsDynamoConfig');

exports.index = (req, res) => {
    res.render('index');
}

