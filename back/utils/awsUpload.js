const AWS = require("aws-sdk");
const config = require("../config/awsconfig.json");

AWS.config.update({ accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey });
const s3 = new AWS.S3();


const awsUpload = (file, base64data) => {
  return new Promise((resolve) => {
    const params = {
      "Bucket": "connect-class-test",
      "Key": file,
      "Body": base64data,
      "ACL": "public-read"
    };
    s3.upload(params, "", (err, res) => {
      if (!err) {
        resolve(res.Location);
      }
    })
  })
}

module.exports = awsUpload;