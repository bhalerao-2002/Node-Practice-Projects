const crypto = require("crypto");
const path = require('path');

//To upload file in s3
const { PutObjectCommand } = require("@aws-sdk/client-s3");
//To generate sighed URL
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = require("../config/storage");

const BUCKET_NAME = "file-upload-lab";

async function createUploadUrl(filename, contentType) {
    const extension = path.extname(filename);

    const key = `uploads/${crypto.randomUUID()}${extension}`;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType
    });

    const uploadUrl = await getSignedUrl(
        s3,
        command,
        {
            expiresIn: 300 //5 min
        }
    );

    return {
        uploadUrl, key
    }
}

module.exports = {
    createUploadUrl
}