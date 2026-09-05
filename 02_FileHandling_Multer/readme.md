# File Upload with Multer

Small Express project for practicing file uploads with Multer.

## Implemented

- Disk-based file storage in `uploads/`.
- Single-file upload handling with Multer.
- Upload field name: `file`.
- Generated filenames using the current timestamp and original filename.
- `.txt` file validation.
- Maximum file size: `1 MB`.
- JSON responses for successful uploads and upload errors.

## API

| Method | Route | Description |
| --- | --- | --- |
| GET | `/` | Health check |
| POST | `/api/files` | Upload one `.txt` file |

Upload the file as `multipart/form-data`:

```text
file: <text-file>
```

Uploaded files are saved to `uploads/`.

## Run Locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Server: `http://localhost:5000`

## Stack

Node.js, Express.js, Multer, and Nodemon.
