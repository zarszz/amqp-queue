const AWS = require('aws-sdk');

require('dotenv').config();

const S3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET,
    sessionToken: process.env.S3_SESSION_TOKEN,
});

async function put_object(data, filename){
    return S3.putObject({
        Key: filename,
        Body: data,
        Bucket: process.env.S3_BUCKET_NAME,
        ACL: 'public-read',
    }).promise();
}

module.exports = {
    put_object
}
