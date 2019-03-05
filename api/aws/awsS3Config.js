require('dotenv').config();
var path = require('path');

const AWS = require("aws-sdk");
AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETKEY
});

const multer = require('multer');
const multerS3 = require('multer-s3');
const upload = multer({
    storage : multerS3({
       s3 : new AWS.S3()
       , bucket : 'bucket-ridong-01'
       , key : (req, file, cb) => {
           let extension = path.extname(file.originalname);
           cb(null, Date.now() + extension);
       },
       acl : 'public-read-write'
    })
});

module.exports = {
    upload
}