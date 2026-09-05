//This file covers Node Streams.
const express = require('express');
const fs = require('fs');
const status = require("express-status-monitor");
const zlib = require('zlib');

const app = express();

app.use(status());

//If we want to zip some file and return to user, we should not zip it by getting all content in our server memory and then zipping.
//We use streams for this 1. create Read Stream -> 2. Zipper Package (to zip the file) -> 3. Write stream (to give user zipped file)
// zipper = zlib (node module)

fs.createReadStream("./sample.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")));
//auto zip will be created, if sample.zip is there delete it and restart server.


app.get('/', (req, res) => {
    const stream = fs.createReadStream("./sample.txt", "utf-8");
    stream.on("data", (chunck) => res.write(chunck));
    stream.on("end", () => res.end());
})

app.listen(5000, () => {
    console.log("Server is connected to 5000 PORT")
}) 