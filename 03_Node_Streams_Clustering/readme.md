# Project 3 - Node Streams and Clustering

This project demonstrates two important Node.js concepts:

- working with streams for efficient file processing
- using the cluster module to run multiple workers for parallel processing

It reads a file in chunks, streams it to the browser, and also compresses the same file into a gzip archive using Node stream pipelines.

## Overview

The app uses:

- `fs` to create readable and writable streams
- `zlib` to compress data with gzip
- `express` to serve the file over HTTP
- `cluster` and `os` to create multiple worker processes

The main idea is that instead of loading the full file into memory, Node processes the data in smaller chunks, which is more efficient for large files.

## Tech Stack

- Node.js
- Express
- Nodemon
- File Streams (`fs`)
- Gzip Compression (`zlib`)
- Clustering (`cluster`)

## Project Structure

```bash
03_Node_Streams_Clustering/
├── index.js
├── service.js
├── package.json
├── sample.txt
├── sample.zip
├── readme.md
└── node_modules/
```

## How It Works

### 1. Stream file content to the browser

In `index.js`, a readable stream is created for `sample.txt` and each chunk is written to the HTTP response:

```js
const stream = fs.createReadStream('./sample.txt', 'utf-8');
stream.on('data', (chunk) => res.write(chunk));
stream.on('end', () => res.end());
```

This avoids reading the entire file into memory before sending it.

### 2. Compress the file using gzip

The project also creates a stream pipeline:

```js
fs.createReadStream('./sample.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./sample.zip'));
```

This reads the file, compresses it in streaming mode, and saves the result to `sample.zip`.

### 3. Run the app with clustering

The `service.js` file checks the number of available CPU cores and forks workers using the Node cluster API.

```js
if (cluster.isPrimary) {
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
} else {
  require('./index.js');
}
```

The primary process acts like a manager and distributes work across worker processes.

## Installation

Install the dependencies:

```bash
npm install
```

## Run the Project

Start the app with:

```bash
npm run dev
```

This script runs Nodemon against `service.js`.

## Access the Application

After the server starts, open:

```bash
http://localhost:5000/
```

The homepage streams the content of `sample.txt` to the browser.

## Notes

- The server listens on port `5000`.
- `sample.zip` is generated automatically when the app runs.
- If `sample.zip` already exists, delete it before restarting to regenerate the compressed file.
- This project is a practical example of scalable and memory-efficient file handling in Node.js.

## Learning Goals

This project helps you understand:

- how readable and writable streams work
- how `pipe()` connects multiple stream stages
- how gzip compression can be applied in real time
- how cluster-based load distribution works in Node.js

## Conclusion

This project is a beginner-friendly example of using Node.js streams and clustering together to build a more efficient and scalable server application.
