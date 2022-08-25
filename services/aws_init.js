const { DynamoDB } = require("aws-sdk");
require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
exports.bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
exports.s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});
exports.dynamodb = new DynamoDB({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});
