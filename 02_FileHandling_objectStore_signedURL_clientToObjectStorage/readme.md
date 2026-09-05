# Project 02 - Object Storage with MinIO and Signed URLs

This project demonstrates how to upload files directly to a cloud-like object storage service using a presigned URL from the backend.

The backend generates a temporary signed URL for a file upload, and the client can send the file directly to object storage without exposing the storage credentials.

## What this project does

- Creates a Node.js Express API
- Uses AWS S3 SDK to talk to MinIO
- Generates a presigned `PutObject` URL
- Lets the client upload files directly to object storage
- Stores files under a unique key inside the bucket

## Tech stack

- Node.js
- Express.js
- AWS S3 SDK
- MinIO
- Docker

## Project structure

```bash
02_FileHandling_objectStore_signedURL_clientToObjectStorage/
├── src/
│   ├── config/
│   │   └── storage.js
│   ├── services/
│   │   └── fileService.js
│   └── server.js
├── package.json
├── package-lock.json
├── readme.md
└── uploads/
```

## Flow

1. Client sends filename and contentType to the backend.
2. Backend creates a unique object key like `uploads/<uuid>.<extension>`.
3. Backend generates a signed S3 URL using `@aws-sdk/s3-request-presigner`.
4. Client uploads the file directly to MinIO using that URL.
5. File is stored in the configured bucket.

## MinIO setup with Docker

Run MinIO locally using Docker:

```bash
docker run -d ^
  --name minio ^
  -p 9000:9000 ^
  -p 9001:9001 ^
  -e MINIO_ROOT_USER=minioadmin ^
  -e MINIO_ROOT_PASSWORD=minioadmin ^
  minio/minio server /data --console-address ":9001"
```

After the container starts:

- MinIO API: http://localhost:9000
- MinIO Console: http://localhost:9001
- Username: `minioadmin`
- Password: `minioadmin`

## Create bucket

Open the MinIO console at http://localhost:9001 and create a bucket named:

```bash
file-upload-lab
```

This bucket name is used in the code.

## Backend configuration

The AWS S3 client is configured in `src/config/storage.js` to connect to MinIO:

```js
const s3 = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:9000",
  credentials: {
    accessKeyId: "minioadmin",
    secretAccessKey: "minioadmin"
  },
  forcePathStyle: true
});
```

This is the key setting that makes the app work with MinIO instead of AWS S3.

## Install dependencies

```bash
npm install
```

## Run the server

```bash
npm run dev
```

The server listens on port 5000.

## API endpoint

### Generate presigned upload URL

Endpoint:

```bash
POST /api/files/upload-url
```

Request body:

```json
{
  "filename": "example.jpg",
  "contentType": "image/jpeg"
}
```

Response:

```json
{
  "msg": "File uploaded successfully",
  "data": {
    "result": {
      "uploadUrl": "https://...",
      "key": "uploads/uuid.jpg"
    }
  }
}
```

The `uploadUrl` is valid for 5 minutes and can be used to upload directly to MinIO.

## Important notes

- The uploaded file is stored with a generated unique name.
- The signed URL expires after 300 seconds.
- The client must send the correct `Content-Type` for the file being uploaded.
- This approach keeps the storage credentials on the backend and avoids exposing them on the frontend.

## Learning objective

This project teaches:

- how signed URLs work in object storage
- how to upload files directly to S3-compatible storage
- how MinIO can be used locally for development
- how to keep object storage credentials secure in backend code

## Conclusion

This project is a practical example of using presigned URLs for client-to-object-storage uploads, with MinIO used locally as a S3-compatible storage service.
