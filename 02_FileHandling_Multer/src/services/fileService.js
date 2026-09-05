const { PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = require("../config/storage");

const BUCKET_NAME = "file-upload-lab";

async function uploadFile(file) {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimitype
    });

    await s3.send(command);
}

module.exports = {
    uploadFile
}