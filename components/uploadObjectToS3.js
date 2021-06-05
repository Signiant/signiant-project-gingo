// This will read the .env (if it exists) into process.env
require('dotenv').config();
const config = require('../config');

var AWS = require('aws-sdk');
var s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// console.log(
//     process.env.AWS_ACCESS_KEY_ID,
//     process.env.AWS_SECRET_ACCESS_KEY
// )

module.exports = async (bucketName, objectName, objectData, contentType) => {

    console.log('uploadObjectToS3', bucketName, objectName, objectData, contentType)
    // These values will be either what's in .env,
    // or what's in the Docker, Heroku, AWS environment
    // const objectName = 'metadata.xml'; // File name which you want to put in s3 bucket
    objectData = JSON.stringify(objectData); // file data you want to put
    // const objectType = 'application/json'; // type of file
    try {
      // setup params for putObject
      const params = {
         Bucket: bucketName,
         Key: objectName,
         Body: objectData,
         ContentType: contentType,
      };
        const result = await s3.putObject(params).promise();
      
      console.log(`File uploaded successfully at https:/` + bucketName +   `.s3.amazonaws.com/` + objectName, result);
      return result
    } catch (error) {
      console.log('error', error);
    }
}



